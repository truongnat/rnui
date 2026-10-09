import type React from 'react';
import { View } from 'react-native';
import { RNUISchemaRenderer } from './RNUISchemaRenderer';
import type { WebPreviewHostProps } from './types';

/**
 * Root host for react-native-web preview panes.
 * Requires bundler aliases: react-native → react-native-web.
 *
 * The registry kit is styled via CSS variables (`cn()`/tv()), so no theme
 * provider wraps the tree — `backgroundColor` applies to the canvas only.
 */
export function WebPreviewHost({
  schema,
  componentMap,
  actions,
  onAction,
  requireWebPreview = true,
  onValidationError,
  minHeight,
  backgroundColor = '#ffffff',
  fallbackComponent,
  renderUnsupported,
}: WebPreviewHostProps): React.ReactElement {
  return (
    <View style={{ flex: 1, minHeight, backgroundColor }}>
      <RNUISchemaRenderer
        schema={schema}
        componentMap={componentMap}
        actions={actions}
        onAction={onAction}
        requireWebPreview={requireWebPreview}
        onValidationError={onValidationError}
        fallbackComponent={fallbackComponent}
        renderUnsupported={renderUnsupported}
      />
    </View>
  );
}
