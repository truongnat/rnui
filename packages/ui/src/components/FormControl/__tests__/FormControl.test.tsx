import React from "react";
import { render } from "@testing-library/react-native";
import { FormControl, FormLabel, FormHelperText } from "../FormControl";
import { ThemeProvider } from "@truongdq01/headless";

test("FormControl renders label and helper", () => {
  const { getByText } = render(
    <ThemeProvider>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <FormHelperText>Required field</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
  expect(getByText("Username")).toBeTruthy();
  expect(getByText("Required field")).toBeTruthy();
});
