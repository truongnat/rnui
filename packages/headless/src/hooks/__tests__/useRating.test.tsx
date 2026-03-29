import { renderHook, act } from "@testing-library/react-native";
import { useRating } from "../useRating";

describe("useRating", () => {
  it("should return default values", () => {
    const { result } = renderHook(() => useRating());
    expect(result.current.value).toBe(0);
    expect(result.current.max).toBe(5);
    expect(result.current.precision).toBe(1);
    expect(result.current.disabled).toBe(false);
    expect(result.current.readOnly).toBe(false);
  });

  it("should initialize with defaultValue in uncontrolled mode", () => {
    const { result } = renderHook(() => useRating({ defaultValue: 3 }));
    expect(result.current.value).toBe(3);
  });

  it("should update value and call onChange in uncontrolled mode", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useRating({ defaultValue: 1, onChange }));

    act(() => {
      result.current.setValue(4);
    });

    expect(result.current.value).toBe(4);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("should respect controlled value", () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook((props: any = { value: 2, onChange }) => useRating(props));

    expect(result.current.value).toBe(2);

    act(() => {
      result.current.setValue(5);
    });

    // Internal state doesn't change the returned value in controlled mode
    expect(result.current.value).toBe(2);
    expect(onChange).toHaveBeenCalledWith(5);

    // Rerender with new value to simulate parent component updating
    rerender({ value: 5, onChange });
    expect(result.current.value).toBe(5);
  });

  it("should not update value or call onChange when disabled", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useRating({ defaultValue: 2, disabled: true, onChange }));

    act(() => {
      result.current.setValue(4);
    });

    expect(result.current.value).toBe(2);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should not update value or call onChange when readOnly", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useRating({ defaultValue: 3, readOnly: true, onChange }));

    act(() => {
      result.current.setValue(5);
    });

    expect(result.current.value).toBe(3);
    expect(onChange).not.toHaveBeenCalled();
  });
});
