import { describe, expect, test } from 'bun:test';
import {
  builtInScreenSchemaExamples,
  validateScreenSchema,
} from '@truongdq01/component-schema';
import { MockAIProvider } from '@/lib/ai/mockProvider';
import {
  applyExampleTemplate,
  applyInvalidJson,
  createInitialState,
  exportTsxFromState,
  loadExampleState,
  parseSchemaText,
  tsxExportFilename,
} from '@/lib/builder-state';
import { exampleSchemas } from '@/lib/example-schemas';

describe('MockAIProvider', () => {
  const provider = new MockAIProvider();

  test('returns login schema for login prompt', async () => {
    const result = await provider.generateSchema({
      prompt: 'build a login screen',
    });
    expect(result.schema.id).toBe('login');
    expect(result.reasoningSummary).toContain('Card');
  });

  test('returns dashboard schema by default', async () => {
    const result = await provider.generateSchema({ prompt: 'hello world' });
    expect(result.schema.id).toBe('dashboard');
  });

  test('maps payment keywords to form template', async () => {
    const result = await provider.generateSchema({
      prompt: 'checkout payment screen',
    });
    expect(result.schema.id).toBe('form');
  });

  test('repairSchema returns valid login template', async () => {
    const result = await provider.repairSchema({
      schema: { id: '', name: '', version: '1', root: { type: 'Nope' } },
      errors: ['root: unknown'],
    });
    expect(result.schema.id).toBe('login');
    expect(result.reasoningSummary).toContain('Repaired');
  });
});

describe('example schemas', () => {
  for (const [key, schema] of Object.entries(exampleSchemas)) {
    test(`${key} validates for web preview`, () => {
      const result = validateScreenSchema(schema, { requireWebPreview: true });
      expect(result.valid).toBe(true);
    });
  }

  test('login schema uses Card and Typography hierarchy', () => {
    const login = exampleSchemas.login;
    const json = JSON.stringify(login.root);
    expect(json).toContain('"type":"Card"');
    expect(json).toContain('"variant":"h3"');
    expect(json).toContain('"type":"Avatar"');
    expect(json).toContain('"justifyContent":"center"');
  });

  test('each built-in example has layout container and Typography', () => {
    for (const schema of builtInScreenSchemaExamples) {
      const json = JSON.stringify(schema.root);
      const hasLayout =
        json.includes('"type":"Card"') ||
        json.includes('"type":"Paper"') ||
        json.includes('"type":"Stack"');
      expect(hasLayout).toBe(true);
      expect(json).toContain('"type":"Typography"');
    }
  });
});

describe('builder-state utilities', () => {
  test('parseSchemaText rejects non-object JSON', () => {
    expect(() => parseSchemaText('"nope"')).toThrow();
  });

  test('applyInvalidJson does not throw', () => {
    const next = applyInvalidJson(createInitialState(), 'Unexpected token');
    expect(next.validation.valid).toBe(false);
    expect(next.lazyPlan).toBeNull();
  });

  test('exportTsxFromState guards invalid schema', () => {
    const state = applyInvalidJson(createInitialState(), 'bad json');
    expect(exportTsxFromState(state)).toContain('Fix validation errors');
  });

  test('exportTsxFromState includes imports for valid schema', () => {
    const tsx = exportTsxFromState(createInitialState());
    expect(tsx).toContain('@truongdq01/ui');
    expect(tsx).toContain('LoginScreen');
  });

  test('tsxExportFilename derives screen filename', () => {
    expect(tsxExportFilename(exampleSchemas.login)).toBe('LoginScreen.tsx');
  });

  test('applyExampleTemplate loads dashboard without AI', () => {
    const initial = loadExampleState('login');
    const next = applyExampleTemplate(initial, 'dashboard');
    expect(next.schema.id).toBe('dashboard');
    expect(next.validation.valid).toBe(true);
    expect(next.tsx).toContain('DashboardScreen');
  });
});
