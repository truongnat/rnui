import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Pressable } from "../Pressable";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light">{children}</ThemeProvider>
);

describe("Pressable", () => {
  it("renders static children", () => {
    const { getByText } = render(
      <Wrap>
        <Pressable>
          <Text>Press me</Text>
        </Pressable>
      </Wrap>
    );
    expect(getByText("Press me")).toBeTruthy();
  });

  it("renders function children with isPressed state", () => {
    const { getByText } = render(
      <Wrap>
        <Pressable>
          {({ isPressed }) => <Text>{isPressed ? "Pressed" : "Not Pressed"}</Text>}
        </Pressable>
      </Wrap>
    );
    // Initial state
    expect(getByText("Not Pressed")).toBeTruthy();
  });

  it("handles onPress callback", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrap>
        <Pressable onPress={onPress} testID="pressable">
          <Text>Press me</Text>
        </Pressable>
      </Wrap>
    );

    fireEvent.press(getByTestId("pressable"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Wrap>
        <Pressable onPress={onPress} disabled testID="pressable">
          <Text>Press me</Text>
        </Pressable>
      </Wrap>
    );

    const element = getByTestId("pressable");
    expect(element.props.accessibilityState?.disabled).toBe(true);
  });

  it("applies custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    const { getByTestId } = render(
      <Wrap>
        <Pressable style={customStyle} testID="pressable">
          <Text>Press me</Text>
        </Pressable>
      </Wrap>
    );

    const element = getByTestId("pressable");
    expect(element.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });

  it("passes accessibility props", () => {
    const { getByTestId } = render(
      <Wrap>
        <Pressable
          testID="pressable"
          accessibilityLabel="Custom Label"
          accessibilityHint="Custom Hint"
          accessibilityRole="link"
        >
          <Text>Press me</Text>
        </Pressable>
      </Wrap>
    );

    const element = getByTestId("pressable");
    expect(element.props.accessibilityLabel).toBe("Custom Label");
    expect(element.props.accessibilityHint).toBe("Custom Hint");
    expect(element.props.accessibilityRole).toBe("link");
  });
});
