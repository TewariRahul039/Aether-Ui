import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideLoader2 } from 'lucide-react'; // For loading spinner
import { cn } from '@/utils/cn'; // Assumes a cn utility function will be created
import { buttonVariants } from './buttonVariants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  // iconBefore?: React.ReactElement; // Or React.ReactNode for more flexibility
  // iconAfter?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, variant, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // Disable button when loading
    const disabled = props.disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ intent, size, variant, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {loading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
        {/* {iconBefore && !loading && <span className="mr-2">{iconBefore}</span>} */}
        {children}
        {/* {iconAfter && !loading && <span className="ml-2">{iconAfter}</span>} */}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
