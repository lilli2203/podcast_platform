import { PodcastCardProps } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { FaShareAlt, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useToast } from './ui/use-toast';

const PodcastCard = ({ imgUrl, title, description, podcastId }: PodcastCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Fetch audio URL or any additional data needed for the podcast
    // Example: setAudioUrl(`/api/podcasts/${podcastId}/audio`);
  }, [podcastId]);

  const handleCardClick = () => {
    setIsLoading(true);

    // Logic to increase views can be added here

    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Logic to play or pause the audio
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied to clipboard!' });
  };

  const handleRate = (newRating: number) => {
    setRating(newRating);
    // Logic to submit the rating
  };

  return (
    <div className="relative cursor-pointer" onClick={handleCardClick}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
          <Loader size={24} className="text-white" />
        </div>
      )}
      <figure className="flex flex-col gap-2">
        <Image 
          src={imgUrl}
          width={174}
          height={174}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl transition-transform duration-300 hover:scale-105"
        />
        <div className="flex flex-col p-2">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">{description}</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className="text-yellow-500"
                  onClick={() => handleRate(index + 1)}
                >
                  {rating > index ? <FaStar /> : <FaStarHalfAlt />}
                </span>
              ))}
            </div>
            <Button
              variant="outline"
              className="text-gray-300 border-gray-300 hover:bg-gray-700"
              onClick={handleShare}
            >
              <FaShareAlt />
              <span className="ml-2">Share</span>
            </Button>
            <Button
              variant="outline"
              className="text-white-1 border-white-1 hover:bg-white-1 hover:text-black"
              onClick={handlePlayPause}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
        </div>
      </figure>
      {isPlaying && audioUrl && (
        <audio
          src={audioUrl}
          controls
          className="absolute bottom-0 left-0 right-0"
          autoPlay
        />
      )}
    </div>
  );
};

export default PodcastCard;
