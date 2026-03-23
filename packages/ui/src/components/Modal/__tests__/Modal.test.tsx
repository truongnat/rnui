import React from "react";
import { render } from "@testing-library/react-native";
import { Modal } from "../Modal";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

test("Modal renders children when open", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Modal open={true}>
        <Text>Modal Content</Text>
      </Modal>
    </ThemeProvider>
  );
  expect(getByText("Modal Content")).toBeTruthy();
});
