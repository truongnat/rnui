import { getComponentSchema } from '@truongdq01/component-schema';
import type { ComponentNode } from '@truongdq01/component-schema';
import { guardNodeProps, resolveActionName } from './propGuards';
import { resolveScreenPadding } from './token-map';
import type { RendererActionContext, SchemaActionHandlers } from './types';

export type ResolvedNodeRender = {
  componentType: string;
  props: Record<string, unknown>;
  children: ComponentNode[] | string | undefined;
  propWarnings: string[];
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
  context: RendererActionContext | undefined
): Record<string, unknown> {
  if (type !== 'Button') return props;

  const actionName = resolveActionName(props.action);
  if (!actionName) return props;

  const { action: _action, ...rest } = props;

  const onPress = () => {
    context?.onAction?.({
      name: actionName,
      sourceNodeId: context.nodeId,
    });
    context?.actions?.[actionName]?.();
  };

  return { ...rest, onPress };
}

function extractChildrenFromProps(props: Record<string, unknown>): {
  props: Record<string, unknown>;
  textChild: string | undefined;
} {
  if (typeof props.children === 'string') {
    const { children, ...rest } = props;
    return { props: rest, textChild: children };
  }
  return { props, textChild: undefined };
}

export function resolveNodeRender(
  node: ComponentNode,
  context?: RendererActionContext
): ResolvedNodeRender {
  const schemaType = node.type;
  const guarded = guardNodeProps(schemaType, node.props);
  const rawProps = guarded.safeProps;
  let children = node.children;

  const withActions = applyActionProps(schemaType, rawProps, {
    ...context,
    nodeId: node.id,
  });
  const { props: propsWithoutTextChild, textChild } =
    extractChildrenFromProps(withActions);

  if (textChild !== undefined && children === undefined) {
    children = textChild;
  }

  if (
    schemaType === 'Button' &&
    typeof propsWithoutTextChild.label !== 'string' &&
    typeof children === 'string'
  ) {
    propsWithoutTextChild.label = children;
    children = undefined;
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
      propWarnings: guarded.warnings,
    };
  }

  const componentSchema = getComponentSchema(schemaType);
  const resolvedType = componentSchema?.import.named ?? schemaType;

  return {
    componentType: resolvedType,
    props: stripRendererOnlyProps(schemaType, propsWithoutTextChild),
    children,
    propWarnings: guarded.warnings,
  };
}

export function isNativeOnlyType(type: string): boolean {
  const schema = getComponentSchema(type);
  return schema !== undefined && !schema.support.webPreview;
}

export function getUnsupportedReason(type: string): string | undefined {
  return getComponentSchema(type)?.support.reason;
}

export function isUnknownComponentType(type: string): boolean {
  return getComponentSchema(type) === undefined;
}

/** Layout nodes must not render raw strings — wrap in Typography instead. */
export function shouldWrapStringChild(type: string): boolean {
  const schema = getComponentSchema(type);
  if (!schema) return true;
  if (type === 'Typography' || type === 'Button') return false;
  if (schema.children?.stringChildAllowed === true) return false;
  if (schema.children?.textAllowed === true) return false;
  return true;
}

/** @deprecated Use RendererActionContext */
export type LegacyActionHandlers = SchemaActionHandlers;
