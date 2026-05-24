import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { View } from 'react-native';
import { RNUISchemaRenderer } from './RNUISchemaRenderer';
import type { WebPreviewHostProps } from './types';

/**
 * Root host for react-native-web preview panes.
 * Requires bundler aliases: react-native → react-native-web.
 */
export function WebPreviewHost({
  schema,
  componentMap,
  actions,
  onAction,
  requireWebPreview = true,
  onValidationError,
  minHeight,
  withGestureRoot = false,
  fallbackComponent,
  renderUnsupported,
}: WebPreviewHostProps): React.ReactElement {
  return (
    <ThemeProvider withGestureRoot={withGestureRoot}>
      <View
        style={{ flex: 1, ...(minHeight !== undefined ? { minHeight } : null) }}
      >
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
    </ThemeProvider>
  );
}
