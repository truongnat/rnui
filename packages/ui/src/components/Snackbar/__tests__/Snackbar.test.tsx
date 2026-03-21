import React from "react";
import { render } from "@testing-library/react-native";
import { Snackbar } from "../Snackbar";
import { ThemeProvider } from "@rnui/headless";

test("Snackbar renders message", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Snackbar open={true} message="Saved successfully" />
    </ThemeProvider>
  );
  expect(getByText("Saved successfully")).toBeTruthy();
});
