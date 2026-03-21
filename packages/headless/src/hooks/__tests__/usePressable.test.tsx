import { renderHook } from "@testing-library/react-native";
import { usePressable } from "../usePressable";

// Mock Reanimated
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn((v) => ({ value: v })),
  useAnimatedStyle: jest.fn(),
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
    Tap: () => ({ 
      enabled: jest.fn().mockReturnThis(), 
      hitSlop: jest.fn().mockReturnThis(),
      onBegin: jest.fn().mockReturnThis(),
      onFinalize: jest.fn().mockReturnThis() 
    }),
    LongPress: () => ({ 
      enabled: jest.fn().mockReturnThis(), 
      minDuration: jest.fn().mockReturnThis(), 
      onStart: jest.fn().mockReturnThis() 
    }),
    Simultaneous: jest.fn(),
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
