import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/Card/Card'; // Assuming @/ resolves to src/lib
import { Button, type ButtonProps } from '@/Button/Button'; // To show interactive elements // Added ButtonProps import
import { LucideBell, LucideUserCircle, LucideCheck, LucideAlertTriangle, LucidePartyPopper } from 'lucide-react'; // Added missing imports
import React from 'react'; // Added React import

const meta = {
  title: 'Components/Card',
  component: Card,
  subcomponents: { CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
  parameters: {
    layout: 'centered', // Or 'padded' if cards are wide
  },
  tags: ['autodocs'],
  argTypes: {
    // We don't have many props on Card itself other than className and children
    // so not much to control here directly for the main Card component.
    // The stories will showcase composition.
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card. It provides context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae Nunc
          velit cursus eget nunc scelerisque.
        </p>
      </CardContent>
      <CardFooter>
        <Button intent="primary" size="sm">View Details</Button>
        <Button intent="ghost" size="sm" className="ml-auto">Dismiss</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleContent: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardContent>
        <p>This card only has content. Useful for quick displays of information.</p>
        <p className="mt-4 text-sm text-content-subtle dark:text-dark-content-subtle">
          No header or footer needed here.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderOnly: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      {/* Optional: Could add a thin CardContent for spacing if needed */}
      {/* <CardContent /> */}
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <LucideBell className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};


const notifications = [
  {
    title: "Your subscription is expiring soon!",
    description: "1 day ago",
    icon: <LucideAlertTriangle className="h-5 w-5 text-warning" />,
  },
  {
    title: "New feature: Dark Mode",
    description: "2 days ago",
    icon: <LucidePartyPopper className="h-5 w-5 text-accent" />,
  },
  {
    title: "Password Change Successful",
    description: "1 week ago",
    icon: <LucideCheck className="h-5 w-5 text-success" />,
  },
];

export const NotificationList: Story = {
  render: (args) => (
    <Card {...args} className="w-[400px]">
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
        <CardDescription>Check out what's new.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
            {/* Or use notification.icon */}
            {/* <div className="flex items-center justify-center h-full w-full">{notification.icon}</div> */}
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p className="text-sm text-content-subtle dark:text-dark-content-subtle">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <LucideCheck className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};


export const UserProfileCard: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          {/* Placeholder for an Avatar component */}
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary dark:bg-dark-secondary">
            <LucideUserCircle size={28} className="text-content-subtle dark:text-dark-content-subtle" />
          </span>
          <div>
            <CardTitle>Alicia Keys</CardTitle>
            <CardDescription>Software Engineer & Musician</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Building beautiful and accessible web experiences. Passionate about design systems and modern frontend technologies. In my free time, I enjoy playing the piano and exploring new hiking trails.
        </p>
        <div className="mt-4 flex space-x-2">
          <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent dark:text-accent">React</span>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary dark:text-primary">TypeScript</span>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-content dark:text-dark-content-DEFAULT">Tailwind CSS</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" intent="primary">View Portfolio</Button>
        <Button intent="secondary" className="ml-auto">Contact</Button>
      </CardFooter>
    </Card>
  ),
};
