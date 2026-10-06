import { type ClassValue, clsx } from 'clsx';
import { useColorScheme } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
