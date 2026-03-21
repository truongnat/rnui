import React from "react";
import { render } from "@testing-library/react-native";
import { SegmentedControl } from "../SegmentedControl";
import { ThemeProvider } from "@rnui/headless";

test("SegmentedControl renders options", () => {
  const { getByText } = render(
    <ThemeProvider>
      <SegmentedControl options={["Daily", "Weekly"]} selectedIndex={0} onChange={() => {}} />
    </ThemeProvider>
  );
  expect(getByText("Daily")).toBeTruthy();
  expect(getByText("Weekly")).toBeTruthy();
});
