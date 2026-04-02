import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { OTPInput } from "../OTPInput";
import { ThemeProvider } from "@truongdq01/headless";

test("OTPInput renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <OTPInput length={4} value="12" onChange={() => {}} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});

test("OTPInput accepts full pasted code in one changeText (autofill)", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider>
      <OTPInput length={6} value="" onChange={onChange} />
    </ThemeProvider>
  );
  fireEvent.changeText(getByTestId("rnui-otp-input"), "123456");
  expect(onChange).toHaveBeenCalledWith("123456");
});
