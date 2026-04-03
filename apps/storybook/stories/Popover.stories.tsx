import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Popover, Button } from "@truongdq01/ui";
import { View, Text } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const PopoverWrapper = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<{ x: number; y: number; width?: number; height?: number } | null>(null);

  const handleOpen = (event: any) => {
    event.target?.measure?.((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
      setAnchorEl({ x: pageX, y: pageY, width, height });
      setOpen(true);
    });
  };

  return (
    <View>
      <Button
        label="Open Popover"
        onPress={handleOpen}
        onLongPress={() => {}}
        accessibilityLabel="Open popover"
        accessibilityHint=""
      />
      <Popover
        {...props}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
      >
        <View style={{ padding: 16, minWidth: 200 }}>
          <Text style={{ fontWeight: "600", marginBottom: 8 }}>Popover</Text>
          <Text style={{ color: "#666" }}>
            This is a popover positioned relative to the anchor element.
          </Text>
        </View>
      </Popover>
    </View>
  );
};

const meta = {
  title: "Components/Popover",
  component: PopoverWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    anchorOriginVertical: {
      control: { type: "select" },
      options: ["top", "bottom"],
    },
    anchorOriginHorizontal: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
  },
  args: {
    anchorOriginVertical: "bottom",
    anchorOriginHorizontal: "center",
    transformOriginVertical: "top",
    transformOriginHorizontal: "center",
  },
};

export default meta;
type Story = StoryObj<typeof PopoverWrapper>;

export const Default: Story = {};
