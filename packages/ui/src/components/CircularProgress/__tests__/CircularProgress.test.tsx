import React from "react";
import { render } from "@testing-library/react-native";
import { CircularProgress } from "../CircularProgress";
import { ThemeProvider } from "@truongnat/headless";

test("CircularProgress renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <CircularProgress value={50} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
