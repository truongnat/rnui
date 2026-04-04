import { renderHook } from '@testing-library/react-native';
import { useMemoStyles } from '../useMemoStyles';
import { useTokens } from '../../theme';
import type { SemanticTokens } from '@truongdq01/tokens';

jest.mock('../../theme', () => ({
  useTokens: jest.fn(),
}));

describe('useMemoStyles', () => {
  const mockTokens = {
    color: {
      brand: { default: 'blue' },
      bg: { default: 'white' },
    },
  } as unknown as SemanticTokens;

  beforeEach(() => {
    jest.clearAllMocks();
    (useTokens as jest.Mock).mockReturnValue(mockTokens);
  });

  it('should create styles using the provided factory and tokens', () => {
    const factory = jest.fn((tokens: SemanticTokens) => ({
      container: {
        backgroundColor: tokens.color.bg.default,
      },
      text: {
        color: tokens.color.brand.default,
      },
    }));

    const { result } = renderHook(() => useMemoStyles(factory));

    expect(useTokens).toHaveBeenCalled();
    expect(factory).toHaveBeenCalledWith(mockTokens);
    expect(result.current).toEqual({
      container: { backgroundColor: 'white' },
      text: { color: 'blue' },
    });
  });

  it("should memoize styles and not recreate them on re-renders if tokens haven't changed", () => {
    const factory = jest.fn((tokens: SemanticTokens) => ({
      container: { backgroundColor: tokens.color.bg.default },
    }));

    const { result, rerender } = renderHook(() => useMemoStyles(factory));

    const initialStyles = result.current;

    // Re-render the hook
    rerender(undefined);

    // The factory function should only have been called once, during the initial render
    expect(factory).toHaveBeenCalledTimes(1);

    // The returned styles reference should be exactly the same
    expect(result.current).toBe(initialStyles);
  });

  it('should not re-evaluate the factory if a new inline function is passed but tokens are unchanged', () => {
    // This is a crucial feature of useMemoStyles: it stores the factory in a ref
    // so inline functions don't trigger re-computations.
    let callCount = 0;

    const { result, rerender } = renderHook(
      (props: { isInline: boolean }) => {
        // Create a new function reference on every render
        const inlineFactory = (tokens: SemanticTokens) => {
          callCount++;
          return {
            box: { backgroundColor: tokens.color.brand.default },
          };
        };
        return useMemoStyles(inlineFactory);
      },
      { initialProps: { isInline: true } }
    );

    const initialStyles = result.current;

    // Trigger a re-render which will pass a new inlineFactory function reference
    rerender({ isInline: true });

    // The factory was only executed once
    expect(callCount).toBe(1);

    // The styles reference is unchanged
    expect(result.current).toBe(initialStyles);
  });

  it('should re-compute styles when tokens change', () => {
    const factory = jest.fn((tokens: SemanticTokens) => ({
      container: { backgroundColor: tokens.color.bg.default },
    }));

    const { result, rerender } = renderHook(() => useMemoStyles(factory));

    const initialStyles = result.current;

    // Simulate a theme change (e.g. light -> dark mode)
    const newMockTokens = {
      color: {
        brand: { default: 'lightblue' },
        bg: { default: 'black' },
      },
    } as unknown as SemanticTokens;

    (useTokens as jest.Mock).mockReturnValue(newMockTokens);

    // Re-render the hook with the new tokens context
    rerender(undefined);

    // The factory should be called again with the new tokens
    expect(factory).toHaveBeenCalledTimes(2);
    expect(factory).toHaveBeenLastCalledWith(newMockTokens);

    // The styles reference should be different and contain the new values
    expect(result.current).not.toBe(initialStyles);
    expect(result.current).toEqual({
      container: { backgroundColor: 'black' },
    });
  });
});
