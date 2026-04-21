import type { StoryObj } from '@storybook/react-native';
import { Rating, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const RatingWrapper = (props: any) => (
  <Rating {...props} onChange={props.onChange ?? (() => {})} />
);

const meta = {
  title: 'Components/Rating',
  component: RatingWrapper,
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
    max: { control: 'number' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
  args: {
    size: 'md',
    max: 5,
    readOnly: false,
    disabled: false,
    showValue: false,
    compact: false,
    defaultValue: 3,
  },
};

export default meta;
type Story = StoryObj<typeof RatingWrapper>;

export const Default: Story = {
  args: { defaultValue: 3 },
};

export const WithValue: Story = {
  args: { defaultValue: 4, showValue: true },
};

export const ReadOnly: Story = {
  args: { value: 4.5, readOnly: true, showValue: true },
};

export const Disabled: Story = {
  args: { value: 3, disabled: true },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <RatingWrapper {...args} size="sm" defaultValue={4} />
      <RatingWrapper {...args} size="md" defaultValue={4} />
      <RatingWrapper {...args} size="lg" defaultValue={4} />
    </View>
  ),
};

export const Compact: Story = {
  args: { defaultValue: 3, compact: true, showValue: true },
};
