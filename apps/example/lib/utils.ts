import { createContext, type MutableRefObject, type Ref } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { Linking, useColorScheme } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Named spacing steps shared by layout components (stack, grid). */
export const spacingScale = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export type SpacingToken = keyof typeof spacingScale;

/** Resolve a spacing token or raw number to pixels. */
export function spacingValue(value: SpacingToken | number | undefined): number {
  if (value === undefined) return 0;
  return typeof value === 'number' ? value : spacingScale[value];
}

export interface FormFieldContextValue {
  id: string;
  error?: string;
}

/** Lives in lib so controls (input, textarea…) can consume it without depending on ui/form. */
export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null
);

/**
 * Text classes propagated to descendant <Text> — lets Button/Chip/etc
 * color nested labels without inspecting children (rnr pattern).
 */
export const TextClassContext = createContext<string | undefined>(undefined);

type IconTone =
  | 'default'
  | 'muted'
  | 'foreground'
  | 'onPrimary'
  | 'primary'
  | 'destructive'
  | 'success'
  | 'warning';

/** Scheme-aware colors for lucide/SVG icons; keep aligned with global.css tokens. */
export function useIconColor(tone: IconTone = 'muted') {
  const dark = useColorScheme() === 'dark';
  const tones: Record<IconTone, string> = {
    default: dark ? '#fafafa' : '#09090b',
    muted: dark ? '#a1a1aa' : '#71717a',
    foreground: dark ? '#fafafa' : '#09090b',
    onPrimary: dark ? '#18181b' : '#fafafa',
    primary: dark ? '#fafafa' : '#18181b',
    destructive: dark ? '#f87171' : '#ef4444',
    success: '#16a34a',
    warning: '#f59e0b',
  };
  return tones[tone];
}

/** Combine a trigger's measuring ref with a ref already on the child (asChild). */
export function composeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

export type ThemeColorToken =
  | 'background'
  | 'foreground'
  | 'primary'
  | 'primaryForeground'
  | 'ring'
  | 'destructive'
  | 'input'
  | 'border'
  | 'muted'
  | 'accent'
  | 'mutedForeground';

/**
 * Resolves semantic color tokens to hex for style-prop usage.
 * Use this instead of toggling var-referencing classes dynamically —
 * dynamic class changes that introduce CSS variables trigger a
 * css-interop upgrade warning that can OOM Hermes.
 * Keep aligned with variants' global.css.
 */
export function useThemeColor(): Record<ThemeColorToken, string> {
  const dark = useColorScheme() === 'dark';
  return {
    background: dark ? '#09090b' : '#ffffff',
    foreground: dark ? '#fafafa' : '#09090b',
    primary: dark ? '#fafafa' : '#18181b',
    primaryForeground: dark ? '#18181b' : '#fafafa',
    ring: dark ? '#d4d4d8' : '#09090b',
    destructive: dark ? '#7f1d1d' : '#ef4444',
    input: dark ? '#27272a' : '#e4e4e7',
    border: dark ? '#27272a' : '#e4e4e7',
    muted: dark ? '#27272a' : '#f4f4f5',
    accent: dark ? '#27272a' : '#f4f4f5',
    mutedForeground: dark ? '#a1a1aa' : '#71717a',
  };
}

const SAFE_URL_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:'];

/**
 * Opens a URL via Linking after allow-listing its scheme.
 * Blocks javascript:/file:/etc — mirror of packages/headless `openSafeUrl`.
 */
export async function openSafeUrl(url: string): Promise<void> {
  let protocol: string | null = null;
  try {
    protocol = new URL(url).protocol;
  } catch {
    if (__DEV__) console.warn(`[openSafeUrl] Invalid URL: ${url}`);
    return;
  }
  if (!SAFE_URL_SCHEMES.includes(protocol)) {
    if (__DEV__)
      console.warn(`[openSafeUrl] Blocked scheme "${protocol}": ${url}`);
    return;
  }
  if (!(await Linking.canOpenURL(url))) {
    if (__DEV__) console.warn(`[openSafeUrl] Cannot open URL: ${url}`);
    return;
  }
  await Linking.openURL(url);
}
