import * as React from "react";
import { mergeClasses } from "@/lib/utils";

export interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className, label, error, maxLength, ...props }, ref) => {
    const [remainingChars, setRemainingChars] = React.useState(maxLength || 0);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength) {
        setRemainingChars(maxLength - event.target.value.length);
      }
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          className={mergeClasses(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          onChange={handleInputChange}
          {...props}
        />
        {maxLength && (
          <div className="text-right text-xs text-gray-500">{remainingChars} characters remaining</div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

CustomTextarea.displayName = "CustomTextarea";

// Example Usage Components
const ExampleForm = () => {
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() === "") {
      setError("This field is required");
    } else {
      setError(undefined);
      alert("Form submitted");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomTextarea
        label="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={error}
        maxLength={200}
        placeholder="Enter your description here..."
      />
      <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

const CharacterLimitExample = () => {
  const [bio, setBio] = React.useState("");

  return (
    <div className="space-y-4">
      <CustomTextarea
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={150}
        placeholder="Tell us about yourself..."
      />
    </div>
  );
};

const ErrorExample = () => {
  return (
    <div className="space-y-4">
      <CustomTextarea
        label="Feedback"
        error="Feedback is required"
        placeholder="Your feedback..."
      />
    </div>
  );
};

const DisabledExample = () => {
  return (
    <div className="space-y-4">
      <CustomTextarea
        label="Comments"
        disabled
        placeholder="This field is disabled"
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Custom Textarea Examples</h1>
      <ExampleForm />
      <CharacterLimitExample />
      <ErrorExample />
      <DisabledExample />
    </div>
  );
};

export default App;
export { CustomTextarea };
