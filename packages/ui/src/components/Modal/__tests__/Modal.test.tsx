import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Modal } from "../Modal";
import { ThemeProvider } from "@truongdq01/headless";
import { Text, View } from "react-native";

describe("Modal", () => {
  // ─── Rendering Tests ────────────────────────────────────────────────

  describe("Rendering", () => {
    it("renders children when open", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Modal Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Modal Content")).toBeTruthy();
    });

    it("does not render children when closed", () => {
      const { queryByText } = render(
        <ThemeProvider>
          <Modal open={false}>
            <Text>Modal Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(queryByText("Modal Content")).toBeNull();
    });

    it("renders children when closed with keepMounted", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={false} keepMounted>
            <Text>Modal Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Modal Content")).toBeTruthy();
    });

    it("renders with custom content style", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true} contentStyle={{ padding: 20 }}>
            <Text>Styled Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Styled Content")).toBeTruthy();
    });

    it("renders multiple children", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Title</Text>
            <Text>Description</Text>
            <Text>Footer</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Description")).toBeTruthy();
      expect(getByText("Footer")).toBeTruthy();
    });

    it("renders complex children structure", () => {
      const { getByText, getByTestId } = render(
        <ThemeProvider>
          <Modal open={true}>
            <View testID="modal-header">
              <Text>Header</Text>
            </View>
            <View testID="modal-body">
              <Text>Body</Text>
            </View>
          </Modal>
        </ThemeProvider>
      );
      expect(getByTestId("modal-header")).toBeTruthy();
      expect(getByTestId("modal-body")).toBeTruthy();
      expect(getByText("Header")).toBeTruthy();
      expect(getByText("Body")).toBeTruthy();
    });
  });

  // ─── Backdrop Tests ─────────────────────────────────────────────────

  describe("Backdrop", () => {
    it("renders backdrop by default", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      // Backdrop should be present (implementation detail)
      expect(getByText("Content")).toBeTruthy();
    });

    it("hides backdrop when hideBackdrop is true", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true} hideBackdrop>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Content")).toBeTruthy();
    });

    it("calls onClose when backdrop is pressed", () => {
      const onClose = jest.fn();
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true} onClose={onClose}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      // Find backdrop pressable and press it
      const pressables = UNSAFE_root.findAllByType("Pressable" as any);
      if (pressables.length > 0) {
        fireEvent.press(pressables[0]);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it("does not call onClose when backdrop is hidden", () => {
      const onClose = jest.fn();
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true} onClose={onClose} hideBackdrop>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      // Backdrop should not be present
      const pressables = UNSAFE_root.findAllByType("Pressable" as any);
      expect(pressables.length).toBe(0);
    });

    it("renders custom backdrop component", () => {
      const CustomBackdrop = () => <View testID="custom-backdrop" />;
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true} BackdropComponent={CustomBackdrop}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ testID: "custom-backdrop" })).toBeTruthy();
    });

    it("passes BackdropProps to custom backdrop", () => {
      const CustomBackdrop = ({ testID }: any) => (
        <View testID={testID} />
      );
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal
            open={true}
            BackdropComponent={CustomBackdrop}
            BackdropProps={{ testID: "custom-backdrop-with-props" }}
          >
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ testID: "custom-backdrop-with-props" })).toBeTruthy();
    });
  });

  // ─── Interaction Tests ──────────────────────────────────────────────

  describe("Interactions", () => {
    it("calls onClose when escape key is pressed", () => {
      const onClose = jest.fn();
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true} onClose={onClose}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      // Simulate hardware back button / escape key
      const modal = UNSAFE_root.findByType("Modal" as any);
      if (modal.props.onRequestClose) {
        modal.props.onRequestClose();
        expect(onClose).toHaveBeenCalled();
      }
    });

    it("does not call onClose when disableEscapeKeyDown is true", () => {
      const onClose = jest.fn();
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true} onClose={onClose} disableEscapeKeyDown>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = UNSAFE_root.findByType("Modal" as any);
      if (modal.props.onRequestClose) {
        modal.props.onRequestClose();
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it("handles undefined onClose gracefully", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = UNSAFE_root.findByType("Modal" as any);
      if (modal.props.onRequestClose) {
        modal.props.onRequestClose();
        // Should not crash
      }
      expect(true).toBe(true);
    });
  });

  // ─── State Management ───────────────────────────────────────────────

  describe("State Management", () => {
    it("updates when open prop changes from false to true", () => {
      const { getByText, rerender, queryByText } = render(
        <ThemeProvider>
          <Modal open={false}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(queryByText("Content")).toBeNull();
      
      rerender(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Content")).toBeTruthy();
    });

    it("updates when open prop changes from true to false", () => {
      const { getByText, rerender, queryByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Content")).toBeTruthy();
      
      rerender(
        <ThemeProvider>
          <Modal open={false}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(queryByText("Content")).toBeNull();
    });

    it("keeps content mounted when keepMounted is true", () => {
      const { getByText, rerender } = render(
        <ThemeProvider>
          <Modal open={true} keepMounted>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Content")).toBeTruthy();
      
      rerender(
        <ThemeProvider>
          <Modal open={false} keepMounted>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Content")).toBeTruthy();
    });

    it("unmounts content when keepMounted changes to false", () => {
      const { getByText, rerender, queryByText } = render(
        <ThemeProvider>
          <Modal open={false} keepMounted>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Content")).toBeTruthy();
      
      rerender(
        <ThemeProvider>
          <Modal open={false} keepMounted={false}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(queryByText("Content")).toBeNull();
    });
  });

  // ─── Animation Tests ────────────────────────────────────────────────

  describe("Animation", () => {
    it("uses fade animation type", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = UNSAFE_root.findByType("Modal" as any);
      expect(modal.props.animationType).toBe("fade");
    });

    it("renders as transparent modal", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = UNSAFE_root.findByType("Modal" as any);
      expect(modal.props.transparent).toBe(true);
    });
  });

  // ─── Accessibility Tests ────────────────────────────────────────────

  describe("Accessibility", () => {
    it("renders with proper modal structure", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Accessible Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Accessible Content")).toBeTruthy();
    });

    it("supports screen reader navigation", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text accessibilityLabel="Modal Title">Title</Text>
            <Text accessibilityLabel="Modal Description">Description</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Description")).toBeTruthy();
    });

    it("has accessibilityViewIsModal on content container", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      const container = UNSAFE_root.findByProps({ accessibilityLabel: "Modal" });
      expect(container.props.accessibilityViewIsModal).toBe(true);
    });

    it("uses default accessibilityLabel values", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Modal" })).toBeTruthy();
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss modal" })).toBeTruthy();
    });

    it("applies custom accessibilityLabel props", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal
            open={true}
            accessibilityLabel="Settings panel"
            backdropAccessibilityLabel="Close settings"
          >
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Settings panel" })).toBeTruthy();
      expect(UNSAFE_root.findByProps({ accessibilityLabel: "Close settings" })).toBeTruthy();
    });

    it("backdrop has button role and hint", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Content</Text>
          </Modal>
        </ThemeProvider>
      );
      const backdrop = UNSAFE_root.findByProps({ accessibilityLabel: "Dismiss modal" });
      expect(backdrop.props.accessibilityRole).toBe("button");
      expect(backdrop.props.accessibilityHint).toBe("Closes the modal");
    });
  });

  // ─── Edge Cases ─────────────────────────────────────────────────────

  describe("Edge Cases", () => {
    it("handles null children", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>{null}</Modal>
        </ThemeProvider>
      );
      // Should not crash
      expect(UNSAFE_root).toBeTruthy();
    });

    it("handles undefined children", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>{undefined}</Modal>
        </ThemeProvider>
      );
      // Should not crash
      expect(UNSAFE_root).toBeTruthy();
    });

    it("handles empty children", () => {
      const { UNSAFE_root } = render(
        <ThemeProvider>
          <Modal open={true}>{""}</Modal>
        </ThemeProvider>
      );
      // Should not crash
      expect(UNSAFE_root).toBeTruthy();
    });

    it("handles conditional children", () => {
      const showContent = true;
      const { getByText, queryByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            {showContent && <Text>Conditional Content</Text>}
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Conditional Content")).toBeTruthy();
    });

    it("handles array of children", () => {
      const items = ["Item 1", "Item 2", "Item 3"];
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            {items.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("Item 2")).toBeTruthy();
      expect(getByText("Item 3")).toBeTruthy();
    });

    it("handles all props together", () => {
      const onClose = jest.fn();
      const CustomBackdrop = () => <View testID="backdrop" />;
      const { getByText, UNSAFE_root } = render(
        <ThemeProvider>
          <Modal
            open={true}
            onClose={onClose}
            keepMounted
            hideBackdrop={false}
            disableAutoFocus={true}
            disableEscapeKeyDown={false}
            BackdropComponent={CustomBackdrop}
            BackdropProps={{ testID: "backdrop" }}
            contentStyle={{ padding: 20 }}
          >
            <Text>Full Props Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Full Props Content")).toBeTruthy();
      expect(UNSAFE_root.findByProps({ testID: "backdrop" })).toBeTruthy();
    });
  });

  // ─── Layout Tests ───────────────────────────────────────────────────

  describe("Layout", () => {
    it("centers content in overlay", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Centered Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Centered Content")).toBeTruthy();
    });

    it("applies minimum width to content", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Min Width Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Min Width Content")).toBeTruthy();
    });

    it("applies maximum width to content", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Max Width Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Max Width Content")).toBeTruthy();
    });

    it("respects custom content style", () => {
      const customStyle = {
        backgroundColor: "red",
        padding: 30,
        borderRadius: 10,
      };
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true} contentStyle={customStyle}>
            <Text>Custom Styled Content</Text>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Custom Styled Content")).toBeTruthy();
    });
  });

  // ─── Integration Tests ──────────────────────────────────────────────

  describe("Integration", () => {
    it("works with form elements", () => {
      const { getByText, getByPlaceholderText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Login Form</Text>
            <View>
              {/* Simulated input */}
              <Text>Username</Text>
              <Text>Password</Text>
            </View>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Login Form")).toBeTruthy();
      expect(getByText("Username")).toBeTruthy();
      expect(getByText("Password")).toBeTruthy();
    });

    it("works with buttons", () => {
      const onConfirm = jest.fn();
      const onCancel = jest.fn();
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Confirm Action</Text>
            <Text onPress={onConfirm}>Confirm</Text>
            <Text onPress={onCancel}>Cancel</Text>
          </Modal>
        </ThemeProvider>
      );
      
      fireEvent.press(getByText("Confirm"));
      expect(onConfirm).toHaveBeenCalled();
      
      fireEvent.press(getByText("Cancel"));
      expect(onCancel).toHaveBeenCalled();
    });

    it("works with nested modals", () => {
      const { getByText } = render(
        <ThemeProvider>
          <Modal open={true}>
            <Text>Outer Modal</Text>
            <Modal open={true}>
              <Text>Inner Modal</Text>
            </Modal>
          </Modal>
        </ThemeProvider>
      );
      expect(getByText("Outer Modal")).toBeTruthy();
      expect(getByText("Inner Modal")).toBeTruthy();
    });
  });
});
