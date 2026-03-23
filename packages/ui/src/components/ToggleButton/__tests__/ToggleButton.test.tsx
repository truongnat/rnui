import React from "react";
import { render } from "@testing-library/react-native";
import { ToggleButton, ToggleButtonGroup } from "../ToggleButton";
import { ThemeProvider } from "@truongnat/headless";

test("ToggleButton renders children", () => {
  const { getByText } = render(
    <ThemeProvider>
      <ToggleButtonGroup value={["bold"]}>
        <ToggleButton value="bold">B</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
  expect(getByText("B")).toBeTruthy();
});
