import { renderHook, act } from '@testing-library/react-native';
import { usePersistedColorScheme } from '../usePersistedColorScheme';
import type { PersistedColorSchemeStorage } from '../usePersistedColorScheme';

function createMemoryStorage(initial: Record<string, string> = {}) {
  const map = { ...initial };
  const storage: PersistedColorSchemeStorage = {
    getItem: async (key: string) => map[key] ?? null,
    setItem: async (key: string, value: string) => {
      map[key] = value;
    },
  };
  return { storage, map };
}

describe('usePersistedColorScheme', () => {
  it('hydrates from storage and sets hydrated true', async () => {
    const { storage } = createMemoryStorage({ '@test/scheme': 'dark' });
    const { result } = renderHook(() =>
      usePersistedColorScheme({
        storage,
        storageKey: '@test/scheme',
        defaultScheme: 'system',
      })
    );

    expect(result.current.hydrated).toBe(false);
    expect(result.current.colorScheme).toBe('system');

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.hydrated).toBe(true);
    expect(result.current.colorScheme).toBe('dark');
  });

  it('persists when setColorScheme is called', async () => {
    const { storage, map } = createMemoryStorage();
    const { result } = renderHook(() =>
      usePersistedColorScheme({
        storage,
        storageKey: '@test/scheme',
        defaultScheme: 'system',
      })
    );

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current.setColorScheme('light');
    });

    expect(result.current.colorScheme).toBe('light');
    expect(map['@test/scheme']).toBe('light');
  });

  it('ignores invalid stored values', async () => {
    const { storage } = createMemoryStorage({ '@test/scheme': 'not-a-scheme' });
    const { result } = renderHook(() =>
      usePersistedColorScheme({
        storage,
        storageKey: '@test/scheme',
        defaultScheme: 'light',
      })
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.colorScheme).toBe('light');
  });
});
