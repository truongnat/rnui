import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Snackbar, Button } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const SnackbarWrapper = (props: any) => {
  const [open, setOpen] = React.useState(true);
  return (
    <View style={{ flex: 1 }}>
      <Button
        label="Show Snackbar"
        onPress={() => setOpen(true)}
        onLongPress={() => {}}
        accessibilityLabel="Show snackbar"
        accessibilityHint=""
      />
      <Snackbar
        {...props}
        open={open}
        message={props.message ?? 'Action completed'}
        onClose={() => setOpen(false)}
      />
    </View>
  );
};

const meta = {
  title: 'Components/Snackbar',
  component: SnackbarWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    message: { control: 'text' },
    autoHideDuration: { control: 'number' },
    anchorOriginVertical: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
    anchorOriginHorizontal: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
  args: {
    message: 'Action completed successfully',
    autoHideDuration: 4000,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof SnackbarWrapper>;

export const Default: Story = {};

export const TopCenter: Story = {
  args: { anchorOriginVertical: 'top', anchorOriginHorizontal: 'center' },
};

export const BottomLeft: Story = {
  args: { anchorOriginVertical: 'bottom', anchorOriginHorizontal: 'left' },
};

export const NoAutoHide: Story = {
  args: { autoHideDuration: null },
};
