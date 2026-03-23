import React from "react";
import { render } from "@testing-library/react-native";
import { Link } from "../Link";
import { ThemeProvider } from "@truongnat/headless";

test("Link renders and shows text", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Link href="https://example.com">Click Me</Link>
    </ThemeProvider>
  );
  expect(getByText("Click Me")).toBeTruthy();
});
