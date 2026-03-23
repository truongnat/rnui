import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "../Alert";
import { Text } from "react-native";
import { ThemeProvider } from "@truongnat/headless";

test("Alert renders and handles close press", () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Alert onClose={onClose}>
        <Text>Warning</Text>
      </Alert>
    </ThemeProvider>
  );
  expect(getByText("Warning")).toBeTruthy();
});
