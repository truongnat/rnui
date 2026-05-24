import React from 'react';
import { Text, View } from 'react-native';
import { isNativeOnlyType, resolveNodeRender } from './resolve-props';
import type { RenderSchemaNodeProps } from './types';

function NativeOnlyPlaceholder({ type }: { type: string }) {
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
      <Text>{`${type} is native-only and not available in web preview yet.`}</Text>
    </View>
  );
}

export function RenderSchemaNode({
  node,
  componentMap,
  actions,
  path = 'root',
}: RenderSchemaNodeProps): React.ReactElement | null {
  if (isNativeOnlyType(node.type)) {
    return <NativeOnlyPlaceholder type={node.type} />;
  }

  const { componentType, props, children } = resolveNodeRender(node, actions);
  const Component = componentMap[node.type] ?? componentMap[componentType];

  if (!Component) {
    return (
      <View accessibilityRole="alert">
        <Text>{`Missing component map entry for "${node.type}"`}</Text>
      </View>
    );
  }

  if (typeof children === 'string') {
    return React.createElement(Component, { ...props, key: path }, children);
  }

  if (Array.isArray(children)) {
    const childElements = children.map((child, index) => (
      <RenderSchemaNode
        key={child.id ?? `${path}.children[${index}]`}
        node={child}
        componentMap={componentMap}
        actions={actions}
        path={`${path}.children[${index}]`}
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
