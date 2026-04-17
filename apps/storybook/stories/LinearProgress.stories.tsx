import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, LinearProgress } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const LinearProgressWrapper = (props: any) => <LinearProgress {...props} />;

const meta = {
  title: 'Components/LinearProgress',
  component: LinearProgressWrapper,
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
      options: ['indeterminate', 'determinate', 'buffer', 'query'],
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
        'brand',
        'accent',
      ],
    },
    value: { control: 'number' },
    valueBuffer: { control: 'number' },
  },
  args: {
    variant: 'indeterminate',
    color: 'primary',
    value: 0,
    valueBuffer: 0,
  },
};

export default meta;
type Story = StoryObj<typeof LinearProgressWrapper>;

export const Indeterminate: Story = {
  args: { variant: 'indeterminate' },
};

export const Determinate: Story = {
  args: { variant: 'determinate', value: 60 },
};

export const Buffer: Story = {
  args: { variant: 'buffer', value: 40, valueBuffer: 70 },
};

export const Query: Story = {
  args: { variant: 'query' },
};

export const AllColors: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <LinearProgressWrapper
        {...args}
        color="primary"
        variant="determinate"
        value={70}
      />
      <LinearProgressWrapper
        {...args}
        color="success"
        variant="determinate"
        value={60}
      />
      <LinearProgressWrapper
        {...args}
        color="error"
        variant="determinate"
        value={50}
      />
      <LinearProgressWrapper
        {...args}
        color="warning"
        variant="determinate"
        value={40}
      />
      <LinearProgressWrapper
        {...args}
        color="brand"
        variant="determinate"
        value={30}
      />
    </View>
  ),
};
