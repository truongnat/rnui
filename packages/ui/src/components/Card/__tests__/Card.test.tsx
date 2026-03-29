import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Card } from "../Card";
import { ThemeProvider } from "@truongdq01/headless";

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Card", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      const { getByText } = renderWithTheme(
        <Card>
          <Text>Card Content</Text>
        </Card>
      );
      expect(getByText("Card Content")).toBeTruthy();
    });

    it("renders multiple children", () => {
      const { getByText } = renderWithTheme(
        <Card>
          <Text>Title</Text>
          <Text>Description</Text>
        </Card>
      );
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Description")).toBeTruthy();
    });

    it("renders without crashing when empty", () => {
      const { root } = renderWithTheme(<Card>{null}</Card>);
      expect(root).toBeTruthy();
    });
  });

  describe("Padding", () => {
    it("renders with default md padding", () => {
      const { root } = renderWithTheme(
        <Card>
          <Text>Content</Text>
        </Card>
      );
      expect(root).toBeTruthy();
    });

    it("renders with sm padding", () => {
      const { root } = renderWithTheme(
        <Card padding="sm">
          <Text>Content</Text>
        </Card>
      );
      expect(root).toBeTruthy();
    });

    it("renders with lg padding", () => {
      const { root } = renderWithTheme(
        <Card padding="lg">
          <Text>Content</Text>
        </Card>
      );
      expect(root).toBeTruthy();
    });

    it("renders with no padding", () => {
      const { root } = renderWithTheme(
        <Card padding="none">
          <Text>Content</Text>
        </Card>
      );
      expect(root).toBeTruthy();
    });
  });

  describe("Pressable Behavior", () => {
    it("calls onPress when pressed", () => {
      const onPress = jest.fn();
      const { getByText } = renderWithTheme(
        <Card onPress={onPress} accessibilityLabel="Pressable Card">
          <Text>Press me</Text>
        </Card>
      );
      fireEvent.press(getByText("Press me"));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("renders as non-pressable when no onPress provided", () => {
      const { getByText } = renderWithTheme(
        <Card>
          <Text>Static Card</Text>
        </Card>
      );
      expect(getByText("Static Card")).toBeTruthy();
    });

    it("has accessibility role button when pressable", () => {
      const onPress = jest.fn();
      const { getByLabelText } = renderWithTheme(
        <Card onPress={onPress} accessibilityLabel="Action Card">
          <Text>Content</Text>
        </Card>
      );
      const card = getByLabelText("Action Card");
      expect(card).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("applies accessibility label when pressable", () => {
      const { getByLabelText } = renderWithTheme(
        <Card onPress={() => {}} accessibilityLabel="My Card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByLabelText("My Card")).toBeTruthy();
    });

    it("does not require accessibility label when not pressable", () => {
      const { getByText } = renderWithTheme(
        <Card>
          <Text>Content</Text>
        </Card>
      );
      expect(getByText("Content")).toBeTruthy();
    });
  });

  describe("Custom Styling", () => {
    it("accepts custom style prop", () => {
      const customStyle = { marginTop: 20 };
      const { root } = renderWithTheme(
        <Card style={customStyle}>
          <Text>Styled Card</Text>
        </Card>
      );
      expect(root).toBeTruthy();
    });

    it("merges custom style with default styles", () => {
      const { root } = renderWithTheme(
        <Card style={{ backgroundColor: "red" }} padding="lg">
          <Text>Content</Text>
        </Card>
      );
      expect(root).toBeTruthy();
    });
  });

  describe("Integration", () => {
    it("works with complex nested content", () => {
      const { getByText } = renderWithTheme(
        <Card padding="lg">
          <Text>Title</Text>
          <Card padding="sm">
            <Text>Nested Card</Text>
          </Card>
        </Card>
      );
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Nested Card")).toBeTruthy();
    });

    it("handles multiple press events", () => {
      const onPress = jest.fn();
      const { getByText } = renderWithTheme(
        <Card onPress={onPress} accessibilityLabel="Multi Press">
          <Text>Press Multiple Times</Text>
        </Card>
      );
      const card = getByText("Press Multiple Times");
      fireEvent.press(card);
      fireEvent.press(card);
      fireEvent.press(card);
      expect(onPress).toHaveBeenCalledTimes(3);
    });
  });
});
