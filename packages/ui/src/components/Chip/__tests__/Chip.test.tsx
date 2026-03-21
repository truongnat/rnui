import React from "react";
import { render } from "@testing-library/react-native";
import { Chip } from "../Chip";
import { ThemeProvider } from "@rnui/headless";

test("Chip renders label", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Chip label="React Native" />
    </ThemeProvider>
  );
  expect(getByText("React Native")).toBeTruthy();
});
