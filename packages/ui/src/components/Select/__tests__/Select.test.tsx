import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Select } from "../Select";
import { ThemeProvider } from "@rnui/headless";

test("Select renders and opens on press", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Select label="Choose" value="" options={[{ label: "Option 1", value: "1" }]} />
    </ThemeProvider>
  );
  fireEvent.press(getByText("Choose"));
  expect(getByText("Option 1")).toBeTruthy();
});
