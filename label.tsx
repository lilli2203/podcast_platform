"use client"

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/utils";

const labelStyles = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const CustomLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelStyles>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={mergeClasses(labelStyles(), className)}
    {...props}
  />
));

CustomLabel.displayName = LabelPrimitive.Root.displayName;

export { CustomLabel };
