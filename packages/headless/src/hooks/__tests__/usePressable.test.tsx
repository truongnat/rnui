import { renderHook } from "@testing-library/react-native";
import { usePressable } from "../usePressable";

// Mock Reanimated
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn((v) => ({ value: v })),
  useAnimatedStyle: jest.fn((cb) => cb()),
  withSpring: jest.fn(),
  withTiming: jest.fn(),
  runOnJS: jest.fn((fn) => fn),
}));

// Mock worklets
jest.mock("react-native-worklets", () => ({
  scheduleOnRN: jest.fn((fn, ...args) => fn(...args)),
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
    Simultaneous: jest.fn(),
    Race: jest.fn(),
  },
}));

describe("usePressable", () => {
  it("should return accessibility props", () => {
    const { result } = renderHook(() => usePressable({ 
      accessibilityLabel: "Test",
      accessibilityRole: "link"
    }));
    
    expect(result.current.accessibilityProps.accessible).toBe(true);
    expect(result.current.accessibilityProps.accessibilityRole).toBe("link");
    expect(result.current.accessibilityProps.accessibilityLabel).toBe("Test");
    expect(result.current.accessibilityProps.accessibilityState.disabled).toBe(false);
  });

  it("should reflect isPressed state", () => {
    const { result } = renderHook(() => usePressable());
    expect(result.current.isPressed).toBe(false);
  });

  it("should provide animated style", () => {
    const { result } = renderHook(() => usePressable());
    expect(result.current.animatedStyle).toBeDefined();
  });
});
