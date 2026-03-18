import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";
import { ThemeProvider, Badge } from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <View style={{ padding: 24, gap: 12 }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: "Components/Badge",
  component: Badge,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["default", "brand", "success", "warning", "error", "info"],
    },
  },
  args: {
    label: "Badge",
    variant: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: (args) => (
    <View style={{ gap: 10 }}>
      <Badge {...args} label="Default" variant="default" />
      <Badge {...args} label="Brand" variant="brand" />
      <Badge {...args} label="Success" variant="success" />
      <Badge {...args} label="Warning" variant="warning" />
      <Badge {...args} label="Error" variant="error" />
      <Badge {...args} label="Info" variant="info" />
    </View>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <View style={{ gap: 10 }}>
      <Badge {...args} label="Success" variant="success" />
      <Badge {...args} label="Warning" variant="warning" />
      <Badge {...args} label="Error" variant="error" />
      <Badge {...args} label="Info" variant="info" />
    </View>
  ),
};
