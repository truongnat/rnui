import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider, Pressable, useTheme } from "@truongnat/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: "Components/Pressable",
  component: Pressable,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

type Story = StoryObj<typeof Pressable>;

export const Basic: Story = {
  render: () => {
    const { tokens } = useTheme();
    return (
      // @ts-ignore
      <Pressable onPress={() => { }} feedbackMode="scale">
        {({ isPressed }: any) => (
          <View
            style={{
              paddingVertical: tokens.spacing[3],
              paddingHorizontal: tokens.spacing[4],
              borderRadius: tokens.radius.md,
              backgroundColor: isPressed ? tokens.color.bg.emphasis : tokens.color.surface.default,
              borderWidth: 1,
              borderColor: tokens.color.border.default,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "600", color: tokens.color.text.primary }}>Tap me</Text>
            <Text style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
              Press feedback is handled on the UI thread.
            </Text>
          </View>
        )}
      </Pressable>
    );
  },
};
