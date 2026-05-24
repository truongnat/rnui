import { getComponentSchema } from './registry';
import { validateComponentProps } from './validators';
import type { ComponentImportSchema } from './types';

export const SCREEN_SCHEMA_VERSION = '1' as const;

export type ScreenAction = {
  id: string;
  description?: string;
};

export type ComponentNode = {
  id?: string;
  type: string;
  props?: Record<string, unknown>;
  children?: ComponentNode[] | string;
};

export type ScreenSchema = {
  id: string;
  name: string;
  version: typeof SCREEN_SCHEMA_VERSION;
  description?: string;
  root: ComponentNode;
  metadata?: Record<string, unknown>;
  actions?: ScreenAction[];
};

export type ValidationError = {
  path: string;
  message: string;
  code: string;
};

export type ValidationWarning = {
  path: string;
  message: string;
  code: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
};

export type LazyLoadEntry = {
  type: string;
  import: ComponentImportSchema;
  webPreview: boolean;
};

export type LazyLoadPlan = {
  components: LazyLoadEntry[];
};

const DEFAULT_MAX_DEPTH = 12;
const DEFAULT_MAX_NODES = 120;

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export type ValidateScreenSchemaOptions = {
  maxDepth?: number;
  maxNodes?: number;
  requireWebPreview?: boolean;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasDangerousKeys(
  value: Record<string, unknown>,
  path: string
): ValidationError[] {
  const errors: ValidationError[] = [];
  for (const key of Object.keys(value)) {
    if (DANGEROUS_KEYS.has(key)) {
      errors.push({
        path,
        message: `Dangerous key "${key}" is not allowed`,
        code: 'dangerous_key',
      });
    }
  }
  return errors;
}

function validateChildrenRules(
  node: ComponentNode,
  path: string
): { errors: ValidationError[]; warnings: ValidationWarning[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const schema = getComponentSchema(node.type);

  if (!schema) {
    return {
      errors: [
        {
          path,
          message: `Unknown component type "${node.type}"`,
          code: 'unknown_component',
        },
      ],
      warnings,
    };
  }

  const children = node.children;
  const hasChildren =
    children !== undefined &&
    !(typeof children === 'string' && children.length === 0) &&
    !(Array.isArray(children) && children.length === 0);

  if (!schema.children?.allowed && hasChildren) {
    errors.push({
      path,
      message: `Component "${node.type}" does not allow children`,
      code: 'children_not_allowed',
    });
    return { errors, warnings };
  }

  if (schema.children?.allowed) {
    if (typeof children === 'string') {
      if (!schema.children.stringChildAllowed && !schema.children.textAllowed) {
        errors.push({
          path: `${path}.children`,
          message: `String children not allowed on "${node.type}"`,
          code: 'invalid_children',
        });
      }
      return { errors, warnings };
    }

    if (Array.isArray(children)) {
      const count = children.length;
      if (schema.children.min !== undefined && count < schema.children.min) {
        errors.push({
          path: `${path}.children`,
          message: `"${node.type}" requires at least ${schema.children.min} children`,
          code: 'children_min',
        });
      }
      if (schema.children.max !== undefined && count > schema.children.max) {
        errors.push({
          path: `${path}.children`,
          message: `"${node.type}" allows at most ${schema.children.max} children`,
          code: 'children_max',
        });
      }
    } else if (children !== undefined) {
      errors.push({
        path: `${path}.children`,
        message: 'Children must be a string or array of ComponentNode',
        code: 'invalid_children_shape',
      });
    }
  }

  return { errors, warnings };
}

function walkNode(
  node: ComponentNode,
  path: string,
  depth: number,
  state: {
    nodeCount: number;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    types: Set<string>;
  },
  options: Required<ValidateScreenSchemaOptions>
): number {
  if (depth > options.maxDepth) {
    state.errors.push({
      path,
      message: `Exceeded max depth of ${options.maxDepth}`,
      code: 'max_depth',
    });
    return state.nodeCount;
  }

  state.nodeCount += 1;
  if (state.nodeCount > options.maxNodes) {
    state.errors.push({
      path,
      message: `Exceeded max node count of ${options.maxNodes}`,
      code: 'max_nodes',
    });
    return state.nodeCount;
  }

  if (!node.type || typeof node.type !== 'string') {
    state.errors.push({
      path,
      message: 'Component node must have a string type',
      code: 'missing_type',
    });
    return state.nodeCount;
  }

  state.types.add(node.type);

  const schema = getComponentSchema(node.type);
  if (!schema) {
    state.errors.push({
      path,
      message: `Unknown component type "${node.type}"`,
      code: 'unknown_component',
    });
    return state.nodeCount;
  }

  if (options.requireWebPreview && !schema.support.webPreview) {
    state.errors.push({
      path,
      message: `Component "${node.type}" is not web-preview safe: ${schema.support.reason ?? 'native-only'}`,
      code: 'web_preview_unsupported',
    });
  }

  if (node.props !== undefined) {
    if (!isPlainObject(node.props)) {
      state.errors.push({
        path: `${path}.props`,
        message: 'Props must be a plain object',
        code: 'invalid_props',
      });
    } else {
      state.errors.push(...hasDangerousKeys(node.props, `${path}.props`));
      const propResult = validateComponentProps(node.type, node.props);
      for (const message of propResult.errors) {
        state.errors.push({
          path: `${path}.props`,
          message,
          code: 'invalid_prop',
        });
      }
      for (const message of propResult.warnings) {
        state.warnings.push({
          path: `${path}.props`,
          message,
          code: 'prop_warning',
        });
      }
    }
  }

  const childRules = validateChildrenRules(node, path);
  state.errors.push(...childRules.errors);
  state.warnings.push(...childRules.warnings);

  if (typeof node.children === 'string') {
    return state.nodeCount;
  }

  if (Array.isArray(node.children)) {
    node.children.forEach((child, index) => {
      walkNode(child, `${path}.children[${index}]`, depth + 1, state, options);
    });
  }

  return state.nodeCount;
}

export function validateComponentNode(
  node: ComponentNode,
  options: ValidateScreenSchemaOptions = {}
): ValidationResult {
  const resolved: Required<ValidateScreenSchemaOptions> = {
    maxDepth: options.maxDepth ?? DEFAULT_MAX_DEPTH,
    maxNodes: options.maxNodes ?? DEFAULT_MAX_NODES,
    requireWebPreview: options.requireWebPreview ?? false,
  };

  const state = {
    nodeCount: 0,
    errors: [] as ValidationError[],
    warnings: [] as ValidationWarning[],
    types: new Set<string>(),
  };

  walkNode(node, 'root', 1, state, resolved);

  return {
    valid: state.errors.length === 0,
    errors: state.errors,
    warnings: state.warnings,
  };
}

export function validateScreenSchema(
  schema: unknown,
  options: ValidateScreenSchemaOptions = {}
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  if (!isPlainObject(schema)) {
    return {
      valid: false,
      errors: [
        {
          path: '',
          message: 'ScreenSchema must be a plain object',
          code: 'invalid_schema',
        },
      ],
      warnings,
    };
  }

  if (typeof schema.id !== 'string' || schema.id.length === 0) {
    errors.push({
      path: 'id',
      message: 'ScreenSchema.id must be a non-empty string',
      code: 'missing_id',
    });
  }

  if (typeof schema.name !== 'string' || schema.name.length === 0) {
    errors.push({
      path: 'name',
      message: 'ScreenSchema.name must be a non-empty string',
      code: 'missing_name',
    });
  }

  if (schema.version !== SCREEN_SCHEMA_VERSION) {
    errors.push({
      path: 'version',
      message: `ScreenSchema.version must be "${SCREEN_SCHEMA_VERSION}"`,
      code: 'invalid_version',
    });
  }

  if (!isPlainObject(schema.root)) {
    errors.push({
      path: 'root',
      message: 'ScreenSchema.root must be a ComponentNode object',
      code: 'missing_root',
    });
    return { valid: false, errors, warnings };
  }

  const rootResult = validateComponentNode(
    schema.root as ComponentNode,
    options
  );

  return {
    valid: errors.length === 0 && rootResult.valid,
    errors: [...errors, ...rootResult.errors],
    warnings: [...warnings, ...rootResult.warnings],
  };
}

export function getSchemaComponentTypes(schema: ScreenSchema): string[] {
  const types = new Set<string>();

  const visit = (node: ComponentNode) => {
    types.add(node.type);
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  };

  visit(schema.root);
  return [...types];
}

export function getLazyLoadPlan(schema: ScreenSchema): LazyLoadPlan {
  const types = getSchemaComponentTypes(schema);
  const components: LazyLoadEntry[] = [];

  for (const type of types) {
    const componentSchema = getComponentSchema(type);
    if (!componentSchema) continue;
    components.push({
      type,
      import: componentSchema.import,
      webPreview: componentSchema.support.webPreview,
    });
  }

  return { components };
}
