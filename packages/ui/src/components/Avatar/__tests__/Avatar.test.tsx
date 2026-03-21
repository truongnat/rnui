import React from "react";
import { render } from "@testing-library/react-native";
import { Avatar } from "../Avatar";
import { ThemeProvider } from "@rnui/headless";

test("Avatar renders fallback initials", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Avatar label="John Doe" />
    </ThemeProvider>
  );
  expect(getByText("JD")).toBeTruthy();
});
