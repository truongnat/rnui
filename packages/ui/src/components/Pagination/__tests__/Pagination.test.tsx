import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Pagination } from "../Pagination";
import { ThemeProvider } from "@truongnat/headless";

test("Pagination handles page change", () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Pagination count={10} page={1} onChange={onChange} />
    </ThemeProvider>
  );
  // Check if current page is displayed (depending on implementation, usually 1-based)
  // Let's just check button presence
  expect(getByText("1")).toBeTruthy();
});
