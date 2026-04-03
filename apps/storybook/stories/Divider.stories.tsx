import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Divider } from "@truongdq01/ui";
import { View, Text } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const DividerWrapper = (props: any) => (
  <Divider {...props} />
);

const meta = {
  title: "Components/Divider",
  component: DividerWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    label: { control: "text" },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    emphasis: { control: "boolean" },
    spacing: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
  },
  args: {
    orientation: "horizontal",
    emphasis: false,
    spacing: "md",
  },
};

export default meta;
type Story = StoryObj<typeof DividerWrapper>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "OR" },
};

export const Emphasis: Story = {
  args: { emphasis: true },
};

export const SpacingVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <DividerWrapper {...args} spacing="none" />
      <DividerWrapper {...args} spacing="sm" />
      <DividerWrapper {...args} spacing="md" />
      <DividerWrapper {...args} spacing="lg" />
    </View>
  ),
};

export const Vertical: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: "row", height: 40, alignItems: "center", gap: 12 }}>
      <Text>Item 1</Text>
      <DividerWrapper {...args} orientation="vertical" />
      <Text>Item 2</Text>
      <DividerWrapper {...args} orientation="vertical" />
      <Text>Item 3</Text>
    </View>
  ),
};
