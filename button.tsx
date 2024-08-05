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
        plain: "border-none bg-transparent text-[16px] font-bold leading-normal text-white-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        small: "h-9 rounded-md px-3",
        large: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      appearance: "primary",
      size: "default",
      shape: "rounded-md",
    },
  }
);


export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}


const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, appearance, size, shape, asChild = false, loading = false, icon, children, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={classNames(buttonStyles({ appearance, size, shape, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </Component>
    );
  }
);
CustomButton.displayName = "CustomButton";


const loaderStyles = `
.loader {
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;


if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = loaderStyles;
  document.head.appendChild(style);
}


export { CustomButton, buttonStyles };


const Icon = () => (
  <svg width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.732.593l.086-.041L8 13.166l4.316 2.236.086.041c.372.198.81-.149.732-.593l-.03-.091-1.018-4.38 3.36-2.872.073-.073c.306-.384.19-.958-.207-1.14l-.093-.037-4.462-.41L8.412.94l-.048-.07a.733.733 0 0 0-1.28 0l-.048.07-1.577 3.748-4.462.41-.093.037c-.397.182-.513.756-.207 1.14l.073.073 3.36 2.872-1.018 4.38-.03.091zM8 12.027l-3.947 2.053 1.035-4.453-3.422-2.92 4.461-.411 1.373-3.261 1.373 3.261 4.461.411-3.422 2.92 1.035 4.453L8 12.027z"/>
  </svg>
);


const ExampleComponent = () => {
  return (
    <div className="space-y-4">
      <CustomButton appearance="primary" size="large" shape="rounded" icon={<Icon />}>
        Primary Button
      </CustomButton>
      <CustomButton appearance="danger" size="small" loading={true}>
        Loading Button
      </CustomButton>
      <CustomButton appearance="outline" size="icon">
        <Icon />
      </CustomButton>
    </div>
  );
};

export default ExampleComponent;
