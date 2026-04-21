import type { StoryObj } from '@storybook/react-native';
import { Slider, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const SliderWrapper = (props: any) => (
  <Slider
    {...props}
    min={props.min ?? 0}
    max={props.max ?? 100}
    step={props.step ?? 1}
    defaultValue={props.defaultValue ?? 50}
  />
);

const meta = {
  title: 'Components/Slider',
  component: SliderWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    showMarks: { control: 'boolean' },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
  args: {
    label: 'Slider',
    showValue: false,
    showMarks: false,
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
};

export default meta;
type Story = StoryObj<typeof SliderWrapper>;

export const Default: Story = {
  args: { label: 'Volume' },
};

export const WithValue: Story = {
  args: {
    label: 'Opacity',
    showValue: true,
    formatValue: (v: number) => `${Math.round(v)}%`,
  },
};

export const WithMarks: Story = {
  args: {
    label: 'Year',
    showValue: true,
    showMarks: true,
    min: 2000,
    max: 2030,
    step: 5,
    defaultValue: 2015,
    formatValue: (v: number) => String(v),
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 24 }}>
      <SliderWrapper {...args} label="Basic" />
      <SliderWrapper
        {...args}
        label="With value"
        showValue
        formatValue={(v: number) => `${v}%`}
      />
      <SliderWrapper
        {...args}
        label="With marks"
        showMarks
        showValue
        min={0}
        max={100}
        step={25}
      />
      <SliderWrapper {...args} label="Disabled" disabled />
    </View>
  ),
};
