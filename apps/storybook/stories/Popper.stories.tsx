import type { StoryObj } from '@storybook/react-native';
import { Button, Popper, ThemeProvider } from '@truongdq01/ui';
import React from 'react';
import { Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const PopperWrapper = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<{
    x: number;
    y: number;
    width?: number;
    height?: number;
  } | null>(null);

  const handleOpen = (event: any) => {
    event.target?.measure?.(
      (
        _x: number,
        _y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setAnchorEl({ x: pageX, y: pageY, width, height });
        setOpen(true);
      }
    );
  };

  return (
    <View>
      <Button
        label="Open Popper"
        onPress={handleOpen}
        onLongPress={() => {}}
        accessibilityLabel="Open popper"
        accessibilityHint=""
      />
      <Popper
        {...props}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
      >
        <View
          style={{
            padding: 12,
            backgroundColor: '#1e293b',
            borderRadius: 8,
            minWidth: 150,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>Popper content</Text>
        </View>
      </Popper>
    </View>
  );
};

const meta = {
  title: 'Components/Popper',
  component: PopperWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    placement: 'bottom',
  },
};

export default meta;
type Story = StoryObj<typeof PopperWrapper>;

export const Default: Story = {};

export const Top: Story = {
  args: { placement: 'top' },
};

export const Left: Story = {
  args: { placement: 'left' },
};

export const Right: Story = {
  args: { placement: 'right' },
};
