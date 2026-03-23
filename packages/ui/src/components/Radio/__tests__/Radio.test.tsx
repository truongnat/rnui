import React from "react";
import { render } from "@testing-library/react-native";
import { Radio, RadioGroup } from "../Radio";
import { ThemeProvider } from "@truongdq01/headless";

test("RadioGroup renders options", () => {
  const { getByText } = render(
    <ThemeProvider>
      <RadioGroup value="a">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </ThemeProvider>
  );
  expect(getByText("Option A")).toBeTruthy();
  expect(getByText("Option B")).toBeTruthy();
});
