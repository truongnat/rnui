import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Drawer, Button } from "@truongdq01/ui";
import { View, Text } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const DrawerWrapper = (props: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <Button
        label="Open Drawer"
        onPress={() => setOpen(true)}
        onLongPress={() => {}}
        accessibilityLabel="Open drawer"
        accessibilityHint=""
      />
      <Drawer
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      >
        <View style={{ padding: 24, width: 280, height: "100%", backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>Drawer</Text>
          <Text style={{ color: "#666", marginBottom: 24 }}>
            This is a drawer component that slides in from the side.
          </Text>
          <Button
            label="Close"
            onPress={() => setOpen(false)}
            onLongPress={() => {}}
            accessibilityLabel="Close drawer"
            accessibilityHint=""
          />
        </View>
      </Drawer>
    </View>
  );
};

const meta = {
  title: "Components/Drawer",
  component: DrawerWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    anchor: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    variant: {
      control: { type: "select" },
      options: ["temporary", "persistent"],
    },
  },
  args: {
    anchor: "left",
    variant: "temporary",
  },
};

export default meta;
type Story = StoryObj<typeof DrawerWrapper>;

export const Left: Story = {
  args: { anchor: "left" },
};

export const Right: Story = {
  args: { anchor: "right" },
};
