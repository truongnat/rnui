import type { StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';
import { ThemeProvider, Tabs, Tab } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const TabsWrapper = (props: any) => {
  const [value, setValue] = useState(0);
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value={0} label={props.firstLabel ?? 'Home'} />
      <Tab value={1} label={props.secondLabel ?? 'Settings'} />
      <Tab value={2} label={props.thirdLabel ?? 'Profile'} />
    </Tabs>
  );
};

const meta = {
  title: 'Components/Tabs',
  component: TabsWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    firstLabel: { control: 'text' },
    secondLabel: { control: 'text' },
    thirdLabel: { control: 'text' },
  },
  args: {
    firstLabel: 'Home',
    secondLabel: 'Settings',
    thirdLabel: 'Profile',
  },
};

export default meta;
type Story = StoryObj<typeof TabsWrapper>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    firstLabel: 'Overview',
    secondLabel: 'Analytics',
    thirdLabel: 'Reports',
  },
};
