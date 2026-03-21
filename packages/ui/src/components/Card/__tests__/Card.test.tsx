import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Card } from "../Card";
import { Text } from "react-native";
import { ThemeProvider } from "@rnui/headless";

test("Card renders content and handles press", () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Card onPress={onPress} accessibilityLabel="Card">
        <Text>Card Content</Text>
      </Card>
    </ThemeProvider>
  );
  fireEvent.press(getByText("Card Content"));
  expect(onPress).toHaveBeenCalled();
});
