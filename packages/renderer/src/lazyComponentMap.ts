import type { ElementType } from 'react';
import type { LazyComponentLoader, LazyComponentMap } from './types';

function loadNamed(
  named: keyof typeof import('@truongdq01/ui')
): LazyComponentLoader {
  return () =>
    import('@truongdq01/ui').then((module) => ({
      default: module[named] as ElementType,
    }));
}

/** Dynamic import map for code-splitting in the web builder. */
export function createLazyComponentMap(): LazyComponentMap {
  return {
    Screen: loadNamed('Stack'),
    Stack: loadNamed('Stack'),
    Box: loadNamed('Box'),
    Card: loadNamed('Card'),
    Paper: loadNamed('Paper'),
    Divider: loadNamed('Divider'),
    Typography: loadNamed('Typography'),
    Button: loadNamed('Button'),
    Input: loadNamed('Input'),
    TextField: loadNamed('TextField'),
    Checkbox: loadNamed('Checkbox'),
    Switch: loadNamed('Switch'),
    Badge: loadNamed('Badge'),
    Chip: loadNamed('Chip'),
    Alert: loadNamed('Alert'),
    Avatar: loadNamed('Avatar'),
  };
}
