import { describe, expect, test } from 'bun:test';
import {
  builtInScreenSchemaExamples,
  getAllowedProps,
  getComponentSchema,
  getLazyLoadPlan,
  listComponentSchemas,
  listWebPreviewComponents,
  loginScreenSchemaExample,
  validateComponentProps,
  validateScreenSchema,
} from '../index';

describe('component schema registry', () => {
  test('has unique component names', () => {
    const names = listComponentSchemas().map((schema) => schema.name);
    expect(new Set(names).size).toBe(names.length);
  });

  test('getComponentSchema returns known component', () => {
    expect(getComponentSchema('Button')?.name).toBe('Button');
  });

  test('listWebPreviewComponents excludes native-only components', () => {
    const webNames = listWebPreviewComponents().map((schema) => schema.name);
    expect(webNames).toContain('Button');
    expect(webNames).not.toContain('Modal');
    expect(webNames).not.toContain('BottomSheet');
  });

  test('getAllowedProps returns AI-safe props only', () => {
    const props = getAllowedProps('Button');
    expect(props).toContain('label');
    expect(props).toContain('variant');
    expect(props).not.toContain('style');
  });
});

describe('validateComponentProps', () => {
  test('rejects unknown prop', () => {
    const result = validateComponentProps('Button', { foo: 'bar' });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Unknown prop'))).toBe(true);
  });

  test('rejects function prop', () => {
    const result = validateComponentProps('Button', {
      label: 'Go',
      onPress: () => {},
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('function'))).toBe(true);
  });

  test('accepts valid button props', () => {
    const result = validateComponentProps('Button', {
      label: 'Save',
      variant: 'solid',
      fullWidth: true,
      action: 'save',
    });
    expect(result.valid).toBe(true);
  });
});

describe('validateScreenSchema', () => {
  test('validates login schema example', () => {
    const result = validateScreenSchema(loginScreenSchemaExample);
    expect(result.valid).toBe(true);
  });

  test('rejects schema that is not a plain object', () => {
    const result1 = validateScreenSchema(null);
    expect(result1.valid).toBe(false);
    expect(result1.errors.some((e) => e.code === 'invalid_schema')).toBe(true);

    const result2 = validateScreenSchema('not an object');
    expect(result2.valid).toBe(false);
    expect(result2.errors.some((e) => e.code === 'invalid_schema')).toBe(true);

    const result3 = validateScreenSchema([]);
    expect(result3.valid).toBe(false);
    expect(result3.errors.some((e) => e.code === 'invalid_schema')).toBe(true);
  });

  test('rejects missing or empty id', () => {
    const result1 = validateScreenSchema({
      name: 'Test',
      version: '1',
      root: { type: 'Screen', props: {} },
    });
    expect(result1.valid).toBe(false);
    expect(result1.errors.some((e) => e.code === 'missing_id')).toBe(true);

    const result2 = validateScreenSchema({
      id: '',
      name: 'Test',
      version: '1',
      root: { type: 'Screen', props: {} },
    });
    expect(result2.valid).toBe(false);
    expect(result2.errors.some((e) => e.code === 'missing_id')).toBe(true);
  });

  test('rejects missing or empty name', () => {
    const result1 = validateScreenSchema({
      id: 'test',
      version: '1',
      root: { type: 'Screen', props: {} },
    });
    expect(result1.valid).toBe(false);
    expect(result1.errors.some((e) => e.code === 'missing_name')).toBe(true);

    const result2 = validateScreenSchema({
      id: 'test',
      name: '',
      version: '1',
      root: { type: 'Screen', props: {} },
    });
    expect(result2.valid).toBe(false);
    expect(result2.errors.some((e) => e.code === 'missing_name')).toBe(true);
  });

  test('rejects invalid version', () => {
    const result = validateScreenSchema({
      id: 'test',
      name: 'Test',
      version: '2',
      root: { type: 'Screen', props: {} },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'invalid_version')).toBe(true);
  });

  test('rejects missing root', () => {
    const result = validateScreenSchema({
      id: 'test',
      name: 'Test',
      version: '1',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'missing_root')).toBe(true);
  });

  test('rejects unknown component', () => {
    const result = validateScreenSchema({
      id: 'bad',
      name: 'Bad',
      version: '1',
      root: { type: 'NotAComponent', props: {} },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'unknown_component')).toBe(
      true
    );
  });

  test('rejects dangerous keys', () => {
    const result = validateScreenSchema({
      id: 'bad',
      name: 'Bad',
      version: '1',
      root: {
        type: 'Stack',
        props: { style: { marginTop: 16 } },
      },
    });
    expect(result.valid).toBe(false);
    expect(
      result.errors.some(
        (e) =>
          e.code === 'dangerous_key' ||
          (e.code === 'invalid_prop' && e.message.includes('style'))
      )
    ).toBe(true);
  });

  test('validates all built-in examples', () => {
    for (const example of builtInScreenSchemaExamples) {
      const result = validateScreenSchema(example);
      expect(result.valid).toBe(true);
    }
  });
});

describe('getLazyLoadPlan', () => {
  test('returns unique component list with import metadata', () => {
    const plan = getLazyLoadPlan(loginScreenSchemaExample);
    const types = plan.components.map((entry) => entry.type);
    expect(new Set(types).size).toBe(types.length);
    expect(types).toContain('Button');
    expect(types).toContain('Screen');
    expect(
      plan.components.find((c) => c.type === 'Button')?.import.lazyKey
    ).toBe('Button');
  });
});
