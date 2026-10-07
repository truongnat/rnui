import { createContext, type MutableRefObject, type Ref } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { useColorScheme } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

type IconTone = 'muted' | 'foreground' | 'onPrimary';

/** Scheme-aware colors for lucide/SVG icons; keep aligned with global.css tokens. */
export function useIconColor(tone: IconTone = 'muted') {
  const dark = useColorScheme() === 'dark';
  const tones: Record<IconTone, string> = {
    muted: dark ? '#a1a1aa' : '#71717a',
    foreground: dark ? '#fafafa' : '#09090b',
    onPrimary: dark ? '#18181b' : '#fafafa',
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
