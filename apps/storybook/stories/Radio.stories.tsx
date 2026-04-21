import type { StoryObj } from '@storybook/react-native';
import { RadioGroup, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { useState } from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const RadioGroupWrapper = (props: any) => {
  const [value, setValue] = useState(
    props.defaultValue ?? props.options?.[0]?.value
  );
  return <RadioGroup {...props} value={value} onChange={setValue} />;
};

const meta = {
  title: 'Components/Radio',
  component: RadioGroupWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    label: 'Options',
    direction: 'vertical',
    size: 'md',
    options: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupWrapper>;

export const Vertical: Story = {
  args: { direction: 'vertical' },
};

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
};

export const WithDescriptions: Story = {
  args: {
    options: [
      {
        value: 'react',
        label: 'React Native',
        description: 'Cross-platform mobile',
      },
      {
        value: 'flutter',
        label: 'Flutter',
        description: "Google's UI toolkit",
      },
      { value: 'native', label: 'Native', description: 'Swift / Kotlin' },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    options: [
      { value: 'a', label: 'Enabled A' },
      { value: 'b', label: 'Disabled B', disabled: true },
      { value: 'c', label: 'Enabled C' },
    ],
  },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <RadioGroupWrapper {...args} label="Small" size="sm" />
      <RadioGroupWrapper {...args} label="Medium" size="md" />
      <RadioGroupWrapper {...args} label="Large" size="lg" />
    </View>
  ),
};
