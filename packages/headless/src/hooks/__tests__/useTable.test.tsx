import { act, renderHook } from '@testing-library/react-native';
import { useTable } from '../useTable';

describe('useTable', () => {
  const data = [
    { id: 1, name: 'B' },
    { id: 2, name: 'A' },
  ];

  it('should sort data', () => {
    const { result } = renderHook(() =>
      useTable({ data, initialSort: { key: 'name', direction: 'asc' } })
    );
    expect(result.current.processedData[0].name).toBe('A');

    act(() => {
      result.current.handleSort('name');
    });
    expect(result.current.processedData[0].name).toBe('B');
  });

  it('should manage selection', () => {
    const { result } = renderHook(() => useTable({ data }));
    act(() => {
      result.current.toggleSelect(1);
    });
    expect(result.current.isSelected(1)).toBe(true);
  });
});
