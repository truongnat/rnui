import type { StoryObj } from '@storybook/react-native';
import { Fab, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const FabWrapper = (props: any) => (
  <Fab
    {...props}
    onPress={props.onPress ?? (() => {})}
    accessibilityLabel={props.accessibilityLabel ?? 'FAB'}
  />
);

const meta = {
  title: 'Components/Fab',
  component: FabWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['circular', 'extended'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    icon: 'add',
    color: 'primary',
    size: 'md',
    variant: 'circular',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof FabWrapper>;

export const Default: Story = {
  args: { icon: 'add' },
};

export const Extended: Story = {
  args: { icon: 'add', label: 'Create', variant: 'extended' },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <FabWrapper {...args} size="sm" />
      <FabWrapper {...args} size="md" />
      <FabWrapper {...args} size="lg" />
    </View>
  ),
};

export const Disabled: Story = {
  args: { icon: 'add', disabled: true },
};

export const AllColors: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <FabWrapper {...args} color="primary" />
      <FabWrapper {...args} color="secondary" />
      <FabWrapper {...args} color="success" />
      <FabWrapper {...args} color="error" />
    </View>
  ),
};
