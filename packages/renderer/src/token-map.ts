/** Token-aligned screen padding presets (matches RNUI spacing scale). */
export const SCREEN_PADDING_MAP = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 24,
} as const;

export type ScreenPaddingPreset = keyof typeof SCREEN_PADDING_MAP;

export function resolveScreenPadding(padding: unknown): number {
  if (typeof padding === 'number') return padding;
  if (typeof padding === 'string' && padding in SCREEN_PADDING_MAP) {
    return SCREEN_PADDING_MAP[padding as ScreenPaddingPreset];
  }
  return SCREEN_PADDING_MAP.md;
}
