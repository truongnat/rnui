import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider, Card, Button } from "@truongdq01/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 12 }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: "Components/Card",
  component: Card,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    padding: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "none"],
    },
  },
  args: {
    padding: "md",
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <Card {...args} style={{}}>
        <View style={{ gap: 6 }}>
          <Text style={{ fontWeight: "600" }}>Team updates</Text>
          <Text>All systems operational.</Text>
        </View>
      </Card>

      <Card {...args} onPress={() => { }} accessibilityLabel="Open card" style={{}}>
        <View style={{ gap: 12 }}>
          <Text style={{ fontWeight: "600" }}>Pressable card</Text>
          <Text>Tap to trigger onPress.</Text>
          <Button label="Primary action" size="sm" onPress={() => { }} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Primary" accessibilityHint="" />
        </View>
      </Card>
    </View>
  ),
};
