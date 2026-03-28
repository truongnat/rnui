import { renderHook, act } from "@testing-library/react-native";
import { useAutocomplete } from "../useAutocomplete";

describe("useAutocomplete", () => {
  const defaultOptions = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  it("should initialize with default states", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: defaultOptions,
      })
    );

    expect(result.current.inputValue).toBe("");
    expect(result.current.value).toBeUndefined();
    expect(result.current.isOpen).toBe(false);
    expect(result.current.filteredOptions).toEqual(defaultOptions);
  });

  it("should initialize with provided default values", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: defaultOptions,
        defaultInputValue: "Ban",
        defaultValue: "Banana",
        open: true,
      })
    );

    expect(result.current.inputValue).toBe("Ban");
    expect(result.current.value).toBe("Banana");
    expect(result.current.isOpen).toBe(true);
    expect(result.current.filteredOptions).toEqual(["Banana"]);
  });

  it("should update inputValue and filter options when setInputValue is called", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: defaultOptions,
      })
    );

    act(() => {
      result.current.setInputValue("er");
    });

    expect(result.current.inputValue).toBe("er");
    expect(result.current.filteredOptions).toEqual(["Cherry", "Elderberry"]);
  });

  it("should open and close explicitly", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: defaultOptions,
      })
    );

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  describe("Single selection mode", () => {
    it("should select an option and close disclosure", () => {
      const onChangeMock = jest.fn();
      const { result } = renderHook(() =>
        useAutocomplete({
          options: defaultOptions,
          onChange: onChangeMock,
        })
      );

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.selectOption("Cherry");
      });

      expect(result.current.value).toBe("Cherry");
      expect(result.current.inputValue).toBe("Cherry");
      expect(result.current.isOpen).toBe(false);
      expect(result.current.isSelected("Cherry")).toBe(true);
      expect(onChangeMock).toHaveBeenCalledWith("Cherry");
    });

    it("should clear selected value", () => {
      const { result } = renderHook(() =>
        useAutocomplete({
          options: defaultOptions,
          defaultValue: "Cherry",
          defaultInputValue: "Cherry",
        })
      );

      act(() => {
        result.current.clear();
      });

      expect(result.current.value).toBeUndefined();
      expect(result.current.inputValue).toBe("");
      expect(result.current.filteredOptions).toEqual(defaultOptions);
    });
  });

  describe("Multiple selection mode", () => {
    it("should toggle options and keep disclosure state", () => {
      const onChangeMock = jest.fn();
      const { result } = renderHook(() =>
        useAutocomplete({
          options: defaultOptions,
          multiple: true,
          onChange: onChangeMock,
        })
      );

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.selectOption("Apple");
      });

      expect(result.current.value).toEqual(["Apple"]);
      expect(result.current.isOpen).toBe(true); // Should stay open in multiple mode
      expect(result.current.isSelected("Apple")).toBe(true);

      act(() => {
        result.current.selectOption("Cherry");
      });

      expect(result.current.value).toEqual(["Apple", "Cherry"]);

      // Toggle off
      act(() => {
        result.current.selectOption("Apple");
      });

      expect(result.current.value).toEqual(["Cherry"]);
      expect(onChangeMock).toHaveBeenLastCalledWith(["Cherry"]);
    });

    it("should clear all selected values", () => {
      const { result } = renderHook(() =>
        useAutocomplete({
          options: defaultOptions,
          multiple: true,
          defaultValue: ["Apple", "Cherry"],
          defaultInputValue: "Ap",
        })
      );

      expect(result.current.value).toEqual(["Apple", "Cherry"]);

      act(() => {
        result.current.clear();
      });

      expect(result.current.value).toEqual([]);
      expect(result.current.inputValue).toBe("");
    });
  });

  describe("Custom behaviors", () => {
    type User = { id: number; name: string };
    const users: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    it("should use custom getOptionLabel", () => {
      const { result } = renderHook(() =>
        useAutocomplete<User>({
          options: users,
          getOptionLabel: (user) => user.name,
        })
      );

      act(() => {
        result.current.setInputValue("li");
      });

      expect(result.current.filteredOptions).toEqual([
        { id: 1, name: "Alice" },
        { id: 3, name: "Charlie" },
      ]);

      act(() => {
        result.current.selectOption(users[0]);
      });

      expect(result.current.value).toEqual(users[0]);
      expect(result.current.inputValue).toBe("Alice");
    });

    it("should use custom filterOptions", () => {
      const { result } = renderHook(() =>
        useAutocomplete<User>({
          options: users,
          getOptionLabel: (user) => user.name,
          filterOptions: (opts, query) =>
            opts.filter((o) => o.id.toString() === query),
        })
      );

      act(() => {
        result.current.setInputValue("2");
      });

      // Matches based on the custom filter by `id`
      expect(result.current.filteredOptions).toEqual([{ id: 2, name: "Bob" }]);
    });
  });

  describe("Controlled mode", () => {
    it("should use controlled value and inputValue", () => {
      const { result, rerender } = renderHook(
        (props: any) => useAutocomplete(props),
        {
          initialProps: {
            options: defaultOptions,
            value: "Apple",
            inputValue: "Ap",
          },
        }
      );

      expect(result.current.value).toBe("Apple");
      expect(result.current.inputValue).toBe("Ap");

      act(() => {
        result.current.selectOption("Banana");
        result.current.setInputValue("Ban");
      });

      // Should not change because they are controlled
      expect(result.current.value).toBe("Apple");
      expect(result.current.inputValue).toBe("Ap");

      // Rerender with new props
      rerender({
        options: defaultOptions,
        value: "Banana",
        inputValue: "Ban",
      });

      expect(result.current.value).toBe("Banana");
      expect(result.current.inputValue).toBe("Ban");
    });
  });
});
