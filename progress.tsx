'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-4 w-full rounded-full overflow-hidden bg-gray-200', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full bg-blue-500 transition-transform"
      style={{ transform: `translateX(${value ? value - 100 : -100}%)` }}
    />
  </ProgressPrimitive.Root>
));
ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
