import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, AvatarGroup } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const AvatarGroupWrapper = (props: any) => (
  <AvatarGroup
    {...props}
    avatars={props.avatars ?? [
      { initials: "AN", accessibilityLabel: "AN" },
      { initials: "BT", accessibilityLabel: "BT" },
      { initials: "CL", accessibilityLabel: "CL" },
      { initials: "DP", accessibilityLabel: "DP" },
      { initials: "EH", accessibilityLabel: "EH" },
      { initials: "FN", accessibilityLabel: "FN" },
    ]}
  />
);

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroupWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    max: { control: "number" },
    overlap: { control: "number" },
  },
  args: {
    size: "md",
    max: 4,
    overlap: 12,
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroupWrapper>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm", max: 5, overlap: 8 },
};

export const Large: Story = {
  args: { size: "lg", max: 3, overlap: 16 },
};

export const NoMax: Story = {
  args: { max: 10, overlap: 12 },
};
