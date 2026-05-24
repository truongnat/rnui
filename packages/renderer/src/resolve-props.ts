import { getComponentSchema } from '@truongdq01/component-schema';
import type { ComponentNode } from '@truongdq01/component-schema';
import { resolveScreenPadding } from './token-map';
import type { SchemaActionHandlers } from './types';

export type ResolvedNodeRender = {
  componentType: string;
  props: Record<string, unknown>;
  children: ComponentNode[] | string | undefined;
};

function stripRendererOnlyProps(
  type: string,
  props: Record<string, unknown>
): Record<string, unknown> {
  const next = { ...props };
  if (type === 'Button' && 'action' in next) {
    delete next.action;
  }
  return next;
}

function applyActionProps(
  type: string,
  props: Record<string, unknown>,
  actions: SchemaActionHandlers | undefined
): Record<string, unknown> {
  if (type !== 'Button') return props;
  const actionId = props.action;
  if (typeof actionId !== 'string' || actionId.length === 0) return props;

  const { action: _action, ...rest } = props;
  if (actions?.[actionId]) {
    return { ...rest, onPress: actions[actionId] };
  }
  return rest;
}

function extractChildrenFromProps(props: Record<string, unknown>): {
  props: Record<string, unknown>;
  textChild?: string;
} {
  if (typeof props.children === 'string') {
    const { children, ...rest } = props;
    return { props: rest, textChild: children };
  }
  return { props };
}

export function resolveNodeRender(
  node: ComponentNode,
  actions?: SchemaActionHandlers
): ResolvedNodeRender {
  const schemaType = node.type;
  const rawProps = { ...(node.props ?? {}) };
  let children = node.children;

  const withActions = applyActionProps(schemaType, rawProps, actions);
  const { props: propsWithoutTextChild, textChild } =
    extractChildrenFromProps(withActions);

  if (textChild !== undefined && children === undefined) {
    children = textChild;
  }

  if (schemaType === 'Screen') {
    const padding = resolveScreenPadding(propsWithoutTextChild.padding);
    const spacing = propsWithoutTextChild.spacing;
    const { padding: _p, spacing: _s, ...rest } = propsWithoutTextChild;

    return {
      componentType: 'Stack',
      props: {
        ...rest,
        spacing: typeof spacing === 'string' ? spacing : 'md',
        style: { flex: 1, padding },
      },
      children,
    };
  }

  const componentSchema = getComponentSchema(schemaType);
  const resolvedType = componentSchema?.import.named ?? schemaType;

  return {
    componentType: resolvedType,
    props: stripRendererOnlyProps(schemaType, propsWithoutTextChild),
    children,
  };
}

export function isNativeOnlyType(type: string): boolean {
  const schema = getComponentSchema(type);
  return schema !== undefined && !schema.support.webPreview;
}
