import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, ToggleButtonGroup, ToggleButton } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const ToggleButtonGroupWrapper = (props: any) => (
  <ToggleButtonGroup {...props}>
    <ToggleButton value="bold">Bold</ToggleButton>
    <ToggleButton value="italic">Italic</ToggleButton>
    <ToggleButton value="underline">Underline</ToggleButton>
  </ToggleButtonGroup>
);

const meta = {
  title: "Components/ToggleButton",
  component: ToggleButtonGroupWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    exclusive: { control: "boolean" },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    exclusive: false,
    orientation: "horizontal",
    size: "md",
    disabled: false,
    defaultValue: ["bold"],
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroupWrapper>;

export const MultiSelect: Story = {
  args: { exclusive: false, defaultValue: ["bold"] },
};

export const Exclusive: Story = {
  args: { exclusive: true, defaultValue: "bold" },
};

export const Vertical: Story = {
  args: { orientation: "vertical", defaultValue: ["bold"] },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <ToggleButtonGroupWrapper {...args} size="sm" />
      <ToggleButtonGroupWrapper {...args} size="md" />
      <ToggleButtonGroupWrapper {...args} size="lg" />
    </View>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
