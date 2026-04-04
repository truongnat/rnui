import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { AnimatedOverlay } from "../AnimatedOverlay";
import { ThemeProvider } from "@truongdq01/headless";

// Note: AccessibilityInfo mock removed since component doesn't use it yet (TODO for reduced motion support)

// Helper to wrap components with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("AnimatedOverlay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when visible", () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay visible={true}>
        <Text>Test Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: "animated-overlay" });
    expect(overlay).toBeTruthy();
  });

  it("accepts animation type prop", () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay visible={true} animationType="scale">
        <Text>Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: "animated-overlay" });
    expect(overlay).toBeTruthy();
  });

  it("accepts duration prop", () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay visible={true} duration={500}>
        <Text>Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: "animated-overlay" });
    expect(overlay).toBeTruthy();
  });

  it("accepts spring config", () => {
    const { UNSAFE_root } = renderWithTheme(
      <AnimatedOverlay
        visible={true}
        useSpring={true}
        springConfig={{ damping: 20 }}
      >
        <Text>Content</Text>
      </AnimatedOverlay>
    );

    const overlay = UNSAFE_root.findByProps({ testID: "animated-overlay" });
    expect(overlay).toBeTruthy();
  });
});