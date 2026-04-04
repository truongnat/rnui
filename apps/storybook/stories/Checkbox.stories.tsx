import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Checkbox } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const CheckboxWrapper = (props: any) => (
  <Checkbox
    {...props}
    checked={props.checked ?? false}
    onChange={props.onChange ?? (() => {})}
  />
);

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    label: 'Checkbox',
    size: 'md',
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxWrapper>;

export const Unchecked: Story = {
  args: { label: 'Unchecked' },
};

export const Checked: Story = {
  args: { label: 'Checked', checked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable feature',
    description: 'This will enable the new feature',
  },
};

export const Indeterminate: Story = {
  args: { label: 'Indeterminate', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <CheckboxWrapper {...args} label="Small" size="sm" checked />
      <CheckboxWrapper {...args} label="Medium" size="md" checked />
      <CheckboxWrapper {...args} label="Large" size="lg" checked />
    </View>
  ),
};
