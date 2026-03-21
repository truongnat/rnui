import React from "react";
import { render } from "@testing-library/react-native";
import { TextField } from "../TextField";
import { ThemeProvider } from "@rnui/headless";

test("TextField renders label", () => {
  const { getByText } = render(
    <ThemeProvider>
      <TextField label="Full Name" />
    </ThemeProvider>
  );
  expect(getByText("Full Name")).toBeTruthy();
});
