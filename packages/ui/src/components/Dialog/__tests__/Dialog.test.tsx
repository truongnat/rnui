import React from "react";
import { render } from "@testing-library/react-native";
import { Dialog } from "../Dialog";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

test("Dialog renders title and content", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Dialog open={true} title="Dialog Title">
        <Text>Dialog Content</Text>
      </Dialog>
    </ThemeProvider>
  );
  expect(getByText("Dialog Title")).toBeTruthy();
  expect(getByText("Dialog Content")).toBeTruthy();
});
