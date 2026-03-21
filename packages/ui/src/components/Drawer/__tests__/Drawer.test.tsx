import React from "react";
import { render } from "@testing-library/react-native";
import { Drawer } from "../Drawer";
import { ThemeProvider } from "@rnui/headless";
import { Text } from "react-native";

test("Drawer renders children", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Drawer open={true}>
        <Text>Drawer Content</Text>
      </Drawer>
    </ThemeProvider>
  );
  expect(getByText("Drawer Content")).toBeTruthy();
});
