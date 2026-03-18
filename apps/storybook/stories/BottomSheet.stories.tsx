import type { StoryObj } from "@storybook/react-native";
import React, { useRef } from "react";
import { View, Text } from "react-native";
import { ThemeProvider, BottomSheet, Button, type BottomSheetRef } from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <View style={{ flex: 1, padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  render: () => {
    const sheetRef = useRef<BottomSheetRef>(null);
    return (
      <View style={{ gap: 12 }}>
        <Button label="Open sheet" onPress={() => sheetRef.current?.open()} />

        <BottomSheet ref={sheetRef} snapPoints={["45%", "85%"]}>
          <View style={{ flex: 1, padding: 24, gap: 12 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Bottom sheet</Text>
            <Text>Drag down or tap outside to close.</Text>
            <Button label="Close" variant="outline" onPress={() => sheetRef.current?.close()} />
          </View>
        </BottomSheet>
      </View>
    );
  },
};
