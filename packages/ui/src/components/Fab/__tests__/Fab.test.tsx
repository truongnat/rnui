import React from "react";
import { render } from "@testing-library/react-native";
import { Fab } from "../Fab";
import { ThemeProvider } from "@rnui/headless";

test("Fab renders label in extended variant", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Fab label="Add" variant="extended" />
    </ThemeProvider>
  );
  expect(getByText("Add")).toBeTruthy();
});
