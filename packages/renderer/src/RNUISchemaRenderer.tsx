import React, { useMemo } from 'react';
import { prepareScreenRender } from './component-loader';
import { createDefaultComponentMap } from './componentMap';
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

  // Callers inject registry kit components; structural aliases (Screen →
  // Stack/View) are filled in. No bundled UI package — pass a componentMap.
  const resolvedMap = useMemo(
    () => createDefaultComponentMap(componentMap ?? {}),
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
