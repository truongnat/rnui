import { renderHook } from '@testing-library/react-native';
import { useId } from '../useId';

describe('useId', () => {
  it('should return the provided idProp', () => {
    const { result } = renderHook(() => useId('custom-id'));
    expect(result.current).toBe('custom-id');
  });

  it('should generate a unique clean ID when no props are provided', () => {
    const { result } = renderHook(() => useId());

    // React's useId starts with :r and ends with : usually, e.g., :r0:
    // Our hook strips out the colons, so it should be r0 or similar
    expect(result.current).not.toContain(':');
    expect(typeof result.current).toBe('string');
    expect(result.current.length).toBeGreaterThan(0);
  });

  it('should generate a unique clean ID with a prefix', () => {
    const { result } = renderHook(() => useId(undefined, 'my-prefix'));

    expect(result.current).not.toContain(':');
    expect(result.current.startsWith('my-prefix-')).toBe(true);
    expect(result.current.length).toBeGreaterThan('my-prefix-'.length);
  });

  it('should generate consistent IDs across re-renders for the same hook call', () => {
    const { result, rerender } = renderHook(() => useId());
    const initialId = result.current;

    rerender({});
    expect(result.current).toBe(initialId);
  });

  it('should generate consistent IDs across re-renders for the same hook call with prefix', () => {
    const { result, rerender } = renderHook(({ prefix }) => useId(undefined, prefix), {
      initialProps: { prefix: 'prefix1' }
    });

    const initialId = result.current;

    rerender({ prefix: 'prefix1' });
    expect(result.current).toBe(initialId);
  });

  it('should update the ID if prefix prop changes', () => {
    const { result, rerender } = renderHook(({ prefix }) => useId(undefined, prefix), {
      initialProps: { prefix: 'prefix1' }
    });

    const initialId = result.current;

    rerender({ prefix: 'prefix2' });
    expect(result.current).not.toBe(initialId);
    expect(result.current.startsWith('prefix2-')).toBe(true);
  });

  it('should prefer idProp over generated ID and prefix', () => {
    const { result } = renderHook(() => useId('explicit-id', 'prefix'));
    expect(result.current).toBe('explicit-id');
  });
});
