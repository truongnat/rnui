import { renderHook } from "@testing-library/react-native";
import { useListItem } from "../useListItem";

// Mock Reanimated
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn((v) => ({ value: v })),
  useAnimatedStyle: jest.fn(),
  withSpring: jest.fn(),
  withTiming: jest.fn(),
  interpolate: jest.fn(),
  Extrapolation: { CLAMP: "clamp" },
}));

// Mock Gesture Handler
jest.mock("react-native-gesture-handler", () => ({
  Gesture: {
    Tap: () => ({ enabled: jest.fn().mockReturnThis(), onEnd: jest.fn().mockReturnThis() }),
    LongPress: () => ({ enabled: jest.fn().mockReturnThis(), minDuration: jest.fn().mockReturnThis(), onStart: jest.fn().mockReturnThis() }),
    Pan: () => ({ activeOffsetX: jest.fn().mockReturnThis(), failOffsetY: jest.fn().mockReturnThis(), onUpdate: jest.fn().mockReturnThis(), onEnd: jest.fn().mockReturnThis() }),
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
