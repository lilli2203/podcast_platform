"use client"

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/utils";

const labelStyles = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        danger: "text-danger",
        warning: "text-warning",
        success: "text-success",
        info: "text-info"
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      color: "default",
      size: "md"
    }
  }
);

const CustomLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelStyles>
>(({ className, color, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={mergeClasses(labelStyles({ color, size }), className)}
    {...props}
  />
));

CustomLabel.displayName = LabelPrimitive.Root.displayName;

// Example usage component
const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & { label: string; error?: string }
>(({ label, error, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <CustomLabel color={error ? "danger" : "default"}>{label}</CustomLabel>
      {children}
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
});

// Another example usage component
const ProfileForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Name" error={errors.name}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </FormField>
      <FormField label="Email" error={errors.email}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </FormField>
      <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export { CustomLabel, FormField, ProfileForm };
