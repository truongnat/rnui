import type { DeepPartial, ThemeOverride } from './types';

export function createTheme(override: ThemeOverride): ThemeOverride {
  return override;
}

export function deepMerge<T extends object>(
  base: T,
  override: DeepPartial<T>
): T {
  const result = { ...base };
  for (const key in override) {
    const overrideVal = override[key as keyof typeof override];
    const baseVal = base[key as unknown as keyof T];
    if (
      overrideVal !== undefined &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === 'object'
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        baseVal as object,
        overrideVal as DeepPartial<object>
      );
    } else if (overrideVal !== undefined) {
      (result as Record<string, unknown>)[key] = overrideVal;
    }
  }
  return result;
}
