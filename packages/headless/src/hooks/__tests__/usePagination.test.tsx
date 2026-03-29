import { renderHook, act } from "@testing-library/react-native";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("should have default page 1 and correct items for count 1", () => {
    const { result } = renderHook(() => usePagination({ count: 1 }));
    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([1]);
  });

  it("should return correct items for count 10", () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));
    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 10]);
  });

  it("should allow changing page", () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));

    act(() => {
      result.current.setPage(5);
    });

    expect(result.current.page).toBe(5);
    expect(result.current.items).toEqual([1, "start-ellipsis", 4, 5, 6, "end-ellipsis", 10]);
  });

  it("should clamp page bounds when setting page", () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));

    act(() => {
      result.current.setPage(15);
    });
    expect(result.current.page).toBe(10);

    act(() => {
      result.current.setPage(-5);
    });
    expect(result.current.page).toBe(1);
  });
});
