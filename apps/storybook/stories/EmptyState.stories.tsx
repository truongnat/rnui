import type { StoryObj } from '@storybook/react-native';
import { Button, EmptyState, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const EmptyStateWrapper = (props: any) => <EmptyState {...props} />;

const meta = {
  title: 'Components/EmptyState',
  component: EmptyStateWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'search', 'error', 'offline', 'permission', 'empty'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyStateWrapper>;

export const Search: Story = {
  args: {
    variant: 'search',
    title: 'No results found',
    description: 'Try adjusting your search or filter.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    description: "We couldn't load this content.",
    action: (
      <Button
        label="Try Again"
        onPress={() => {}}
        onLongPress={() => {}}
        accessibilityLabel="Try again"
        accessibilityHint=""
      />
    ),
  },
};

export const Offline: Story = {
  args: {
    variant: 'offline',
    title: "You're offline",
    description: 'Check your connection and try again.',
  },
};

export const Permission: Story = {
  args: {
    variant: 'permission',
    title: 'Access denied',
    description: "You don't have permission to view this.",
  },
};

export const Empty: Story = {
  args: {
    variant: 'empty',
    title: 'Nothing here yet',
    description: 'When there is content, it will show up here.',
  },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 24 }}>
      <EmptyStateWrapper {...args} variant="search" size="sm" />
      <EmptyStateWrapper {...args} variant="search" size="md" />
      <EmptyStateWrapper {...args} variant="search" size="lg" />
    </View>
  ),
};
