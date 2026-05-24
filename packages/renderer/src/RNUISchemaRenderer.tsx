import React, { useMemo } from 'react';
import * as UI from '@truongdq01/ui';
import {
  createDefaultComponentMap,
  prepareScreenRender,
} from './component-loader';
import { renderNode } from './render-node';
import { SchemaValidationPanel } from './validation-panel';
import type { RNUISchemaRendererProps } from './types';

export function RNUISchemaRenderer({
  schema,
  mode = 'preview',
  strict: _strict,
  componentMap,
  actions,
  onAction,
  requireWebPreview = true,
  onValidationError,
  fallbackComponent,
  renderUnsupported,
}: RNUISchemaRendererProps): React.ReactElement | null {
  const prepared = useMemo(
    () => prepareScreenRender(schema, { requireWebPreview }),
    [schema, requireWebPreview]
  );

  const resolvedMap = useMemo(
    () => componentMap ?? createDefaultComponentMap(UI),
    [componentMap]
  );

  if (mode === 'export') {
    return null;
  }

  if (!prepared.valid || !prepared.schema) {
    onValidationError?.(prepared.errors);
    return (
      <SchemaValidationPanel
        title="ScreenSchema validation failed"
        errors={prepared.errors}
        warnings={prepared.warnings}
      />
    );
  }

  return renderNode({
    node: prepared.schema.root,
    componentMap: resolvedMap,
    actions,
    onAction,
    fallbackComponent,
    renderUnsupported,
  });
}

export function renderSchemaToElement(
  schema: RNUISchemaRendererProps['schema'],
  options: Omit<RNUISchemaRendererProps, 'schema'> = {}
): React.ReactElement | null {
  return React.createElement(RNUISchemaRenderer, { schema, ...options });
}

/** @deprecated Use RNUISchemaRenderer */
export function ScreenSchemaRenderer(
  props: Omit<RNUISchemaRendererProps, 'mode'> & {
    onValidationError?: (errors: string[]) => void;
  }
): React.ReactElement | null {
  return (
    <RNUISchemaRenderer
      schema={props.schema}
      componentMap={props.componentMap}
      actions={props.actions}
      onAction={props.onAction}
      requireWebPreview={props.requireWebPreview}
      onValidationError={props.onValidationError}
      fallbackComponent={props.fallbackComponent}
      renderUnsupported={props.renderUnsupported}
    />
  );
}
