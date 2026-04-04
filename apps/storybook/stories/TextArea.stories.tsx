import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, TextArea } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const TextAreaWrapper = (props: any) => (
  <TextArea
    {...props}
    value={props.value ?? ''}
    onChangeText={props.onChangeText ?? (() => {})}
    accessibilityLabel={props.accessibilityLabel ?? props.label}
  />
);

const meta = {
  title: 'Components/TextArea',
  component: TextAreaWrapper,
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
    disabled: { control: 'boolean' },
    maxLines: { control: 'number' },
    maxLength: { control: 'number' },
    showCounter: { control: 'boolean' },
  },
  args: {
    label: 'TextArea',
    placeholder: 'Enter text...',
    disabled: false,
    maxLines: 4,
    showCounter: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaWrapper>;

export const Default: Story = {
  args: { label: 'Bio', placeholder: 'Tell us about yourself...' },
};

export const WithError: Story = {
  args: {
    label: 'Review',
    error: 'This field is required',
    placeholder: 'Write your review...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    helperText: 'Max 500 characters',
    placeholder: 'Enter description...',
  },
};

export const WithCounter: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type message...',
    maxLength: 200,
    showCounter: true,
    counterPosition: 'inside',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    value: 'Cannot edit this content.',
  },
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <TextAreaWrapper {...args} label="Basic" placeholder="Basic textarea" />
      <TextAreaWrapper
        {...args}
        label="With counter"
        placeholder="With character counter"
        maxLength={100}
        showCounter
      />
      <TextAreaWrapper {...args} label="With error" error="Required field" />
      <TextAreaWrapper
        {...args}
        label="Disabled"
        disabled
        value="Read-only content"
      />
    </View>
  ),
};
