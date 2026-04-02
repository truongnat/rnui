import React from "react";
import { render } from "@testing-library/react-native";
import { Typography } from "../Typography";
import { ThemeProvider } from "@truongdq01/headless";

test("Typography renders different variants", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="body1">Body Text</Typography>
      <Typography variant="overline">Section</Typography>
      <Typography variant="code">mono</Typography>
    </ThemeProvider>
  );
  expect(getByText("Heading 1")).toBeTruthy();
  expect(getByText("Body Text")).toBeTruthy();
  expect(getByText("Section")).toBeTruthy();
  expect(getByText("mono")).toBeTruthy();
});
