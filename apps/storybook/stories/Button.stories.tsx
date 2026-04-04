import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Button } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

// Wrapper component that provides required props
const ButtonWrapper = (props: any) => (
  <Button
    {...props}
    onPress={props.onPress || (() => {})}
    onLongPress={props.onLongPress || (() => {})}
    accessibilityLabel={props.accessibilityLabel || props.label}
    accessibilityHint=""
  />
);

const meta = {
  title: 'Components/Button',
  component: ButtonWrapper,
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
      options: ['solid', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: 'Button',
    variant: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonWrapper>;

export const Solid: Story = {
  args: { label: 'Solid button', variant: 'solid' },
};

export const Outline: Story = {
  args: { label: 'Outline button', variant: 'outline' },
};

export const Ghost: Story = {
  args: { label: 'Ghost button', variant: 'ghost' },
};

export const Destructive: Story = {
  args: { label: 'Delete item', variant: 'destructive' },
};

export const Loading: Story = {
  args: { label: 'Loading...', loading: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <ButtonWrapper {...args} label="Solid" variant="solid" />
      <ButtonWrapper {...args} label="Outline" variant="outline" />
      <ButtonWrapper {...args} label="Ghost" variant="ghost" />
      <ButtonWrapper {...args} label="Destructive" variant="destructive" />
    </View>
  ),
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <ButtonWrapper {...args} label="Small" size="sm" />
      <ButtonWrapper {...args} label="Medium" size="md" />
      <ButtonWrapper {...args} label="Large" size="lg" />
    </View>
  ),
};
