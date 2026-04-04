import { renderHook, act } from '@testing-library/react-native';
import { useAlert } from '../useAlert';

describe('useAlert', () => {
  it('should manage open state', () => {
    const { result } = renderHook(() => useAlert());
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
