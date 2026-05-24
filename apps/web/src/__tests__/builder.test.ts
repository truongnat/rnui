import { describe, expect, test } from 'bun:test';
import { MockAIProvider } from '@/lib/ai/mockProvider';
import {
  applyInvalidJson,
  createInitialState,
  exportTsxFromState,
  parseSchemaText,
} from '@/lib/builder-state';

describe('MockAIProvider', () => {
  const provider = new MockAIProvider();

  test('returns login schema for login prompt', async () => {
    const result = await provider.generateSchema({
      prompt: 'build a login screen',
    });
    expect(result.schema.id).toBe('login');
  });

  test('returns dashboard schema by default', async () => {
    const result = await provider.generateSchema({ prompt: 'hello world' });
    expect(result.schema.id).toBe('dashboard');
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
});
