import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Tooltip } from "@truongdq01/ui";
import { View, Text } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const TooltipWrapper = (props: any) => (
  <Tooltip title={props.title ?? "Tooltip text"} placement={props.placement ?? "top"}>
    <View style={{ width: 100, height: 40, backgroundColor: "#f1f5f9", borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#cbd5e1" }}>
      <Text style={{ fontSize: 12 }}>{props.placement ?? "top"}</Text>
    </View>
  </Tooltip>
);

const meta = {
  title: "Components/Tooltip",
  component: TooltipWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    title: { control: "text" },
    placement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end"],
    },
  },
  args: {
    title: "Tooltip text",
    placement: "top",
  },
};

export default meta;
type Story = StoryObj<typeof TooltipWrapper>;

export const Top: Story = {
  args: { placement: "top" },
};

export const Bottom: Story = {
  args: { placement: "bottom" },
};

export const Left: Story = {
  args: { placement: "left" },
};

export const Right: Story = {
  args: { placement: "right" },
};

export const AllPlacements: Story = {
  render: (args: any) => (
    <View style={{ gap: 24, padding: 20 }}>
      <TooltipWrapper {...args} title="Top" placement="top" />
      <TooltipWrapper {...args} title="Bottom" placement="bottom" />
      <TooltipWrapper {...args} title="Left" placement="left" />
      <TooltipWrapper {...args} title="Right" placement="right" />
    </View>
  ),
};
