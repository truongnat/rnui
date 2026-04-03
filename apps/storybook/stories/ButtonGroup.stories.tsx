import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, ButtonGroup, Button } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const ButtonGroupWrapper = (props: any) => (
  <ButtonGroup {...props}>
    <Button label="One" onPress={() => {}} onLongPress={() => {}} accessibilityLabel="One" accessibilityHint="" />
    <Button label="Two" onPress={() => {}} onLongPress={() => {}} accessibilityLabel="Two" accessibilityHint="" />
    <Button label="Three" onPress={() => {}} onLongPress={() => {}} accessibilityLabel="Three" accessibilityHint="" />
  </ButtonGroup>
);

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroupWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "outline", "ghost", "destructive"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    variant: "outline",
    size: "md",
    orientation: "horizontal",
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroupWrapper>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <ButtonGroupWrapper {...args} size="sm" />
      <ButtonGroupWrapper {...args} size="md" />
      <ButtonGroupWrapper {...args} size="lg" />
    </View>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
