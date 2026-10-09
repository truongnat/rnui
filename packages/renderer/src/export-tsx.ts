import {
  getComponentSchema,
  getLazyLoadPlan,
  type ComponentNode,
  type ScreenSchema,
} from '@rnui/component-schema';
import { resolveActionName } from './propGuards';
import {
  isNativeOnlyType,
  getUnsupportedReason,
  resolveNodeRender,
} from './resolve-props';
import { resolveScreenPadding } from './token-map';
import type { ExportScreenTsxOptions } from './types';

/** Schema types whose `action` prop maps to `onPress`-style handlers in TSX. */
const ACTION_TYPES: Record<string, true> = {
  Button: true,
  Chip: true,
  ListItem: true,
  Checkbox: true,
  Switch: true,
};

const ACTION_HANDLER_PROP: Record<string, string> = {
  Button: 'onPress',
  Chip: 'onPress',
  ListItem: 'onPress',
  Checkbox: 'onCheckedChange',
  Switch: 'onCheckedChange',
};

function escapeJsxTextContent(text: string): string {
  if (/[<>&{}]/.test(text)) {
    return `{${JSON.stringify(text)}}`;
  }
  return text;
}

function escapeJsxString(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

function formatJsxValue(value: unknown): string {
  if (value === null || value === undefined) return 'undefined';
  if (typeof value === 'string') return `'${escapeJsxString(value)}'`;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (Array.isArray(value)) {
    return `[${value.map((item) => formatJsxValue(item)).join(', ')}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const inner = entries
      .map(([key, val]) => `${key}: ${formatJsxValue(val)}`)
      .join(', ');
    return `{ ${inner} }`;
  }
  return 'undefined';
}

function formatJsxProp(key: string, value: unknown): string | null {
  if (value === undefined) return null;
  if (typeof value === 'boolean') {
    return value ? key : null;
  }
  return `${key}={${formatJsxValue(value)}}`;
}

function collectActionIds(node: ComponentNode, ids: Set<string>): void {
  const actionName = resolveActionName(node.props?.action);
  if (actionName) {
    ids.add(actionName);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      collectActionIds(child, ids);
    }
  }
}

function renderNodeTsx(node: ComponentNode, indent: number): string {
  const pad = '  '.repeat(indent);

  if (isNativeOnlyType(node.type)) {
    const reason = getUnsupportedReason(node.type);
    const detail = reason ? ` — ${reason}` : '';
    return `${pad}{/* Unsupported in web preview: ${node.type}${detail} */}`;
  }

  const resolved = resolveNodeRender(node);

  if (node.type === 'Screen') {
    const padding = resolveScreenPadding(node.props?.padding);
    const spacing = node.props?.spacing ?? 'md';
    const childPad = '  '.repeat(indent + 1);
    const childLines = Array.isArray(node.children)
      ? node.children
          .map((child) => renderNodeTsx(child, indent + 1))
          .join('\n')
      : typeof node.children === 'string'
        ? `${childPad}${node.children}`
        : '';

    return `${pad}<Stack spacing="${String(spacing)}" style={{ flex: 1, padding: ${padding} }}>\n${childLines}\n${pad}</Stack>`;
  }

  const schema = getComponentSchema(node.type);
  const tag = schema?.import.named ?? node.type;
  const props = { ...resolved.props };

  const propParts: string[] = [];
  const actionName = resolveActionName(node.props?.action);
  if (ACTION_TYPES[node.type] && actionName) {
    propParts.push(
      `${ACTION_HANDLER_PROP[node.type]}={handle${toPascalCase(actionName)}}`
    );
    delete props.action;
    // resolveNodeRender already turned `action` into a runtime handler fn —
    // strip it so the schema-level handler name wins.
    delete props[ACTION_HANDLER_PROP[node.type]];
  }

  for (const [key, value] of Object.entries(props)) {
    const formatted = formatJsxProp(key, value);
    if (formatted) propParts.push(formatted);
  }

  const propString = propParts.length > 0 ? ` ${propParts.join(' ')}` : '';
  const textChild =
    typeof node.children === 'string'
      ? node.children
      : typeof resolved.children === 'string'
        ? resolved.children
        : undefined;

  if (textChild !== undefined) {
    return `${pad}<${tag}${propString}>${escapeJsxTextContent(textChild)}</${tag}>`;
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    const childLines = node.children
      .map((child) => renderNodeTsx(child, indent + 1))
      .join('\n');
    return `${pad}<${tag}${propString}>\n${childLines}\n${pad}</${tag}>`;
  }

  if (typeof props.children === 'string') {
    return `${pad}<${tag}${propString}>${escapeJsxTextContent(props.children)}</${tag}>`;
  }

  const selfClosing = propParts.length > 0 ? ` ${propParts.join(' ')}` : '';
  return `${pad}<${tag}${selfClosing} />`;
}

function toPascalCase(value: string): string {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function buildImportLines(schema: ScreenSchema): string {
  const plan = getLazyLoadPlan(schema);
  /** module specifier → set of named imports */
  const byModule = new Map<string, Set<string>>();

  for (const entry of plan.components) {
    const mod = entry.import.from;
    const named = entry.type === 'Screen' ? 'Stack' : entry.import.named;
    const bucket = byModule.get(mod) ?? new Set<string>();
    bucket.add(named);
    byModule.set(mod, bucket);
  }

  const lines = [...byModule.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([mod, named]) =>
        `import { ${[...named].sort().join(', ')} } from '${mod}';`
    );
  return lines.join('\n');
}

function buildActionHandlers(schema: ScreenSchema): string {
  const ids = new Set<string>();
  collectActionIds(schema.root, ids);

  if (schema.actions) {
    for (const action of schema.actions) {
      ids.add(action.id);
    }
  }

  if (ids.size === 0) return '';

  const handlers = [...ids]
    .sort()
    .map((id) => {
      const fnName = `handle${toPascalCase(id)}`;
      return `  const ${fnName} = () => {\n    // TODO: wire ${id}\n  };`;
    })
    .join('\n\n');

  return `\n${handlers}\n`;
}

export function exportScreenSchemaToTsx(
  schema: ScreenSchema,
  options: ExportScreenTsxOptions = {}
): string {
  const componentName = options.componentName ?? toPascalCase(schema.id);
  const includeActionHandlers = options.includeActionHandlers ?? true;

  const importLines = buildImportLines(schema);
  const actionHandlers = includeActionHandlers
    ? buildActionHandlers(schema)
    : '';

  const body = renderNodeTsx(schema.root, 2);

  return `import React from 'react';\n${importLines}\n\nexport function ${componentName}() {${actionHandlers}\n  return (\n    ${body}\n  );\n}\n`;
}

export function exportScreenSchemaToTsxFile(
  schema: ScreenSchema,
  options?: ExportScreenTsxOptions
): { filename: string; content: string } {
  const componentName = options?.componentName ?? toPascalCase(schema.id);
  return {
    filename: `${componentName}.tsx`,
    content: exportScreenSchemaToTsx(schema, options),
  };
}

/** Alias for exportScreenSchemaToTsx */
export const exportSchemaToTsx = exportScreenSchemaToTsx;
