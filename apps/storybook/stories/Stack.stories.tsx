import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Stack, Box } from '@truongdq01/ui';
import { View, Text } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const StackWrapper = (props: any) => (
  <Stack {...props}>
    <Box style={{ height: 40, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
    <Box style={{ height: 40, backgroundColor: '#cbd5f5', borderRadius: 8 }} />
    <Box style={{ height: 40, backgroundColor: '#bfdbfe', borderRadius: 8 }} />
  </Stack>
);

const meta = {
  title: 'Components/Stack',
  component: StackWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['column', 'row', 'column-reverse', 'row-reverse'],
    },
    spacing: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    direction: 'column',
    spacing: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof StackWrapper>;

export const Vertical: Story = {
  args: { direction: 'column' },
};

export const Horizontal: Story = {
  args: { direction: 'row' },
};

export const AllSpacings: Story = {
  render: (args: any) => (
    <View style={{ gap: 24 }}>
      <StackWrapper {...args} spacing="xs" />
      <StackWrapper {...args} spacing="sm" />
      <StackWrapper {...args} spacing="md" />
      <StackWrapper {...args} spacing="lg" />
    </View>
  ),
};

export const WithAlignment: Story = {
  args: {
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
