import { renderHook, act } from "@testing-library/react-native";
import { useSegmentedControl } from "../useSegmentedControl";

describe("useSegmentedControl", () => {
  it("should handle selection", () => {
    const onChange = jest.fn();
    const options = ["One", "Two"];
    const { result } = renderHook(() => useSegmentedControl({ defaultValue: "One", onChange }));
    
    expect(result.current.isSelected("One" as any)).toBe(true);
    
    act(() => {
      result.current.setSelectedIndex(1, options as any);
    });
    expect(onChange).toHaveBeenCalledWith("Two");
  });

  it("should initialize with controlled value", () => {
    const { result } = renderHook(() => useSegmentedControl({ value: "One" }));
    expect(result.current.value).toBe("One");
  });
});
