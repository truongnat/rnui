import { renderHook } from '@testing-library/react-native';
import { useSlider } from '../useSlider';

describe('useSlider', () => {
  it('should manage current value (single)', () => {
    const { result } = renderHook(() =>
      useSlider({ min: 0, max: 100, defaultValue: 50 })
    );
    expect(result.current.mode).toBe('single');
    expect(result.current.currentValue).toBe(50);
  });

  it('range mode exposes sorted tuple defaultValue', () => {
    const { result } = renderHook(() =>
      useSlider({
        range: true,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: [20, 80],
      })
    );
    expect(result.current.mode).toBe('range');
    const r = result.current;
    if (r.mode !== 'range') throw new Error('expected range');
    const [lo, hi] = r.currentValue;
    expect(lo).toBe(20);
    expect(hi).toBe(80);
    expect(lo).toBeLessThanOrEqual(hi);
  });
});
