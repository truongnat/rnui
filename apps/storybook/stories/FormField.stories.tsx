import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, FormField, Input } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const FormFieldWrapper = (props: any) => (
  <FormField {...props}>
    {props.children ?? <Input placeholder="Enter text..." />}
  </FormField>
);

const meta = {
  title: 'Components/FormField',
  component: FormFieldWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'FormField',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldWrapper>;

export const Default: Story = {
  args: { label: 'Username', helperText: 'Must be unique' },
};

export const Required: Story = {
  args: { label: 'Email', required: true },
};

export const WithError: Story = {
  args: { label: 'Password', error: 'Password is too short' },
};

export const WithTrailing: Story = {
  render: (args: any) => (
    <FormFieldWrapper
      {...args}
      label="Username"
      labelTrailing={
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: '#e2e8f0',
            borderRadius: 4,
          }}
        />
      }
    />
  ),
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <FormFieldWrapper {...args} label="Basic" helperText="Helper text" />
      <FormFieldWrapper {...args} label="Required" required />
      <FormFieldWrapper
        {...args}
        label="Error"
        error="This field is required"
      />
    </View>
  ),
};
