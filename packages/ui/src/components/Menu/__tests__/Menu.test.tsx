import React from "react";
import { render } from "@testing-library/react-native";
import { Menu, MenuItem } from "../Menu";
import { ThemeProvider } from "@rnui/headless";

test("Menu renders when open", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Menu open={true}>
        <MenuItem>Option 1</MenuItem>
      </Menu>
    </ThemeProvider>
  );
  expect(getByText("Option 1")).toBeTruthy();
});
