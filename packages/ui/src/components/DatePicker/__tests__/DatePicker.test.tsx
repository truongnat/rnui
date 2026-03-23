import React from "react";
import { render } from "@testing-library/react-native";
import { DatePicker } from "../DatePicker";
import { ThemeProvider } from "@truongdq01/headless";

test("DatePicker renders with label", () => {
  const { getByText } = render(
    <ThemeProvider>
      <DatePicker label="Pick Date" date={new Date()} onChange={() => {}} />
    </ThemeProvider>
  );
  expect(getByText("Pick Date")).toBeTruthy();
});
