import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base classes for all buttons
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90', // Assuming primary-foreground is defined or white/black
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        error: 'bg-error text-error-foreground hover:bg-error/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 rounded-md', // Example: larger buttons might have different rounding
        icon: 'h-10 w-10', // For icon-only buttons
      },
      variant: { // Additional variants like outline
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        // default will be solid fill based on intent
      }
    },
    compoundVariants: [
      // Example: Outline primary button
      {
        intent: 'primary',
        variant: 'outline',
        className: 'border-primary text-primary hover:bg-primary/10', // More specific classes
      },
      {
        intent: 'secondary',
        variant: 'outline',
        className: 'border-secondary-dark text-content hover:bg-secondary/20',
      }
      // Add more compound variants as needed
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);
