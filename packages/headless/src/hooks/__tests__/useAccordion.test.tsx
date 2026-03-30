import { renderHook, act } from "@testing-library/react-native";
import { useAccordion } from "../useAccordion";

describe("useAccordion", () => {
  it("should initialize with defaultExpanded", () => {
    const { result } = renderHook(() => useAccordion({ defaultExpanded: ["item1"] }));
    expect(result.current.isExpanded("item1")).toBe(true);
    expect(result.current.isExpanded("item2")).toBe(false);
  });

  it("should toggle expanded state", () => {
    const { result } = renderHook(() => useAccordion());
    
    act(() => {
      result.current.toggle("item1");
    });
    expect(result.current.isExpanded("item1")).toBe(true);
    
    act(() => {
      result.current.toggle("item1");
    });
    expect(result.current.isExpanded("item1")).toBe(false);
  });

  it("should handle multiple expanded items when multiple is true", () => {
    const { result } = renderHook(() => useAccordion({ multiple: true }));
    
    act(() => {
      result.current.expand("item1");
    });
    act(() => {
      result.current.expand("item2");
    });
    expect(result.current.isExpanded("item1")).toBe(true);
    expect(result.current.isExpanded("item2")).toBe(true);
  });

  it("should only allow one expanded item when multiple is false", () => {
    const { result } = renderHook(() => useAccordion({ multiple: false }));
    
    act(() => {
      result.current.expand("item1");
    });
    expect(result.current.isExpanded("item1")).toBe(true);
    
    act(() => {
      result.current.expand("item2");
    });
    expect(result.current.isExpanded("item1")).toBe(false);
    expect(result.current.isExpanded("item2")).toBe(true);
  });

  it("should collapse all", () => {
    const { result } = renderHook(() => useAccordion({ defaultExpanded: ["item1", "item2"], multiple: true }));
    
    act(() => {
      result.current.collapseAll();
    });
    expect(result.current.expanded).toEqual([]);
  });
});
