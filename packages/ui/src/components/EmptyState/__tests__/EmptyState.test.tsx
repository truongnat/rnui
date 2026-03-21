import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyState } from "../EmptyState";
import { ThemeProvider } from "@rnui/headless";

test("EmptyState renders title and description", () => {
  const { getByText } = render(
    <ThemeProvider>
      <EmptyState title="No Data" description="Check back later" />
    </ThemeProvider>
  );
  expect(getByText("No Data")).toBeTruthy();
  expect(getByText("Check back later")).toBeTruthy();
});
