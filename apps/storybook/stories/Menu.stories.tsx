import type { StoryObj } from '@storybook/react-native';
import { Button, Menu, MenuItem, ThemeProvider } from '@truongdq01/ui';
import React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const MenuWrapper = (props: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <Button
        label="Open Menu"
        onPress={() => setOpen(true)}
        onLongPress={() => {}}
        accessibilityLabel="Open menu"
        accessibilityHint=""
      />
      <Menu open={open} onClose={() => setOpen(false)}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </View>
  );
};

const meta = {
  title: 'Components/Menu',
  component: MenuWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof MenuWrapper>;

export const Default: Story = {};
