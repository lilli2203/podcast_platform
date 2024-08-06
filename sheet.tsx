'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { mergeClasses } from '@/lib/utils';

const SheetRoot = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const Overlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={mergeClasses(
      'fixed inset-0 z-50 bg-black/80 transition-opacity data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
Overlay.displayName = SheetPrimitive.Overlay.displayName;

const contentVariants = cva(
  'fixed z-50 bg-background p-6 shadow-lg transition-transform data-[state=open]:transform-none data-[state=closed]:transform-gpu',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b transform-gpu data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0',
        bottom:
          'inset-x-0 bottom-0 border-t transform-gpu data-[state=closed]:translate-y-full data-[state=open]:translate-y-0',
        left: 'inset-y-0 left-0 w-3/4 h-full border-r transform-gpu data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 sm:max-w-sm',
        right:
          'inset-y-0 right-0 w-3/4 h-full border-l transform-gpu data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof contentVariants> {}

const Content = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <Overlay />
    <SheetPrimitive.Content
      ref={ref}
      className={mergeClasses(contentVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4 text-white" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
Content.displayName = SheetPrimitive.Content.displayName;

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={mergeClasses('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  />
);
Header.displayName = 'Header';

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={mergeClasses('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
Footer.displayName = 'Footer';

const Title = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={mergeClasses('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
Title.displayName = SheetPrimitive.Title.displayName;

const Description = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={mergeClasses('text-sm text-muted-foreground', className)}
    {...props}
  />
));
Description.displayName = SheetPrimitive.Description.displayName;

export {
  SheetRoot as Sheet,
  SheetPortal,
  Overlay as SheetOverlay,
  SheetTrigger,
  SheetClose,
  Content as SheetContent,
  Header as SheetHeader,
  Footer as SheetFooter,
  Title as SheetTitle,
  Description as SheetDescription,
};
