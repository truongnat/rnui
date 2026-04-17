import { renderHook, act } from '@testing-library/react-native';
import { useCheckbox } from '../useCheckbox';

describe('useCheckbox', () => {
  it('should toggle state', () => {
    const { result } = renderHook(() => useCheckbox({ defaultChecked: false }));
    expect(result.current.isChecked).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isChecked).toBe(true);
  });

  it('should respect controlled value', () => {
    const { result } = renderHook(() => useCheckbox({ checked: true }));
    expect(result.current.isChecked).toBe(true);

    act(() => {
      result.current.toggle();
    });
    // Should stay true because it's controlled
    expect(result.current.isChecked).toBe(true);
  });
});
