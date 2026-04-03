import React from "react";
import { render } from "@testing-library/react-native";
import { BottomSheet } from "../BottomSheet";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";

describe("BottomSheet", () => {
  it("renders children when open", () => {
    const { getByText } = render(
      <ThemeProvider>
        <BottomSheet snapPoints={["100%"]} open={true}>
          <Text>Sheet Content</Text>
        </BottomSheet>
      </ThemeProvider>
    );
    expect(getByText("Sheet Content")).toBeTruthy();
  });

  describe("Accessibility", () => {
    it("has accessibilityViewIsModal on sheet container", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <BottomSheet snapPoints={["100%"]} open={true}>
            <Text>Content</Text>
          </BottomSheet>
        </ThemeProvider>
      );
      const container = UNSAFE_root.findByProps({ accessibilityLabel: "Bottom sheet" });
      expect(container.props.accessibilityViewIsModal).toBe(true);
    });

    it("uses default accessibilityLabel values", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <BottomSheet snapPoints={["100%"]} open={true}>
            <Text>Content</Text>
          </BottomSheet>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Bottom sheet" })).toBeTruthy();
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss bottom sheet" })).toBeTruthy();
    });

    it("applies custom accessibilityLabel", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <BottomSheet
            snapPoints={["100%"]}
            open={true}
            accessibilityLabel="Filter options"
            backdropAccessibilityLabel="Close filters"
          >
            <Text>Content</Text>
          </BottomSheet>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Filter options" })).toBeTruthy();
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Close filters" })).toBeTruthy();
    });

    it("backdrop has button role and hint", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <BottomSheet snapPoints={["100%"]} open={true}>
            <Text>Content</Text>
          </BottomSheet>
        </ThemeProvider>
      );
      const backdrop = UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss bottom sheet" });
      expect(backdrop.props.accessibilityRole).toBe("button");
      expect(backdrop.props.accessibilityHint).toBe("Closes the bottom sheet");
    });

    it("drag handle has adjustable role", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <BottomSheet snapPoints={["100%"]} open={true}>
            <Text>Content</Text>
          </BottomSheet>
        </ThemeProvider>
      );
      const handle = UNSAFE_root.findByProps({ accessibilityLabel: "Drag handle" });
      expect(handle.props.accessibilityRole).toBe("adjustable");
    });
  });
});
