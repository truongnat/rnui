import { act, renderHook } from '@testing-library/react-native';
import { useDebouncedValue } from '../useDebouncedValue';

describe('useDebouncedValue', () => {
  it('returns value immediately when delayMs is 0', () => {
    const { result, rerender } = renderHook(
      ({ v, d }: { v: string; d: number }) => useDebouncedValue(v, d),
      { initialProps: { v: 'a', d: 0 } }
    );
    expect(result.current).toBe('a');
    rerender({ v: 'b', d: 0 });
    expect(result.current).toBe('b');
  });

  it('debounces updates when delayMs > 0', () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ v }: { v: string }) => useDebouncedValue(v, 200),
      { initialProps: { v: 'a' } }
    );
    expect(result.current).toBe('a');

    rerender({ v: 'b' });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('b');
    jest.useRealTimers();
  });
});
