import { renderHook, act } from "@testing-library/react-native";
import { useOTPInput } from "../useOTPInput";

describe("useOTPInput", () => {
  it("should handle text change and filter non-numeric", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useOTPInput({ length: 4, value: "", onChange }));
    
    act(() => {
      result.current.handleChange("12a3");
    });
    expect(onChange).toHaveBeenCalledWith("123");
  });

  it("should trigger onComplete when full", () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useOTPInput({ length: 4, value: "123", onChange: jest.fn(), onComplete }));
    
    act(() => {
      result.current.handleChange("1234");
    });
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("should clear the input", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useOTPInput({ length: 4, value: "1234", onChange }));
    
    act(() => {
      // result.current.clear();
    });
    expect(onChange).toHaveBeenCalledWith("");
  });
});
