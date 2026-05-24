import {
  getLazyLoadPlan,
  listWebPreviewComponents,
  validateScreenSchema,
} from '@truongdq01/component-schema';
import type { ScreenSchema } from '@truongdq01/component-schema';
import type { ElementType } from 'react';
import type {
  LazyComponentLoader,
  LazyComponentMap,
  PrepareScreenRenderOptions,
  PreparedScreenRender,
  RendererComponentMap,
} from './types';

/** Synchronous map of web-preview-safe RNUI components keyed by schema lazyKey. */
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

/** Dynamic import map for code-splitting in web builder. */
export function createLazyComponentMap(): LazyComponentMap {
  const load = (
    named: keyof typeof import('@truongdq01/ui')
  ): LazyComponentLoader => {
    return () =>
      import('@truongdq01/ui').then((module) => ({
        default: module[named] as ElementType,
      }));
  };

  return {
    Screen: load('Stack'),
    Stack: load('Stack'),
    Box: load('Box'),
    Card: load('Card'),
    Paper: load('Paper'),
    Divider: load('Divider'),
    Typography: load('Typography'),
    Button: load('Button'),
    Input: load('Input'),
    TextField: load('TextField'),
    Checkbox: load('Checkbox'),
    Switch: load('Switch'),
    Badge: load('Badge'),
    Chip: load('Chip'),
    Alert: load('Alert'),
    Avatar: load('Avatar'),
  };
}

export async function loadComponentsForPlan(
  plan: ReturnType<typeof getLazyLoadPlan>,
  lazyMap: LazyComponentMap = createLazyComponentMap()
): Promise<RendererComponentMap> {
  const entries = await Promise.all(
    plan.components.map(async (entry) => {
      const loader = lazyMap[entry.import.lazyKey];
      if (!loader) {
        throw new Error(
          `No lazy loader registered for "${entry.import.lazyKey}" (${entry.type})`
        );
      }
      const loaded = await loader();
      return [entry.import.lazyKey, loaded.default] as const;
    })
  );

  return Object.fromEntries(entries);
}

export function getWebPreviewComponentTypes(): string[] {
  return listWebPreviewComponents().map((schema) => schema.name);
}

export function prepareScreenRender(
  schema: unknown,
  options: PrepareScreenRenderOptions = {}
): PreparedScreenRender {
  const validation = validateScreenSchema(schema, {
    requireWebPreview: options.requireWebPreview ?? true,
    maxDepth: options.maxDepth,
    maxNodes: options.maxNodes,
  });

  if (!validation.valid) {
    return {
      valid: false,
      errors: validation.errors.map((e) => `${e.path}: ${e.message}`),
      warnings: validation.warnings.map((w) => `${w.path}: ${w.message}`),
    };
  }

  const screenSchema = schema as ScreenSchema;
  const plan = getLazyLoadPlan(screenSchema);

  return {
    valid: true,
    schema: screenSchema,
    plan,
    errors: [],
    warnings: validation.warnings.map((w) => `${w.path}: ${w.message}`),
  };
}
