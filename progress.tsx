'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    label?: string;
    striped?: boolean;
    animated?: boolean;
  }
>(({ className, value, label, striped, animated, ...props }, ref) => {
  const [progress, setProgress] = React.useState(value || 0);

  React.useEffect(() => {
    setProgress(value || 0);
  }, [value]);

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-4 w-full rounded-full overflow-hidden bg-gray-200',
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full transition-transform',
            {
              'bg-blue-500': !striped,
              'bg-blue-500 bg-gradient-to-r from-blue-500 to-blue-600': striped,
              'animate-pulse': animated,
            }
          )}
          style={{ transform: `translateX(${progress - 100}%)` }}
        />
      </ProgressPrimitive.Root>
      <div className="text-right text-xs text-gray-500">{progress}%</div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

const ProgressExample = () => {
  const [progress, setProgress] = React.useState(50);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Progress Bar Examples</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Default Progress Bar</h3>
        <ProgressBar value={progress} />

        <h3 className="text-lg font-medium">Progress Bar with Label</h3>
        <ProgressBar value={progress} label="Loading..." />

        <h3 className="text-lg font-medium">Striped Progress Bar</h3>
        <ProgressBar value={progress} striped />

        <h3 className="text-lg font-medium">Animated Progress Bar</h3>
        <ProgressBar value={progress} animated />

        <h3 className="text-lg font-medium">Striped and Animated Progress Bar</h3>
        <ProgressBar value={progress} striped animated />
      </div>

      <div className="space-y-2">
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          onClick={() => setProgress(prev => (prev < 100 ? prev + 10 : 100))}
        >
          Increase Progress
        </button>
        <button
          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
          onClick={() => setProgress(prev => (prev > 0 ? prev - 10 : 0))}
        >
          Decrease Progress
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Progress Bar Component</h1>
      <ProgressExample />
    </div>
  );
};

export default App;
export { ProgressBar };
