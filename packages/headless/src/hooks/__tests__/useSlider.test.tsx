import { renderHook, act } from "@testing-library/react-native";
import { useSlider } from "../useSlider";

describe("useSlider", () => {
  it("should manage current value", () => {
    const { result } = renderHook(() => useSlider({ min: 0, max: 100, defaultValue: 50 }));
    expect(result.current.currentValue).toBe(50);
  });
});
