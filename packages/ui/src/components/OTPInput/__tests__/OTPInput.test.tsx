import React from "react";
import { render } from "@testing-library/react-native";
import { OTPInput } from "../OTPInput";
import { ThemeProvider } from "@truongnat/headless";

test("OTPInput renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <OTPInput length={4} value="12" onChange={() => {}} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
