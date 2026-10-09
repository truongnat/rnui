import type { RendererComponentMap } from './types';

/**
 * Build a `RendererComponentMap` from supplied components keyed by schema type
 * or export name (e.g. `{ Button, Stack, Text, View, ... }` resolved from
 * `@/components/ui/*` and `react-native`).
 *
 * The renderer no longer depends on a fixed UI package — callers inject the
 * registry kit components. This helper only fills in structural aliases:
 * `Screen` (the schema root) falls back to `Stack`, then `View`.
 */
export function createDefaultComponentMap(
  components: RendererComponentMap
): RendererComponentMap {
  const map: RendererComponentMap = { ...components };
  if (!map.Screen) {
    map.Screen = components.Stack ?? components.View;
  }
  return map;
}

/** Schema types the registry kit supports in web preview by default. */
export function getMvpComponentTypes(): string[] {
  return [
    'Screen',
    'Stack',
    'View',
    'Grid',
    'GridItem',
    'Card',
    'Paper',
    'Separator',
    'Text',
    'Link',
    'Button',
    'Input',
    'TextField',
    'Checkbox',
    'Switch',
    'Badge',
    'Chip',
    'Alert',
    'AlertTitle',
    'AlertDescription',
    'Avatar',
    'AvatarImage',
    'AvatarFallback',
    'Icon',
    'Image',
    'Progress',
    'List',
    'ListItem',
  ];
}
