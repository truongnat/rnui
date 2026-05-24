import { getComponentSchema } from './registry';
import type { ComponentPropSchema, ComponentSchema } from './types';

export type ComponentPropsValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

const DANGEROUS_PROP_KEYS = new Set([
  '__proto__',
  'constructor',
  'prototype',
  'style',
  'sx',
  'labelStyle',
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFunctionValue(value: unknown): boolean {
  return typeof value === 'function';
}

function propAllowsType(
  propSchema: ComponentPropSchema,
  value: unknown
): boolean {
  switch (propSchema.type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'enum':
      return (
        typeof value === 'string' &&
        (propSchema.enumValues?.includes(value) ?? false)
      );
    case 'node':
      return isPlainObject(value) || typeof value === 'string';
    case 'action':
      return typeof value === 'string' || isPlainObject(value);
    case 'object':
      return isPlainObject(value);
    default:
      return false;
  }
}

function validatePropAgainstSchema(
  propSchema: ComponentPropSchema,
  value: unknown
): string | null {
  if (isFunctionValue(value)) {
    return `Prop "${propSchema.name}" cannot be a function in ScreenSchema`;
  }

  if (value === undefined || value === null) {
    if (propSchema.required) {
      return `Required prop "${propSchema.name}" is missing`;
    }
    return null;
  }

  if (!propAllowsType(propSchema, value)) {
    const enumHint = propSchema.enumValues
      ? ` (allowed: ${propSchema.enumValues.join(', ')})`
      : '';
    return `Prop "${propSchema.name}" has invalid type for schema${enumHint}`;
  }

  return null;
}

export function validateComponentProps(
  name: string,
  props: Record<string, unknown> | undefined
): ComponentPropsValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const schema = getComponentSchema(name);

  if (!schema) {
    return {
      valid: false,
      errors: [`Unknown component type "${name}"`],
      warnings,
    };
  }

  const safeProps = props ?? {};
  const propMap = new Map(schema.props.map((prop) => [prop.name, prop]));

  for (const key of Object.keys(safeProps)) {
    if (isFunctionValue(safeProps[key])) {
      errors.push(
        `Prop "${key}" cannot be a function in ScreenSchema for ${name}`
      );
      continue;
    }

    if (DANGEROUS_PROP_KEYS.has(key)) {
      errors.push(
        `Prop "${key}" is not allowed in ScreenSchema for ${name} (use theme tokens and layout props)`
      );
      continue;
    }

    const propSchema = propMap.get(key);
    if (!propSchema) {
      errors.push(`Unknown prop "${key}" on component "${name}"`);
      continue;
    }

    if (propSchema.safeForAI === false) {
      warnings.push(`Prop "${key}" on "${name}" is not marked safeForAI`);
    }

    const propError = validatePropAgainstSchema(propSchema, safeProps[key]);
    if (propError) errors.push(propError);
  }

  for (const propSchema of schema.props) {
    if (propSchema.required && !(propSchema.name in safeProps)) {
      if (
        propSchema.name === 'children' &&
        schema.children?.stringChildAllowed
      ) {
        continue;
      }
      errors.push(`Required prop "${propSchema.name}" is missing on "${name}"`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function getComponentSchemaOrThrow(name: string): ComponentSchema {
  const schema = getComponentSchema(name);
  if (!schema) {
    throw new Error(`Unknown component type "${name}"`);
  }
  return schema;
}
