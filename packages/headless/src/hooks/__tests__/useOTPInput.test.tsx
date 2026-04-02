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

  it("accepts full pasted or autofill string in one event (length 6)", () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    const { result } = renderHook(() =>
      useOTPInput({ length: 6, value: "", onChange, onComplete })
    );
    act(() => {
      result.current.handleChange("123456");
    });
    expect(onChange).toHaveBeenCalledWith("123456");
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("truncates pasted string to length", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useOTPInput({ length: 4, value: "", onChange }));
    act(() => {
      result.current.handleChange("123456");
    });
    expect(onChange).toHaveBeenCalledWith("1234");
  });

  it("should expose otp props and focus handlers", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useOTPInput({ length: 4, value: "1234", onChange }));
    
    act(() => {
      result.current.onFocus();
    });

    expect(result.current.isFocused).toBe(true);

    act(() => {
      result.current.onBlur();
    });

    expect(result.current.isFocused).toBe(false);

    const props = result.current.getOtpProps();
    expect(props.keyboardType).toBe("number-pad");
    expect(props.textContentType).toBe("oneTimeCode");
    expect(props.autoComplete).toBe("one-time-code");
    expect(props.maxLength).toBe(4);
    expect(props.editable).toBe(true);
  });
});
