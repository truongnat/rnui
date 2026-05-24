import {
  getLazyLoadPlan,
  validateScreenSchema,
  type LazyLoadPlan,
  type ScreenSchema,
  type ValidationResult,
} from '@truongdq01/component-schema';
import { exportSchemaToTsx } from '../../../../packages/renderer/src/export-tsx';
import type { ChatMessage } from './ai/types';
import { exampleSchemas, type ExampleSchemaKey } from './example-schemas';

export type BuilderTab = 'schema' | 'validation' | 'tsx' | 'lazy';

export type BuilderState = {
  schema: ScreenSchema;
  schemaText: string;
  tsx: string;
  validation: ValidationResult;
  lazyPlan: LazyLoadPlan | null;
  messages: ChatMessage[];
  activeTab: BuilderTab;
  isGenerating: boolean;
  copyNotice: string | null;
};

export function schemaToText(schema: ScreenSchema): string {
  return `${JSON.stringify(schema, null, 2)}\n`;
}

export function parseSchemaText(text: string): ScreenSchema {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Schema must be a JSON object');
  }
  return parsed as ScreenSchema;
}

function analyzeSchema(schema: unknown): {
  validation: ValidationResult;
  lazyPlan: LazyLoadPlan | null;
} {
  const validation = validateScreenSchema(schema, { requireWebPreview: true });
  const lazyPlan =
    validation.valid && typeof schema === 'object' && schema !== null
      ? getLazyLoadPlan(schema as ScreenSchema)
      : null;
  return { validation, lazyPlan };
}

export function tsxExportFilename(schema: ScreenSchema): string {
  const base = schema.name.replace(/\s+/g, '');
  return `${base}Screen.tsx`;
}

export function createInitialState(): BuilderState {
  return loadExampleState('login');
}

export function loadExampleState(key: ExampleSchemaKey): BuilderState {
  const schema = exampleSchemas[key];
  const { validation, lazyPlan } = analyzeSchema(schema);

  return {
    schema,
    schemaText: schemaToText(schema),
    tsx: exportSchemaToTsx(schema, {
      componentName: `${schema.name.replace(/\s+/g, '')}Screen`,
    }),
    validation,
    lazyPlan,
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'RNUI Screen Builder — pick a template chip or describe a screen. Mock AI only; no external API.',
        timestamp: Date.now(),
      },
    ],
    activeTab: 'schema',
    isGenerating: false,
    copyNotice: null,
  };
}

export function applyExampleTemplate(
  state: BuilderState,
  key: ExampleSchemaKey
): BuilderState {
  const schema = exampleSchemas[key];
  return applySchemaUpdate(
    {
      ...state,
      messages: [
        ...state.messages,
        {
          id: `template-${key}-${Date.now()}`,
          role: 'assistant',
          content: `Loaded ${schema.name} template.`,
          timestamp: Date.now(),
        },
      ],
    },
    schema
  );
}

export function applySchemaUpdate(
  state: BuilderState,
  schema: ScreenSchema
): BuilderState {
  const { validation, lazyPlan } = analyzeSchema(schema);

  return {
    ...state,
    schema,
    schemaText: schemaToText(schema),
    tsx: exportSchemaToTsx(schema, {
      componentName: `${schema.name.replace(/\s+/g, '')}Screen`,
    }),
    validation,
    lazyPlan,
    activeTab: validation.valid ? state.activeTab : 'validation',
  };
}

export function applyInvalidJson(
  state: BuilderState,
  message: string
): BuilderState {
  return {
    ...state,
    activeTab: 'validation',
    lazyPlan: null,
    validation: {
      valid: false,
      errors: [{ path: 'schemaText', message, code: 'invalid_json' }],
      warnings: [],
    },
  };
}

export function exportTsxFromState(state: BuilderState): string {
  if (!state.validation.valid) {
    return '// Fix validation errors before exporting TSX.\n';
  }
  return exportSchemaToTsx(state.schema, {
    componentName: `${state.schema.name.replace(/\s+/g, '')}Screen`,
  });
}
