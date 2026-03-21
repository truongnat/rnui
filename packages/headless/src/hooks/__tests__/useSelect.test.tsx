import { renderHook, act } from "@testing-library/react-native";
import { useSelect } from "../useSelect";

describe("useSelect", () => {
  const options = [{ label: "One", value: "1" }, { label: "Two", value: "2" }];

  it("should select an option", () => {
    const { result } = renderHook(() => useSelect({ options }));
    
    act(() => {
      result.current.selectOption("1");
    });
    
    expect(result.current.selected).toEqual(["1"]);
    expect(result.current.displayLabel).toBe("One");
  });

  it("should handle multiple selection", () => {
    const { result } = renderHook(() => useSelect({ options, multiple: true }));
    
    act(() => {
      result.current.selectOption("1");
      result.current.selectOption("2");
    });
    
    expect(result.current.selected).toEqual(["1", "2"]);
  });
});
