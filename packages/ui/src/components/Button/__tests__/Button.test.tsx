import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";
import { ThemeProvider } from "@truongnat/headless";

test("Button renders and handles press", () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Button label="Click" onPress={onPress} />
    </ThemeProvider>
  );
  fireEvent.press(getByText("Click"));
  expect(onPress).toHaveBeenCalled();
});
