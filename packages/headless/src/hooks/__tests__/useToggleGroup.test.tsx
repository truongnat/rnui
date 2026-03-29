import { renderHook, act } from "@testing-library/react-native";
import { useToggleGroup } from "../useToggleGroup";

describe("useToggleGroup", () => {
  describe("uncontrolled mode", () => {
    it("should initialize with empty array if no defaultValue", () => {
      const { result } = renderHook(() => useToggleGroup());
      expect(result.current.value).toBeUndefined();
    });

    it("should initialize with defaultValue", () => {
      const { result } = renderHook(() => useToggleGroup({ defaultValue: ["a"] }));
      expect(result.current.value).toEqual(["a"]);
    });

    it("should correctly toggle values in non-exclusive mode", () => {
      const { result } = renderHook(() => useToggleGroup());

      act(() => {
        result.current.toggle("a");
      });
      expect(result.current.value).toEqual(["a"]);

      act(() => {
        result.current.toggle("b");
      });
      expect(result.current.value).toEqual(["a", "b"]);

      act(() => {
        result.current.toggle("a");
      });
      expect(result.current.value).toEqual(["b"]);
    });

    it("should correctly toggle values in exclusive mode", () => {
      const { result } = renderHook(() => useToggleGroup({ exclusive: true }));

      act(() => {
        result.current.toggle("a");
      });
      expect(result.current.value).toBe("a");

      act(() => {
        result.current.toggle("b");
      });
      expect(result.current.value).toBe("b");

      act(() => {
        result.current.toggle("b");
      });
      expect(result.current.value).toBeUndefined();
    });
  });

  describe("controlled mode", () => {
    it("should respect controlled value", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useToggleGroup({ value }),
        { initialProps: { value: ["a"] } }
      );

      expect(result.current.value).toEqual(["a"]);

      act(() => {
        result.current.toggle("b");
      });
      // Should stay ["a"] because it's controlled
      expect(result.current.value).toEqual(["a"]);

      // Manually update prop
      rerender({ value: ["a", "b"] });
      expect(result.current.value).toEqual(["a", "b"]);
    });

    it("should respect controlled value in exclusive mode", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useToggleGroup({ value, exclusive: true }),
        { initialProps: { value: "a" } }
      );

      expect(result.current.value).toBe("a");

      act(() => {
        result.current.toggle("b");
      });
      // Should stay "a" because it's controlled
      expect(result.current.value).toBe("a");

      // Manually update prop
      rerender({ value: "b" });
      expect(result.current.value).toBe("b");
    });
  });

  describe("isSelected", () => {
    it("should return true if value is in array", () => {
      const { result } = renderHook(() => useToggleGroup({ value: ["a", "b"] }));
      expect(result.current.isSelected("a")).toBe(true);
      expect(result.current.isSelected("b")).toBe(true);
      expect(result.current.isSelected("c")).toBe(false);
    });

    it("should return true if value matches exactly (exclusive mode)", () => {
      const { result } = renderHook(() => useToggleGroup({ value: "a", exclusive: true }));
      expect(result.current.isSelected("a")).toBe(true);
      expect(result.current.isSelected("b")).toBe(false);
    });

    it("should return false if value is undefined", () => {
      const { result } = renderHook(() => useToggleGroup<string>({ value: undefined }));
      expect(result.current.isSelected("a")).toBe(false);
    });
  });

  describe("callbacks and options", () => {
    it("should call onChange when toggled", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useToggleGroup({ onChange }));

      act(() => {
        result.current.toggle("a");
      });
      expect(onChange).toHaveBeenCalledWith(["a"]);
    });

    it("should not toggle or call onChange if disabled", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useToggleGroup<string>({ onChange, disabled: true }));

      act(() => {
        result.current.toggle("a");
      });
      expect(result.current.value).toBeUndefined();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
