import { renderHook, act } from "@testing-library/react-native";
import { useField } from "../useField";

describe("useField", () => {
  it("should handle value changes and validation", async () => {
    const validate = jest.fn((v) => (v.length < 3 ? "Too short" : undefined));
    const { result } = renderHook(() => useField({ defaultValue: "", validate }));

    act(() => {
      result.current.onChange("hi");
    });
    expect(result.current.value).toBe("hi");
    
    await act(async () => {
      await result.current.onBlur();
    });
    expect(result.current.error).toBe("Too short");
    expect(result.current.touched).toBe(true);
  });

  it("should clear error when value becomes valid", async () => {
    const validate = jest.fn((v) => (v.length < 3 ? "Too short" : undefined));
    const { result } = renderHook(() => useField({ defaultValue: "hi", validate }));

    await act(async () => {
      await result.current.onBlur();
    });
    expect(result.current.error).toBe("Too short");

    act(() => {
      result.current.onChange("hello");
    });
    expect(result.current.error).toBeUndefined();
  });
});
