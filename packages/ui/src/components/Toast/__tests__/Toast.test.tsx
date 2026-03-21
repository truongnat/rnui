import React from "react";
import { render } from "@testing-library/react-native";
import { ToastContainer } from "../Toast";
import { ThemeProvider } from "@rnui/headless";

test("ToastContainer renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ToastContainer />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
