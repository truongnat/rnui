import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Drawer } from "../Drawer";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

describe("Drawer", () => {
  it("renders children when open", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Drawer open={true}>
          <Text>Drawer Content</Text>
        </Drawer>
      </ThemeProvider>
    );
    expect(getByText("Drawer Content")).toBeTruthy();
  });

  describe("Accessibility", () => {
    it("has accessibilityViewIsModal on content container", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      const container = UNSAFE_root.findByProps({ accessibilityLabel: "Drawer" });
      expect(container.props.accessibilityViewIsModal).toBe(true);
    });

    it("uses default accessibilityLabel values", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Drawer" })).toBeTruthy();
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss drawer" })).toBeTruthy();
    });

    it("applies custom accessibilityLabel", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Drawer
            open={true}
            accessibilityLabel="Navigation menu"
            backdropAccessibilityLabel="Close navigation"
          >
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Navigation menu" })).toBeTruthy();
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Close navigation" })).toBeTruthy();
    });

    it("backdrop has button role and hint", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Drawer open={true}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      const backdrop = UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss drawer" });
      expect(backdrop.props.accessibilityRole).toBe("button");
      expect(backdrop.props.accessibilityHint).toBe("Closes the drawer");
    });

    it("calls onClose when backdrop is pressed", () => {
      const onClose = jest.fn();
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Drawer open={true} onClose={onClose}>
            <Text>Content</Text>
          </Drawer>
        </ThemeProvider>
      );
      const backdrop = UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss drawer" });
      fireEvent.press(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
