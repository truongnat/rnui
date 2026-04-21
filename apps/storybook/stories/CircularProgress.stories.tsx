import type { StoryObj } from '@storybook/react-native';
import { CircularProgress, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const CircularProgressWrapper = (props: any) => <CircularProgress {...props} />;

const meta = {
  title: 'Components/CircularProgress',
  component: CircularProgressWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    variant: {
      control: { type: 'select' },
      options: ['indeterminate', 'determinate'],
    },
    value: { control: 'number' },
    showLabel: { control: 'boolean' },
  },
  args: {
    size: 'md',
    color: 'primary',
    variant: 'indeterminate',
    value: 0,
    showLabel: false,
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgressWrapper>;

export const Indeterminate: Story = {
  args: { variant: 'indeterminate' },
};

export const Determinate: Story = {
  args: { variant: 'determinate', value: 60 },
};

export const WithLabel: Story = {
  args: { variant: 'determinate', value: 75, showLabel: true },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <CircularProgressWrapper {...args} size="sm" />
      <CircularProgressWrapper {...args} size="md" />
      <CircularProgressWrapper {...args} size="lg" />
    </View>
  ),
};

export const AllColors: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <CircularProgressWrapper {...args} color="primary" />
      <CircularProgressWrapper {...args} color="secondary" />
      <CircularProgressWrapper {...args} color="success" />
      <CircularProgressWrapper {...args} color="error" />
      <CircularProgressWrapper {...args} color="warning" />
    </View>
  ),
};
