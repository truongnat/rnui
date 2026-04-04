import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Dialog, Button } from '@truongdq01/ui';
import { View, Text } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const DialogWrapper = (props: any) => {
  const [open, setOpen] = React.useState(true);
  return (
    <View>
      <Button
        label="Open Dialog"
        onPress={() => setOpen(true)}
        onLongPress={() => {}}
        accessibilityLabel="Open dialog"
        accessibilityHint=""
      />
      <Dialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <>
            <Button
              label="Cancel"
              variant="outline"
              onPress={() => setOpen(false)}
              onLongPress={() => {}}
              accessibilityLabel="Cancel"
              accessibilityHint=""
            />
            <Button
              label="Confirm"
              onPress={() => setOpen(false)}
              onLongPress={() => {}}
              accessibilityLabel="Confirm"
              accessibilityHint=""
            />
          </>
        }
      >
        <Text>{props.children ?? 'Dialog content goes here'}</Text>
      </Dialog>
    </View>
  );
};

const meta = {
  title: 'Components/Dialog',
  component: DialogWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    title: 'Dialog Title',
    fullWidth: false,
    children: 'Are you sure you want to proceed?',
  },
};

export default meta;
type Story = StoryObj<typeof DialogWrapper>;

export const Default: Story = {
  args: { title: 'Confirm Action' },
};

export const FullWidth: Story = {
  args: { title: 'Full Width Dialog', fullWidth: true },
};

export const WithoutTitle: Story = {
  args: {},
};
