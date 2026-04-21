import type { StoryObj } from '@storybook/react-native';
import { Switch, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const SwitchWrapper = (props: any) => (
  <Switch
    {...props}
    on={props.on ?? false}
    onChange={props.onChange ?? (() => {})}
  />
);

const meta = {
  title: 'Components/Switch',
  component: SwitchWrapper,
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
  },
  args: {
    label: 'Switch',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SwitchWrapper>;

export const Off: Story = {
  args: { label: 'Switch off' },
};

export const On: Story = {
  args: { label: 'Switch on', on: true },
};

export const WithDescription: Story = {
  args: { label: 'Notifications', description: 'Receive push notifications' },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <SwitchWrapper {...args} label="Small" size="sm" on />
      <SwitchWrapper {...args} label="Medium" size="md" on />
      <SwitchWrapper {...args} label="Large" size="lg" on />
    </View>
  ),
};
