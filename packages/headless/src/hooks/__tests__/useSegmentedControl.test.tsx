import { act, renderHook } from '@testing-library/react-native';
import { useSegmentedControl } from '../useSegmentedControl';

describe('useSegmentedControl', () => {
  it('should handle selection', () => {
    const onChange = jest.fn();
    const options = ['One', 'Two'];
    const { result } = renderHook(() =>
      useSegmentedControl<string>({ defaultValue: 'One', onChange })
    );

    expect(result.current.isSelected('One')).toBe(true);

    act(() => {
      result.current.setSelectedIndex(1, options);
    });
    expect(onChange).toHaveBeenCalledWith('Two');
  });

  it('should initialize with controlled value', () => {
    const { result } = renderHook(() => useSegmentedControl({ value: 'One' }));
    expect(result.current.value).toBe('One');
  });
});
