import type { StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';
import { ThemeProvider, Select } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const SelectWrapper = (props: any) => {
  const [value, setValue] = useState(props.value ?? props.options?.[0]?.value);
  return <Select {...props} value={value} onChange={setValue} />;
};

const meta = {
  title: 'Components/Select',
  component: SelectWrapper,
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
    searchable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    label: 'Select',
    placeholder: 'Select…',
    searchable: false,
    loading: false,
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SelectWrapper>;

export const Default: Story = {
  args: { label: 'Country' },
};

export const Searchable: Story = {
  args: { label: 'Searchable', searchable: true },
};

export const WithError: Story = {
  args: { label: 'Required', error: 'Please choose a value' },
};

export const Loading: Story = {
  args: { label: 'Loading', loading: true },
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <SelectWrapper {...args} label="Basic" />
      <SelectWrapper {...args} label="Searchable" searchable />
      <SelectWrapper {...args} label="Error" error="Selection required" />
      <SelectWrapper {...args} label="Loading" loading />
    </View>
  ),
};
