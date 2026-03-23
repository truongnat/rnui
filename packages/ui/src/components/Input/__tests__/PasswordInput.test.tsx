import React from "react";
import { render } from "@testing-library/react-native";
import { PasswordInput } from "../../Input/PasswordInput";
import { ThemeProvider } from "@truongdq01/headless";

test("PasswordInput renders", () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <PasswordInput placeholder="Password" />
    </ThemeProvider>
  );
  expect(getByPlaceholderText("Password")).toBeTruthy();
});
