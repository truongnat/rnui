import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Input } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const InputWrapper = (props: any) => (
  <Input {...props} onChange={props.onChange ?? (() => {})} />
);

const meta = {
  title: 'Components/Input',
  component: InputWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Input',
    placeholder: 'Enter text...',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputWrapper>;

export const Default: Story = {
  args: { label: 'Name', placeholder: 'John Doe' },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Invalid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    helperText: 'Must be unique',
    placeholder: 'Enter username',
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true, defaultValue: 'Cannot edit' },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <InputWrapper
        {...args}
        label="Small"
        size="sm"
        placeholder="Small input"
      />
      <InputWrapper
        {...args}
        label="Medium"
        size="md"
        placeholder="Medium input"
      />
      <InputWrapper
        {...args}
        label="Large"
        size="lg"
        placeholder="Large input"
      />
    </View>
  ),
};
