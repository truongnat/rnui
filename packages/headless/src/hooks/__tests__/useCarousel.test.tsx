import { renderHook } from "@testing-library/react-native";
import { useCarousel } from "../useCarousel";

const ITEM = 375;

describe("useCarousel", () => {
  const data = [1, 2, 3];

  it("should initialize with provided data", () => {
    const { result } = renderHook(() => useCarousel({ data, itemWidth: ITEM }));
    expect(result.current.n).toBe(3);
    expect(result.current.displayData.length).toBe(3);
  });

  it("should handle looping data preparation", () => {
    const { result } = renderHook(() => useCarousel({ data, loop: true, itemWidth: ITEM }));
    // For loop, it adds a clone at both ends: [3, 1, 2, 3, 1]
    expect(result.current.displayData.length).toBe(5);
    expect(result.current.displayData[0]).toBe(3);
    expect(result.current.displayData[4]).toBe(1);
  });

  it("should provide snapToOffsets", () => {
    const { result } = renderHook(() => useCarousel({ data, itemWidth: 300, gap: 10 }));
    // Step is 310. Offsets: [0, 310, 620]
    expect(result.current.snapToOffsets).toEqual([0, 310, 620]);
  });

  it("should handle empty data", () => {
    const { result } = renderHook(() => useCarousel({ data: [], itemWidth: ITEM }));
    expect(result.current.n).toBe(0);
    expect(result.current.displayData.length).toBe(0);
    expect(result.current.snapToOffsets).toEqual([]);
  });

  it("should use single slide when loop with one item", () => {
    const { result } = renderHook(() =>
      useCarousel({ data: [99], loop: true, itemWidth: ITEM })
    );
    expect(result.current.displayData).toEqual([99]);
    expect(result.current.displayData.length).toBe(1);
  });
});
