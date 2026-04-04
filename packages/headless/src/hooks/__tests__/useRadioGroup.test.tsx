import { renderHook, act } from '@testing-library/react-native';
import { useRadioGroup } from '../useRadioGroup';

describe('useRadioGroup', () => {
  it('should select value', () => {
    const { result } = renderHook(() => useRadioGroup({ defaultValue: 'a' }));
    expect(result.current.selectedValue).toBe('a');

    act(() => {
      result.current.select('b');
    });
    expect(result.current.selectedValue).toBe('b');
    expect(result.current.isSelected('b')).toBe(true);
  });

  it('should respect controlled value', () => {
    const { result } = renderHook(() => useRadioGroup({ value: 'a' }));
    expect(result.current.selectedValue).toBe('a');

    act(() => {
      result.current.select('b');
    });
    // Should stay "a" because it's controlled
    expect(result.current.selectedValue).toBe('a');
  });
});
