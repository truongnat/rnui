import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Chip } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const ChipWrapper = (props: any) => (
  <Chip {...props} />
);

const meta = {
  title: "Components/Chip",
  component: ChipWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "success", "error", "warning", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Chip",
    variant: "filled",
    color: "default",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ChipWrapper>;

export const Default: Story = {
  args: { label: "Design" },
};

export const Outlined: Story = {
  args: { label: "Dev", variant: "outlined" },
};

export const Success: Story = {
  args: { label: "Done", variant: "solid", color: "success" },
};

export const AllColors: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      <ChipWrapper {...args} label="Default" color="default" />
      <ChipWrapper {...args} label="Primary" color="primary" />
      <ChipWrapper {...args} label="Success" color="success" />
      <ChipWrapper {...args} label="Error" color="error" />
      <ChipWrapper {...args} label="Warning" color="warning" />
      <ChipWrapper {...args} label="Info" color="info" />
    </View>
  ),
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <ChipWrapper {...args} label="Small" size="sm" />
      <ChipWrapper {...args} label="Medium" size="md" />
      <ChipWrapper {...args} label="Large" size="lg" />
    </View>
  ),
};
