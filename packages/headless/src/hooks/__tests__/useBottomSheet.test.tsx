import { renderHook } from "@testing-library/react-native";
import { useBottomSheet } from "../useBottomSheet";

// Mock Reanimated and Gesture Handler as they require a complex native environment
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  withSpring: jest.fn(),
  withTiming: jest.fn(),
  interpolate: jest.fn(),
  Extrapolation: { CLAMP: "clamp" },
}));

jest.mock("react-native-gesture-handler", () => ({
  Gesture: {
    Pan: jest.fn(() => ({
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
    })),
    Tap: jest.fn(() => ({
      onEnd: jest.fn().mockReturnThis(),
    })),
  },
}));

jest.mock("react-native-worklets", () => ({
  scheduleOnRN: jest.fn(),
}));

jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
}));

describe("useBottomSheet", () => {
  it("should initialize with correct default snap index", () => {
    const snapPoints = [100, 200, 300];
    const { result } = renderHook(() => useBottomSheet({ snapPoints }));

    // Default snap index should be the last one (highest)
    expect(result.current.currentSnapIndex).toBe(2);
    expect(result.current.isOpen).toBe(false);
  });

  it("should respect initialSnapIndex", () => {
    const snapPoints = [100, 200, 300];
    const { result } = renderHook(() => useBottomSheet({ snapPoints, initialSnapIndex: 1 }));

    expect(result.current.currentSnapIndex).toBe(1);
  });

  it("should return the expected API", () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current).toHaveProperty("open");
    expect(result.current).toHaveProperty("close");
    expect(result.current).toHaveProperty("snapTo");
    expect(result.current).toHaveProperty("sheetAnimatedStyle");
    expect(result.current).toHaveProperty("backdropAnimatedStyle");
    expect(result.current).toHaveProperty("panGesture");
    expect(result.current).toHaveProperty("backdropTapGesture");
  });
});
