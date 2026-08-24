import { act, renderHook } from '@testing-library/react-native';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  it('should have default page 1 and correct items for count 1', () => {
    const { result } = renderHook(() => usePagination({ count: 1 }));
    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([1]);
  });

  it('should return correct items for count 10', () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));
    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([1, 2, 3, 4, 5, 'end-ellipsis', 10]);
  });

  it('should allow changing page', () => {
    const { result } = renderHook(() => usePagination({ count: 10 }));

    act(() => {
      result.current.setPage(5);
    });

    expect(result.current.page).toBe(5);
    expect(result.current.items).toEqual([
      1,
      'start-ellipsis',
      4,
      5,
      6,
      'end-ellipsis',
      10,
    ]);
  });

  it('should clamp page bounds when setting page', () => {
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

  it('should respect custom defaultPage', () => {
    const { result } = renderHook(() => usePagination({ count: 10, defaultPage: 5 }));
    expect(result.current.page).toBe(5);
    expect(result.current.items).toEqual([1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]);
  });

  it('should operate in controlled mode', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      (props) => usePagination(props),
      { initialProps: { count: 10, page: 5, onChange } }
    );

    expect(result.current.page).toBe(5);

    act(() => {
      result.current.setPage(6);
    });

    // Page shouldn't change internally when controlled
    expect(result.current.page).toBe(5);
    expect(onChange).toHaveBeenCalledWith(6);

    // Re-render with new page
    rerender({ count: 10, page: 6, onChange });
    expect(result.current.page).toBe(6);
  });

  it('should call onChange in uncontrolled mode', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ count: 10, onChange }));

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should handle custom siblingCount', () => {
    const { result } = renderHook(() => usePagination({ count: 10, defaultPage: 5, siblingCount: 2 }));
    // Sibling count 2 means 2 siblings on each side.
    // If we are on page 5, siblings are 3,4, 5, 6,7
    // startPages are [1]. endPages are [10].
    // siblingsStart = max(min(5-2, 10-1-4-1), 1+2) = max(min(3, 4), 3) = 3
    // siblingsEnd = min(max(5+2, 1+4+2), 10-2) = min(max(7, 7), 8) = 7
    // siblingsStart (3) is not > boundaryCount+2 (3), so it pushes boundaryCount+1 (2) instead of start-ellipsis
    expect(result.current.items).toEqual([1, 2, 3, 4, 5, 6, 7, 'end-ellipsis', 10]);

    const { result: result0 } = renderHook(() => usePagination({ count: 10, defaultPage: 5, siblingCount: 0 }));
    // Sibling count 0 means no siblings: 5
    // startPages=[1], endPages=[10]
    // siblingsStart = max(min(5-0, 10-1-0-1), 1+2) = max(min(5, 8), 3) = 5
    // siblingsEnd = min(max(5+0, 1+0+2), 8) = min(max(5, 3), 8) = 5
    // start-ellipsis since siblingsStart (5) > boundaryCount+2 (3)
    // end-ellipsis since siblingsEnd (5) < count-boundaryCount-1 (10-1-1 = 8)
    expect(result0.current.items).toEqual([1, 'start-ellipsis', 5, 'end-ellipsis', 10]);
  });

  it('should handle custom boundaryCount', () => {
    const { result } = renderHook(() => usePagination({ count: 10, defaultPage: 5, boundaryCount: 2 }));
    // Boundary count 2 means 1,2 at start, 9,10 at end
    // page = 5, siblingCount = 1
    // startPages = [1, 2], endPages = [9, 10]
    // siblingsStart = max(min(5-1, 10-2-2-1), 2+2) = max(min(4, 5), 4) = 4
    // siblingsEnd = min(max(5+1, 2+2+2), 9-2) = min(max(6, 6), 7) = 6
    // start-ellipsis NOT added because siblingsStart (4) is NOT > boundaryCount + 2 (4).
    // Instead it adds boundaryCount + 1 (3).
    expect(result.current.items).toEqual([1, 2, 3, 4, 5, 6, 'end-ellipsis', 9, 10]);
  });

  it('should return empty items when count is <= 0', () => {
    const { result } = renderHook(() => usePagination({ count: 0 }));
    expect(result.current.items).toEqual([]);

    const { result: resultNeg } = renderHook(() => usePagination({ count: -5 }));
    expect(resultNeg.current.items).toEqual([]);
  });
});
