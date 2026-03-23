import React from "react";
import { render } from "@testing-library/react-native";
import { BottomSheet } from "../BottomSheet";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

test("BottomSheet renders children when open", () => {
  const { getByText } = render(
    <ThemeProvider>
      <BottomSheet snapPoints={["100%"]} open={true}>
        <Text>Sheet Content</Text>
      </BottomSheet>
    </ThemeProvider>
  );
  expect(getByText("Sheet Content")).toBeTruthy();
});
