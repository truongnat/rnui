import React from "react";
import { render } from "@testing-library/react-native";
import { Icon } from "../Icon";
import { ThemeProvider } from "@rnui/headless";

test("Icon renders without crashing", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Icon name="star" />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
