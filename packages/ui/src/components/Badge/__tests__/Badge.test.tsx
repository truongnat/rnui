import React from "react";
import { render } from "@testing-library/react-native";
import { Badge } from "../Badge";
import { ThemeProvider } from "@truongnat/headless";

test("Badge renders visual presence", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Badge label="New" />
    </ThemeProvider>
  );
  expect(getByText("New")).toBeTruthy();
});
