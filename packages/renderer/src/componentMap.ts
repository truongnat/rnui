import type { ElementType } from 'react';
import type { RendererComponentMap } from './types';

/** Synchronous map of web-preview-safe RNUI components keyed by schema type / lazyKey. */
export function createDefaultComponentMap(
  ui: typeof import('@truongdq01/ui')
): RendererComponentMap {
  const {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Checkbox,
    Chip,
    Divider,
    Input,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
  } = ui;

  return {
    Screen: Stack,
    Stack,
    Box,
    Card,
    Paper,
    Divider,
    Typography,
    Button,
    Input,
    TextField,
    Checkbox,
    Switch,
    Badge,
    Chip,
    Alert,
    Avatar,
  };
}

export function getMvpComponentTypes(): string[] {
  return [
    'Screen',
    'Stack',
    'Box',
    'Card',
    'Paper',
    'Typography',
    'Button',
    'Input',
    'TextField',
    'Badge',
    'Chip',
    'Alert',
    'Avatar',
    'Divider',
    'Switch',
    'Checkbox',
  ];
}

export type UiModule = typeof import('@truongdq01/ui');

export function pickUiComponent(
  ui: UiModule,
  named: keyof UiModule
): ElementType {
  return ui[named] as ElementType;
}
