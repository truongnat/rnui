import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import * as UI from '@truongdq01/ui';
import {
  createDefaultComponentMap,
  prepareScreenRender,
} from './component-loader';
import { RenderSchemaNode } from './render-node';
import type { ScreenSchemaRendererProps } from './types';

function ValidationErrors({ errors }: { errors: string[] }) {
  return (
    <View accessibilityRole="alert" style={{ padding: 16, gap: 8 }}>
      {errors.map((message) => (
        <Text key={message}>{message}</Text>
      ))}
    </View>
  );
}

export function ScreenSchemaRenderer({
  schema,
  componentMap,
  actions,
  requireWebPreview = true,
  onValidationError,
}: ScreenSchemaRendererProps): React.ReactElement | null {
  const prepared = useMemo(
    () => prepareScreenRender(schema, { requireWebPreview }),
    [schema, requireWebPreview]
  );

  const resolvedMap = useMemo(
    () => componentMap ?? createDefaultComponentMap(UI),
    [componentMap]
  );

  if (!prepared.valid || !prepared.schema) {
    onValidationError?.(prepared.errors);
    return <ValidationErrors errors={prepared.errors} />;
  }

  return (
    <RenderSchemaNode
      node={prepared.schema.root}
      componentMap={resolvedMap}
      actions={actions}
    />
  );
}
