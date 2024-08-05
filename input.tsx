import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const combinedClasses = cn(
      "h-10 w-full px-3 py-2 text-sm rounded-md border bg-background border-input placeholder:text-muted-foreground ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
      className
    );

    return (
      <input
        type={type}
        className={combinedClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
