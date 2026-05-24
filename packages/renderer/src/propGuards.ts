import {
  getComponentSchema,
  type ComponentPropSchema,
} from '@truongdq01/component-schema';

const BLOCKED_PROP_KEYS = new Set([
  'dangerouslySetInnerHTML',
  'eval',
  '__proto__',
  'prototype',
  'constructor',
  'style',
  'sx',
  'labelStyle',
]);

const LAYOUT_TYPES = new Set([
  'Screen',
  'Stack',
  'Box',
  'Card',
  'Paper',
  'FormGroup',
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function propSchemaAllowsObject(prop: ComponentPropSchema): boolean {
  return (
    prop.type === 'object' || prop.type === 'action' || prop.type === 'node'
  );
}

function isAllowedPropValue(
  prop: ComponentPropSchema,
  value: unknown
): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'function') return false;

  if (typeof value === 'object' && !Array.isArray(value)) {
    return propSchemaAllowsObject(prop);
  }

  switch (prop.type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'enum':
      return (
        typeof value === 'string' && (prop.enumValues?.includes(value) ?? false)
      );
    case 'action':
      return typeof value === 'string' || isPlainObject(value);
    case 'node':
      return isPlainObject(value) || typeof value === 'string';
    case 'object':
      return isPlainObject(value);
    default:
      return false;
  }
}

export type GuardedPropsResult = {
  safeProps: Record<string, unknown>;
  warnings: string[];
};

/**
 * Filters schema props to those declared on the component schema.
 * Never passes style, functions, or dangerous keys through to RNUI.
 */
export function guardNodeProps(
  type: string,
  props: Record<string, unknown> | undefined
): GuardedPropsResult {
  const warnings: string[] = [];
  const input = props ?? {};
  const schema = getComponentSchema(type);

  if (!schema) {
    return {
      safeProps: {},
      warnings: [`No schema for "${type}" — props stripped`],
    };
  }

  const allowed = new Map(schema.props.map((prop) => [prop.name, prop]));
  const safeProps: Record<string, unknown> = {};

  for (const key of Object.keys(input)) {
    if (BLOCKED_PROP_KEYS.has(key)) {
      warnings.push(`Blocked prop "${key}" on ${type}`);
      continue;
    }

    const propSchema = allowed.get(key);
    if (!propSchema) {
      warnings.push(`Unknown prop "${key}" on ${type} — ignored`);
      continue;
    }

    const value = input[key];
    if (typeof value === 'function') {
      warnings.push(`Function prop "${key}" on ${type} — ignored`);
      continue;
    }

    if (!isAllowedPropValue(propSchema, value)) {
      warnings.push(`Invalid value for "${key}" on ${type} — ignored`);
      continue;
    }

    if (propSchema.name === 'action') {
      safeProps[key] = value;
      continue;
    }

    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      !propSchemaAllowsObject(propSchema)
    ) {
      warnings.push(`Object prop "${key}" on ${type} — ignored`);
      continue;
    }

    safeProps[key] = value;
  }

  return { safeProps, warnings };
}

export function layoutAcceptsStringChild(type: string): boolean {
  const schema = getComponentSchema(type);
  if (!schema?.children?.allowed) return false;
  return (
    schema.children.stringChildAllowed === true ||
    schema.children.textAllowed === true
  );
}

export function isLayoutType(type: string): boolean {
  return LAYOUT_TYPES.has(type);
}

export function resolveActionName(action: unknown): string | undefined {
  if (typeof action === 'string' && action.length > 0) {
    return action;
  }

  if (isPlainObject(action) && action.type === 'event') {
    const name = action.name;
    if (typeof name === 'string' && name.length > 0) {
      return name;
    }
  }

  return undefined;
}
