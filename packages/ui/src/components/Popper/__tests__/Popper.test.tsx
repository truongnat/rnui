import React from "react";
import { render } from "@testing-library/react-native";
import { Popper } from "../Popper";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

test("Popper renders content", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Popper open={true}>
        <Text>Popper Content</Text>
      </Popper>
    </ThemeProvider>
  );
  expect(getByText("Popper Content")).toBeTruthy();
});
