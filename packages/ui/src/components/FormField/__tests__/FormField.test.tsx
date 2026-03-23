import React from "react";
import { render } from "@testing-library/react-native";
import { FormField } from "../FormField";
import { Input } from "../../Input";
import { ThemeProvider } from "@truongdq01/headless";

test("FormField renders label", () => {
  const { getByText } = render(
    <ThemeProvider>
      <FormField label="Email">
        <Input />
      </FormField>
    </ThemeProvider>
  );
  expect(getByText("Email")).toBeTruthy();
});
