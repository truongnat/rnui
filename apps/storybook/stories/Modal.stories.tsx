import type { StoryObj } from '@storybook/react-native';
import { Button, Modal, ThemeProvider } from '@truongdq01/ui';
import React from 'react';
import { Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const ModalWrapper = (props: any) => {
  const [open, setOpen] = React.useState(true);
  return (
    <View>
      <Button
        label="Open Modal"
        onPress={() => setOpen(true)}
        onLongPress={() => {}}
        accessibilityLabel="Open modal"
        accessibilityHint=""
      />
      <Modal {...props} open={open} onClose={() => setOpen(false)}>
        <View
          style={{
            padding: 24,
            backgroundColor: '#fff',
            borderRadius: 12,
            minWidth: 280,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
            {props.title ?? 'Modal Title'}
          </Text>
          <Text style={{ marginBottom: 16, color: '#666' }}>
            {props.children ?? 'Modal content'}
          </Text>
          <Button
            label="Close"
            onPress={() => setOpen(false)}
            onLongPress={() => {}}
            accessibilityLabel="Close modal"
            accessibilityHint=""
          />
        </View>
      </Modal>
    </View>
  );
};

const meta = {
  title: 'Components/Modal',
  component: ModalWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    hideBackdrop: { control: 'boolean' },
    keepMounted: { control: 'boolean' },
  },
  args: {
    hideBackdrop: false,
    keepMounted: false,
    title: 'Modal Title',
    children: 'This is a modal dialog',
  },
};

export default meta;
type Story = StoryObj<typeof ModalWrapper>;

export const Default: Story = {};

export const HideBackdrop: Story = {
  args: { hideBackdrop: true },
};

export const KeepMounted: Story = {
  args: { keepMounted: true },
};
