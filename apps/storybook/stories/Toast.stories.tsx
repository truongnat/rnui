import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, ToastContainer, useToast, Button } from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <SafeAreaProvider>
      <View style={{ flex: 1, padding: 24, gap: 12 }}>
        {children}
      </View>
    </SafeAreaProvider>
  </ThemeProvider>
);

const meta = {
  title: "Components/Toast",
  component: ToastContainer,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top", "bottom"],
    },
  },
  args: {
    position: "bottom",
  },
};

export default meta;

type Story = StoryObj<typeof ToastContainer>;

export const Basic: Story = {
  render: (args: any) => {
    const toast = useToast();
    return (
      <View style={{ flex: 1, gap: 12 }}>
        {/* @ts-ignore */}
        <Button label="Success" onPress={() => toast.success("Saved successfully")} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Success" accessibilityHint="" />
        {/* @ts-ignore */}
        <Button label="Warning" variant="outline" onPress={() => toast.warning("Check your input")} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Warning" accessibilityHint="" />
        {/* @ts-ignore */}
        <Button label="Error" variant="ghost" onPress={() => toast.error("Something went wrong")} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Error" accessibilityHint="" />
        {/* @ts-ignore */}
        <Button label="Persistent" onPress={() => toast.show({ message: "Needs attention", persistent: true })} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Persistent" accessibilityHint="" />
        <ToastContainer {...args} position="bottom" />
      </View>
    );
  },
};
