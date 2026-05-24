import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { View } from 'react-native';
import { ScreenSchemaRenderer } from './screen-renderer';
import type { WebPreviewHostProps } from './types';

/**
 * Root host for react-native-web preview panes.
 * Requires bundler aliases: react-native → react-native-web.
 */
export function WebPreviewHost({
  schema,
  componentMap,
  actions,
  requireWebPreview = true,
  onValidationError,
  minHeight,
  withGestureRoot = false,
}: WebPreviewHostProps): React.ReactElement {
  return (
    <ThemeProvider withGestureRoot={withGestureRoot}>
      <View
        style={{ flex: 1, ...(minHeight !== undefined ? { minHeight } : null) }}
      >
        <ScreenSchemaRenderer
          schema={schema}
          componentMap={componentMap}
          actions={actions}
          requireWebPreview={requireWebPreview}
          onValidationError={onValidationError}
        />
      </View>
    </ThemeProvider>
  );
}
