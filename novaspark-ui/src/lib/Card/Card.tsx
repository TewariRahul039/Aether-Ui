import React from 'react';
import { cn } from '@/utils/cn'; // Assuming @/utils/cn is available

// --- Card ---
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border shadow-sm', // Base classes
        // Explicitly using our theme structure for clarity and directness
        // These will fall back to Tailwind defaults if CSS variables from the plugin aren't set/found
        // or can be directly themed if one prefers not to use the plugin's variable mapping for everything.
        'border-secondary dark:border-dark-secondary',
        'bg-background dark:bg-dark-background',
        'text-content dark:text-dark-content-DEFAULT', // Assuming text-dark-content-DEFAULT is what you mean for card foreground in dark mode
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

// --- CardHeader ---
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// --- CardTitle ---
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>( // Corrected type from HTMLParagraphElement
  ({ className, ...props }, ref) => (
    <h3 // Should be a heading element
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// --- CardDescription ---
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-content-subtle dark:text-dark-content-subtle', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// --- CardContent ---
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// --- CardFooter ---
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
