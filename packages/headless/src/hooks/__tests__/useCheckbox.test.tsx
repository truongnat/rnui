import { act, renderHook } from '@testing-library/react-native';
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
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useCheckbox({ checked: true, onChange })
    );
    expect(result.current.isChecked).toBe(true);

    act(() => {
      result.current.toggle();
    });
    // Should stay true because it's controlled
    expect(result.current.isChecked).toBe(true);
    // But it should still call onChange
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('should initialize with defaultChecked: true', () => {
    const { result } = renderHook(() => useCheckbox({ defaultChecked: true }));
    expect(result.current.isChecked).toBe(true);
  });

  it('should call onChange when toggled', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useCheckbox({ defaultChecked: false, onChange })
    );

    act(() => {
      result.current.toggle();
    });

    expect(onChange).toHaveBeenCalledWith(true);
    expect(result.current.isChecked).toBe(true);
  });

  it('should not call onChange or toggle state when disabled is true', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useCheckbox({ defaultChecked: false, disabled: true, onChange })
    );

    act(() => {
      result.current.toggle();
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(result.current.isChecked).toBe(false);
    expect(result.current.isDisabled).toBe(true);
  });

  it('should return correct isIndeterminate state when indeterminate is true', () => {
    const { result } = renderHook(() => useCheckbox({ indeterminate: true }));

    expect(result.current.isIndeterminate).toBe(true);
  });

  it('should return correct accessibility props', () => {
    const { result } = renderHook(() =>
      useCheckbox({ defaultChecked: true, id: 'my-checkbox' })
    );

    expect(result.current.accessibilityProps).toEqual(
      expect.objectContaining({
        accessible: true,
        accessibilityRole: 'checkbox',
        accessibilityState: {
          checked: true,
          disabled: false,
        },
        nativeID: 'my-checkbox',
      })
    );
  });

  it('should return correct accessibility props when indeterminate', () => {
    const { result } = renderHook(() => useCheckbox({ indeterminate: true }));

    expect(result.current.accessibilityProps).toEqual(
      expect.objectContaining({
        accessible: true,
        accessibilityRole: 'checkbox',
        accessibilityState: {
          checked: 'mixed',
          disabled: false,
        },
      })
    );
  });
});
