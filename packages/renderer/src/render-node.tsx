import React from 'react';
import { Text, View } from 'react-native';
import { getComponentSchema } from '@truongdq01/component-schema';
import {
  getUnsupportedReason,
  isNativeOnlyType,
  isUnknownComponentType,
  resolveNodeRender,
  shouldWrapStringChild,
} from './resolve-props';
import type { RenderSchemaNodeProps, UnsupportedComponentInfo } from './types';

function DefaultUnsupported({
  type,
  reason,
}: UnsupportedComponentInfo): React.ReactElement {
  const detail = reason ? `: ${reason}` : '';
  return (
    <View
      accessibilityRole="text"
      style={{
        padding: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 8,
        opacity: 0.7,
      }}
    >
      <Text>{`Unsupported in web preview: ${type}${detail}`}</Text>
    </View>
  );
}

function NativeOnlyPlaceholder({
  type,
  reason,
  renderUnsupported,
}: {
  type: string;
  reason?: string;
  renderUnsupported?: RenderSchemaNodeProps['renderUnsupported'];
}) {
  const info: UnsupportedComponentInfo = { type, reason };
  if (renderUnsupported) {
    return renderUnsupported(info);
  }
  return <DefaultUnsupported {...info} />;
}

function renderStringChild(
  type: string,
  text: string,
  componentMap: RenderSchemaNodeProps['componentMap'],
  path: string
): React.ReactElement {
  if (!shouldWrapStringChild(type)) {
    const Component = componentMap[type] ?? componentMap.Typography;
    return React.createElement(Component, { key: path }, text);
  }

  const Typography = componentMap.Typography;
  if (Typography) {
    return React.createElement(
      Typography,
      { variant: 'body2', key: `${path}.text` },
      text
    );
  }

  return <Text key={`${path}.text`}>{text}</Text>;
}

export function RenderSchemaNode({
  node,
  componentMap,
  actions,
  onAction,
  path = 'root',
  renderUnsupported,
  fallbackComponent: FallbackComponent,
}: RenderSchemaNodeProps): React.ReactElement | null {
  if (isNativeOnlyType(node.type)) {
    return (
      <NativeOnlyPlaceholder
        type={node.type}
        reason={getUnsupportedReason(node.type)}
        renderUnsupported={renderUnsupported}
      />
    );
  }

  if (isUnknownComponentType(node.type)) {
    const info: UnsupportedComponentInfo = {
      type: node.type,
      nodeId: node.id,
      reason: 'Unknown component type',
    };
    if (renderUnsupported) {
      return renderUnsupported(info);
    }
    if (FallbackComponent) {
      return <FallbackComponent {...info} />;
    }
    return <DefaultUnsupported {...info} />;
  }

  const actionContext = { actions, onAction, nodeId: node.id };
  const { componentType, props, children } = resolveNodeRender(
    node,
    actionContext
  );
  const Component = componentMap[node.type] ?? componentMap[componentType];

  if (!Component) {
    const schema = getComponentSchema(node.type);
    const info: UnsupportedComponentInfo = {
      type: node.type,
      nodeId: node.id,
      reason: schema
        ? `No component map entry for "${node.type}"`
        : 'Missing component map entry',
    };
    if (renderUnsupported) {
      return renderUnsupported(info);
    }
    return <DefaultUnsupported {...info} />;
  }

  if (typeof children === 'string') {
    if (shouldWrapStringChild(node.type)) {
      return React.createElement(
        Component,
        { ...props, key: path },
        renderStringChild(node.type, children, componentMap, path)
      );
    }
    return React.createElement(Component, { ...props, key: path }, children);
  }

  if (Array.isArray(children)) {
    const childElements = children.map((child, index) => (
      <RenderSchemaNode
        key={child.id ?? `${path}.children[${index}]`}
        node={child}
        componentMap={componentMap}
        actions={actions}
        onAction={onAction}
        path={`${path}.children[${index}]`}
        renderUnsupported={renderUnsupported}
        fallbackComponent={FallbackComponent}
      />
    ));
    return React.createElement(
      Component,
      { ...props, key: path },
      ...childElements
    );
  }

  return React.createElement(Component, { ...props, key: path });
}

/** Alias for RenderSchemaNode — render a single schema node. */
export const renderNode = RenderSchemaNode;
