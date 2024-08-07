import React, { useState } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";
import { useUploadFiles } from '@xixixao/uploadstuff/react';

interface GeneratePodcastProps {
  setAudio: (audioUrl: string) => void;
  voiceType: string;
  voicePrompt: string;
  setAudioStorageId: (id: string) => void;
  setVoicePrompt: (prompt: string) => void;
  audio: string;
  setAudioDuration: (duration: number) => void;
}

const useGeneratePodcast = ({
  setAudio, voiceType, voicePrompt, setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio('');
    setProgress(null);

    if (!voicePrompt) {
      toast({ title: "Please provide a prompt to generate a podcast" });
      setIsGenerating(false);
      return;
    }

    try {
      const response = await getPodcastAudio({ voice: voiceType, input: voicePrompt });
      const blob = new Blob([response], { type: 'audio/mpeg' });
      const file = new File([blob], `podcast-${uuidv4()}.mp3`, { type: 'audio/mpeg' });

      const uploadProgressCallback = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded / event.total) * 100);
          setProgress(percentCompleted);
        }
      };

      const uploaded = await startUpload([file], uploadProgressCallback);
      const storageId = uploaded[0].response.storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl);
      setProgress(null);
      setIsGenerating(false);
      toast({ title: "Podcast generated successfully" });
    } catch (error) {
      console.error('Error generating podcast', error);
      toast({ title: "Error creating a podcast", variant: 'destructive' });
      setProgress(null);
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast, progress };
};

const GeneratePodcast: React.FC<GeneratePodcastProps> = (props) => {
  const { isGenerating, generatePodcast, progress } = useGeneratePodcast(props);

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to Generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder='Provide text to generate audio'
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1 w-full"
          onClick={generatePodcast}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            'Generate'
          )}
        </Button>
        {progress !== null && (
          <div className="mt-2 text-sm text-gray-400">
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  {progress}%
                </span>
              </div>
              <div className="flex flex-col mt-2">
                <div className="relative flex flex-col mb-6">
                  <div className="flex">
                    <div
                      className="bg-teal-600 text-xs leading-none py-1 text-center text-white rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {props.audio && (
        <div className="mt-5">
          <audio
            controls
            src={props.audio}
            autoPlay
            className="w-full"
            onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
          />
        </div>
      )}
    </div>
  );
};

export default GeneratePodcast;
