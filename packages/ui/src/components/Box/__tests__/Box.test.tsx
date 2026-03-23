import React from "react";
import { render } from "@testing-library/react-native";
import { Box } from "../Box";
import { Text } from "react-native";
import { ThemeProvider } from "@truongnat/headless";

test("Box renders children correctly", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Box><Text>Inside Box</Text></Box>
    </ThemeProvider>
  );
  expect(getByText("Inside Box")).toBeTruthy();
});
