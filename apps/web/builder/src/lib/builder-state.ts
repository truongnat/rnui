import { validateScreenSchema } from '@truongdq01/component-schema';
import type { ScreenSchema, ValidationResult } from '@truongdq01/component-schema';
import { exportScreenSchemaToTsx } from '../../../../../packages/renderer/src/export-tsx';
import type { ChatMessage } from './mock-ai';
import { exampleSchemas } from './example-schemas';

export type BuilderTab = 'schema' | 'validation' | 'tsx';

export type BuilderState = {
  schema: ScreenSchema;
  schemaText: string;
  tsx: string;
  validation: ValidationResult;
  messages: ChatMessage[];
  activeTab: BuilderTab;
  isGenerating: boolean;
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

export function createInitialState(): BuilderState {
  const schema = exampleSchemas.login;
  const validation = validateScreenSchema(schema, { requireWebPreview: true });

  return {
    schema,
    schemaText: schemaToText(schema),
    tsx: exportScreenSchemaToTsx(schema, { componentName: 'LoginScreen' }),
    validation,
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'RNUI Builder MVP — describe a screen (login, settings, profile, dashboard, form) or type "invalid" to test the repair loop. No live AI API in this phase.',
        timestamp: Date.now(),
      },
    ],
    activeTab: 'schema',
    isGenerating: false,
  };
}

export function applySchemaUpdate(
  state: BuilderState,
  schema: ScreenSchema,
  validation: ValidationResult
): BuilderState {
  return {
    ...state,
    schema,
    schemaText: schemaToText(schema),
    tsx: exportScreenSchemaToTsx(schema, {
      componentName: `${schema.name.replace(/\s+/g, '')}Screen`,
    }),
    validation,
    activeTab: validation.valid ? state.activeTab : 'validation',
  };
}
