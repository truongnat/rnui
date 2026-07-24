import { ThemeProvider, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { View } from 'react-native';
import { RNUISchemaRenderer } from './RNUISchemaRenderer';
import type { WebPreviewHostProps } from './types';

type PreviewCanvasProps = {
  children: React.ReactNode;
  minHeight?: number;
};

function PreviewCanvas({ children, minHeight }: PreviewCanvasProps) {
  const { tokens } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        minHeight,
        backgroundColor: tokens.color.bg.default,
      }}
    >
      {children}
    </View>
  );
}

/**
 * Root host for react-native-web preview panes.
 * Requires bundler aliases: react-native → react-native-web.
 *
 * Defaults to light color scheme so web builder previews stay readable
 * regardless of OS dark mode (`ThemeProvider` otherwise follows system).
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
  colorScheme = 'light',
  fallbackComponent,
  renderUnsupported,
}: WebPreviewHostProps): React.ReactElement {
  return (
    <ThemeProvider colorScheme={colorScheme} withGestureRoot={withGestureRoot}>
      <PreviewCanvas minHeight={minHeight}>
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
      </PreviewCanvas>
    </ThemeProvider>
  );
}
