import { renderHook, act } from "@testing-library/react-native";
import { useSegmentedControl } from "../useSegmentedControl";

describe("useSegmentedControl", () => {
  it("should handle selection", () => {
    const onChange = jest.fn();
    const options = ["One", "Two"];
    const { result } = renderHook(() => useSegmentedControl({ defaultValue: 0, onChange }));
    
    expect(result.current.isSelected(0 as any)).toBe(true);
    
    act(() => {
      result.current.setSelectedIndex(1, options as any);
    });
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("should initialize with controlled value", () => {
    const { result } = renderHook(() => useSegmentedControl({ value: 1 }));
    expect(result.current.value).toBe(1);
  });
});
