import type { StoryObj } from '@storybook/react-native';
import { Avatar, AvatarGroup, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const AvatarWrapper = (props: any) => (
  <Avatar
    {...props}
    accessibilityLabel={props.accessibilityLabel ?? props.initials ?? 'Avatar'}
  />
);

const meta = {
  title: 'Components/Avatar',
  component: AvatarWrapper,
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
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'rounded'],
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', 'away'],
    },
    initials: { control: 'text' },
    src: { control: 'text' },
  },
  args: {
    initials: 'JD',
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof AvatarWrapper>;

export const Initials: Story = {
  args: { initials: 'JD' },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    accessibilityLabel: 'Avatar',
  },
};

export const WithStatus: Story = {
  args: { initials: 'ON', status: 'online' },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <AvatarWrapper {...args} initials="XS" size="xs" />
      <AvatarWrapper {...args} initials="SM" size="sm" />
      <AvatarWrapper {...args} initials="MD" size="md" />
      <AvatarWrapper {...args} initials="LG" size="lg" />
      <AvatarWrapper {...args} initials="XL" size="xl" />
    </View>
  ),
};

export const AllStatuses: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <AvatarWrapper {...args} initials="ON" status="online" />
      <AvatarWrapper {...args} initials="OF" status="offline" />
      <AvatarWrapper {...args} initials="BY" status="busy" />
      <AvatarWrapper {...args} initials="AW" status="away" />
    </View>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { initials: 'AN', accessibilityLabel: 'AN' },
        { initials: 'BT', accessibilityLabel: 'BT' },
        { initials: 'CL', accessibilityLabel: 'CL' },
        { initials: 'DP', accessibilityLabel: 'DP' },
        { initials: 'EH', accessibilityLabel: 'EH' },
        { initials: 'FN', accessibilityLabel: 'FN' },
      ]}
      max={4}
      overlap={12}
    />
  ),
};
