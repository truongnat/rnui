import React from "react";
import { render } from "@testing-library/react-native";
import { Divider } from "../Divider";
import { ThemeProvider } from "@rnui/headless";

test("Divider renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Divider />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
