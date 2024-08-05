import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cx, type VariantProps } from "class-variance-authority";
import { classNames } from "@/lib/utils";

const buttonStyles = cx(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      appearance: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        plain: "border-none bg-transparent text-[16px] font-bold leading-normal text-white-1"
      },
      size: {
        default: "h-10 px-4 py-2",
        small: "h-9 rounded-md px-3",
        large: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      },
    },
    defaultVariants: {
      appearance: "primary",
      size: "default",
    },
  }
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, appearance, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={classNames(buttonStyles({ appearance, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton, buttonStyles };
