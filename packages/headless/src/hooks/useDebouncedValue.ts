import { useEffect, useState } from 'react';

/**
 * Returns a value that updates after `delayMs` of stability.
 * When `delayMs` is 0 or negative, returns `value` synchronously (no debouncing).
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (delayMs <= 0) {
      setDebounced(value);
      return;
    }
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return delayMs <= 0 ? value : debounced;
}
