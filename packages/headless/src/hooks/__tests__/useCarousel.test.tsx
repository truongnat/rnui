import { renderHook } from "@testing-library/react-native";
import { useCarousel } from "../useCarousel";

describe("useCarousel", () => {
  const data = [1, 2, 3];
  
  it("should initialize with provided data", () => {
    const { result } = renderHook(() => useCarousel({ data }));
    expect(result.current.n).toBe(3);
    expect(result.current.displayData.length).toBe(3);
  });

  it("should handle looping data preparation", () => {
    const { result } = renderHook(() => useCarousel({ data, loop: true }));
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
});
