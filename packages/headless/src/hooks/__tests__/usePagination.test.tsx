import { renderHook, act } from "@testing-library/react-native";
import { usePagination } from "../usePagination";

// Mock React Native to prevent errors in test runner if it's the issue
jest.mock("react-native", () => ({
  Platform: { OS: "ios" },
}));

describe("usePagination", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));

    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([
      1, 2, 3, 4, 5, "end-ellipsis", 10
    ]);
  });

  it("should initialize with custom defaultPage", () => {
    const { result } = renderHook(() => usePagination({ count: 10, defaultPage: 5 }));

    expect(result.current.page).toBe(5);
    expect(result.current.items).toEqual([
      1, "start-ellipsis", 4, 5, 6, "end-ellipsis", 10
    ]);
  });

  it("should act as a controlled component when page is provided", () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      (props: any) => usePagination(props),
      { initialProps: { count: 10, page: 5, onChange } }
    );

    expect(result.current.page).toBe(5);

    act(() => {
      result.current.setPage(6);
    });

    // Internal state should not update since it's controlled
    expect(result.current.page).toBe(5);
    expect(onChange).toHaveBeenCalledWith(6);

    // Rerender with new prop
    rerender({ count: 10, page: 6, onChange });
    expect(result.current.page).toBe(6);
  });

  it("should update page via setPage in uncontrolled mode", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ count: 10, onChange }));

    expect(result.current.page).toBe(1);

    act(() => {
      result.current.setPage(5);
    });

    expect(result.current.page).toBe(5);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("should clamp page values within 1 and count", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ count: 10, onChange }));

    // Should not go below 1
    act(() => {
      result.current.setPage(0);
    });
    expect(result.current.page).toBe(1);
    expect(onChange).toHaveBeenCalledWith(1);

    // Should not go above count
    act(() => {
      result.current.setPage(15);
    });
    expect(result.current.page).toBe(10);
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("should generate correct items for small count (no ellipses)", () => {
    const { result } = renderHook(() => usePagination({ count: 5 }));

    expect(result.current.items).toEqual([1, 2, 3, 4, 5]);
  });

  it("should generate correct items with ellipses at the end only", () => {
    const { result } = renderHook(() => usePagination({ count: 10, defaultPage: 1 }));

    expect(result.current.items).toEqual([
      1, 2, 3, 4, 5, "end-ellipsis", 10
    ]);
  });

  it("should generate correct items with ellipses at the start only", () => {
    const { result } = renderHook(() => usePagination({ count: 10, defaultPage: 10 }));

    expect(result.current.items).toEqual([
      1, "start-ellipsis", 6, 7, 8, 9, 10
    ]);
  });

  it("should generate correct items with custom siblingCount and boundaryCount", () => {
    const { result } = renderHook(() => usePagination({
      count: 20,
      defaultPage: 10,
      siblingCount: 2,
      boundaryCount: 2
    }));

    expect(result.current.items).toEqual([
      1, 2, "start-ellipsis", 8, 9, 10, 11, 12, "end-ellipsis", 19, 20
    ]);
  });

  it("should handle boundary conditions when ellipses overlap with numbers", () => {
     // Boundary test 1: end-ellipsis becomes number
     let render = renderHook(() => usePagination({ count: 7, defaultPage: 1 }));
     expect(render.result.current.items).toEqual([
       1, 2, 3, 4, 5, 6, 7
     ]);

     // Boundary test 2: start-ellipsis becomes number
     render = renderHook(() => usePagination({ count: 7, defaultPage: 7 }));
     expect(render.result.current.items).toEqual([
       1, 2, 3, 4, 5, 6, 7
     ]);
  });

  it("should handle count <= 0", () => {
    const { result } = renderHook(() => usePagination({ count: 0 }));

    expect(result.current.items).toEqual([]);
    expect(result.current.page).toBe(1); // Defaults to 1 even if count is 0
  });
});
