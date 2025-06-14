import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; // For action logging
import { Button, type ButtonProps } from '@/Button/Button'; // Adjusted import path assuming '@/' resolves to 'src/lib'
import { LucideMail, LucideCheckCircle, LucideAlertTriangle, LucideXCircle, LucideRocket, LucidePartyPopper } from 'lucide-react';
import React from 'react'; // Added React import for MockLink

// Mock a Link component for asChild demonstration
const MockLink = React.forwardRef<HTMLAnchorElement, { href: string; children: React.ReactNode; className?: string }>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a href={href} onClick={(e) => e.preventDefault()} className={className} {...props} ref={ref}>
        {children} (MockLink)
      </a>
    );
  }
);
MockLink.displayName = "MockLink";


const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    variant: {
      control: 'radio',
      options: ['outline', undefined], // undefined for default solid fill
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    asChild: { control: 'boolean' },
    children: { control: 'text' },
    // onClick: { action: 'clicked' }, // Replaced by args.onClick from fn()
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
  args: { onClick: fn(), children: 'Button Text' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    intent: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    children: 'Secondary Button',
  },
};

export const Accent: Story = {
  args: {
    intent: 'accent',
    children: 'Accent Button',
  },
};

export const Success: Story = {
  args: {
    intent: 'success',
    children: 'Success',
    // iconBefore: <LucideCheckCircle size={18} />
  },
};

export const Warning: Story = {
  args: {
    intent: 'warning',
    children: 'Warning',
    // iconBefore: <LucideAlertTriangle size={18} />
  },
};

export const ErrorButton: Story = { // Renamed to avoid conflict with Error type
  args: {
    intent: 'error',
    children: 'Error',
    // iconBefore: <LucideXCircle size={18} />
  },
};


export const Outline: Story = {
  args: {
    variant: 'outline',
    intent: 'primary',
    children: 'Outline Button',
  },
};

export const OutlineSecondary: Story = {
  args: {
    variant: 'outline',
    intent: 'secondary',
    children: 'Outline Secondary',
  },
};


export const Ghost: Story = {
  args: {
    intent: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    intent: 'link',
    children: 'Link Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const IconButton: Story = {
  args: {
    size: 'icon',
    intent: 'primary',
    children: <LucideMail size={20} />, // Pass icon as children
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Processing...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const AsChildLink: Story = {
  args: {
    asChild: true,
    children: <MockLink href="/?path=/story/components-button--default">Go to Default</MockLink>,
    intent: 'primary',
    // Note: When using asChild, Button's own children prop is often ignored if the child passed also has children.
    // Storybook might show "Button Text" from default args if not careful.
    // The content comes from the MockLink's children.
  },
  // To make it clear in Storybook args table:
  parameters: {
    // controls: { include: ['asChild', 'intent', 'size', 'variant', 'disabled', 'loading', 'onClick'] }
  }
};

// Example with icon (using children for simplicity, could add iconBefore/iconAfter props to Button later)
// For now, the Button component expects loading spinner or children.
// We'd need to modify Button.tsx to properly support iconBefore/iconAfter props.
// Let's create a story that shows how an icon and text might be composed.

const ButtonWithIconAndText = (props: ButtonProps) => (
  <Button {...props}>
    <LucideRocket size={18} className="mr-2" />
    {props.children || 'Launch'}
  </Button>
);

export const WithLeadingIcon: Story = {
  render: (args) => <ButtonWithIconAndText {...args} />,
  args: {
    intent: 'accent',
    children: 'Deploy Feature', // This will be passed to ButtonWithIconAndText
  },
};

export const WithCelebrationIcon: Story = {
    render: (args) => (
        <Button {...args}>
            <LucidePartyPopper size={18} className={args.children ? "mr-2" : ""} />
            {args.children}
        </Button>
    ),
    args: {
        intent: 'success',
        variant: 'outline',
        children: "Celebrate!"
    }
}

export const IconOnlyCelebration: Story = {
    render: (args) => (
        <Button {...args}>
            <LucidePartyPopper size={20} />
        </Button>
    ),
    args: {
        size: 'icon',
        intent: 'success',
        variant: 'outline',
        "aria-label": "Celebrate", // Important for accessibility on icon-only buttons
        children: undefined, // Explicitly no text children
    }
}
