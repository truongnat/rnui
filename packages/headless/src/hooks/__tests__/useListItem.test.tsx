import { renderHook } from "@testing-library/react-native";
import { useListItem } from "../useListItem";

// Mock Reanimated
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn((v) => ({ value: v })),
  useAnimatedStyle: jest.fn((cb) => cb()),
  withSpring: jest.fn(),
  withTiming: jest.fn(),
  interpolate: jest.fn(),
  Extrapolation: { CLAMP: "clamp" },
}));

// Mock Gesture Handler
jest.mock("react-native-gesture-handler", () => ({
  Gesture: {
    Tap: () => {
      const chain = {
        enabled: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
        onStart: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        onTouchesMove: jest.fn().mockReturnThis(),
        onTouchesDown: jest.fn().mockReturnThis(),
        onTouchesUp: jest.fn().mockReturnThis(),
        onTouchesCancelled: jest.fn().mockReturnThis(),
        activeOffsetX: jest.fn().mockReturnThis(),
        activeOffsetY: jest.fn().mockReturnThis(),
        failOffsetX: jest.fn().mockReturnThis(),
        failOffsetY: jest.fn().mockReturnThis(),
        minDuration: jest.fn().mockReturnThis(),
        hitSlop: jest.fn().mockReturnThis(),
        direction: jest.fn().mockReturnThis(),
        numberOfTaps: jest.fn().mockReturnThis(),
        maxDuration: jest.fn().mockReturnThis(),
        minPointers: jest.fn().mockReturnThis(),
        maxPointers: jest.fn().mockReturnThis(),
        minDistance: jest.fn().mockReturnThis(),
        shouldCancelWhenOutside: jest.fn().mockReturnThis(),
        withTestId: jest.fn().mockReturnThis(),
      };
      return chain;
    },
    LongPress: () => {
      const chain = {
        enabled: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
        onStart: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        onTouchesMove: jest.fn().mockReturnThis(),
        onTouchesDown: jest.fn().mockReturnThis(),
        onTouchesUp: jest.fn().mockReturnThis(),
        onTouchesCancelled: jest.fn().mockReturnThis(),
        activeOffsetX: jest.fn().mockReturnThis(),
        activeOffsetY: jest.fn().mockReturnThis(),
        failOffsetX: jest.fn().mockReturnThis(),
        failOffsetY: jest.fn().mockReturnThis(),
        minDuration: jest.fn().mockReturnThis(),
        hitSlop: jest.fn().mockReturnThis(),
        direction: jest.fn().mockReturnThis(),
        numberOfTaps: jest.fn().mockReturnThis(),
        maxDuration: jest.fn().mockReturnThis(),
        minPointers: jest.fn().mockReturnThis(),
        maxPointers: jest.fn().mockReturnThis(),
        minDistance: jest.fn().mockReturnThis(),
        shouldCancelWhenOutside: jest.fn().mockReturnThis(),
        withTestId: jest.fn().mockReturnThis(),
      };
      return chain;
    },
    Pan: () => {
      const chain = {
        enabled: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
        onStart: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        onTouchesMove: jest.fn().mockReturnThis(),
        onTouchesDown: jest.fn().mockReturnThis(),
        onTouchesUp: jest.fn().mockReturnThis(),
        onTouchesCancelled: jest.fn().mockReturnThis(),
        activeOffsetX: jest.fn().mockReturnThis(),
        activeOffsetY: jest.fn().mockReturnThis(),
        failOffsetX: jest.fn().mockReturnThis(),
        failOffsetY: jest.fn().mockReturnThis(),
        minDuration: jest.fn().mockReturnThis(),
        hitSlop: jest.fn().mockReturnThis(),
        direction: jest.fn().mockReturnThis(),
        numberOfTaps: jest.fn().mockReturnThis(),
        maxDuration: jest.fn().mockReturnThis(),
        minPointers: jest.fn().mockReturnThis(),
        maxPointers: jest.fn().mockReturnThis(),
        minDistance: jest.fn().mockReturnThis(),
        shouldCancelWhenOutside: jest.fn().mockReturnThis(),
        withTestId: jest.fn().mockReturnThis(),
      };
      return chain;
    },
    Simultaneous: jest.fn(),
    Race: jest.fn(),
  },
}));

describe("useListItem", () => {
  it("should return accessibility props", () => {
    const { result } = renderHook(() => useListItem({ disabled: false }));
    expect(result.current.accessibilityProps.accessible).toBe(true);
    expect(result.current.accessibilityProps.accessibilityRole).toBe("button");
    expect(result.current.accessibilityProps.accessibilityState.disabled).toBe(false);
  });

  it("should respect disabled state in accessibility props", () => {
    const { result } = renderHook(() => useListItem({ disabled: true }));
    expect(result.current.accessibilityProps.accessibilityState.disabled).toBe(true);
  });

  it("should provide animated styles", () => {
    const { result } = renderHook(() => useListItem());
    expect(result.current.itemAnimatedStyle).toBeDefined();
    expect(result.current.trailingActionsStyle).toBeDefined();
    expect(result.current.leadingActionsStyle).toBeDefined();
  });
});
