'use client';

import { ThemeProvider, useTheme } from '@truongdq01/headless';
import { useMemo, useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { RendererAction } from '../../../../../packages/renderer/src/types';
import { RenderSchemaNode } from '../../../../../packages/renderer/src/render-node';
import { previewComponentMap } from '@/lib/preview-component-map';
import type { BuilderState } from '@/lib/builder-state';

type PreviewColorScheme = 'light' | 'dark';

type PreviewPanelProps = {
  state: BuilderState;
};

function PreviewCanvas({ children }: { children: ReactNode }) {
  const { tokens } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        minHeight: '100%',
        backgroundColor: tokens.color.bg.default,
        paddingTop: tokens.spacing[4],
        paddingBottom: tokens.spacing[6],
      }}
    >
      {children}
    </View>
  );
}

export function PreviewPanel({ state }: PreviewPanelProps) {
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [colorScheme, setColorScheme] = useState<PreviewColorScheme>('light');

  const actions = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    for (const action of state.schema.actions ?? []) {
      handlers[action.id] = () => {
        setActionLog((prev) => [
          `${new Date().toLocaleTimeString()} — ${action.id}`,
          ...prev.slice(0, 4),
        ]);
      };
    }
    return handlers;
  }, [state.schema.actions]);

  const onAction = (action: RendererAction) => {
    setActionLog((prev) => [
      `${new Date().toLocaleTimeString()} — ${action.name}`,
      ...prev.slice(0, 4),
    ]);
    actions[action.name]?.();
  };

  return (
    <section className="panel preview-panel">
      <header className="panel-header">
        <div>
          <h2>Preview</h2>
          <p className="panel-subtitle">React Native Web · RNUI components</p>
        </div>
        <div className="preview-header-actions">
          <fieldset className="theme-toggle" aria-label="Preview color scheme">
            <button
              type="button"
              className={
                colorScheme === 'light'
                  ? 'theme-toggle-btn active'
                  : 'theme-toggle-btn'
              }
              aria-pressed={colorScheme === 'light'}
              onClick={() => setColorScheme('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={
                colorScheme === 'dark'
                  ? 'theme-toggle-btn active'
                  : 'theme-toggle-btn'
              }
              aria-pressed={colorScheme === 'dark'}
              onClick={() => setColorScheme('dark')}
            >
              Dark
            </button>
          </fieldset>
          <span
            className={`status-pill ${state.validation.valid ? 'ok' : 'error'}`}
          >
            {state.validation.valid ? 'Valid schema' : 'Invalid schema'}
          </span>
        </div>
      </header>

      <details className="preview-how-it-works">
        <summary>Preview render stack &amp; limits</summary>
        <ol>
          <li>
            <strong>Schema JSON</strong> — ScreenSchema mô tả cây component
          </li>
          <li>
            <strong>@truongdq01/renderer</strong> — map node → props RNUI
          </li>
          <li>
            <strong>@truongdq01/ui + react-native-web</strong> — render trong
            browser (không phải native view)
          </li>
        </ol>
        <p>
          Đây là <strong>xấp xỉ web</strong>, không phải simulator iOS/Android.
          Font, shadow, gesture khác native. UI thật: <code>bun run demo</code>{' '}
          (Expo example app).
        </p>
        <p className="preview-how-note">
          Buttons &amp; toggles dùng mock gesture — đủ để demo; input gõ được
          khi schema không khóa <code>value</code> (preview tự mở khóa).
        </p>
      </details>

      <p className="preview-disclaimer">
        Web preview approximates native rendering. Verify final UI in the
        iOS/Android example app.
      </p>

      <div className="preview-frame">
        <div className="phone-shell" data-preview-theme={colorScheme}>
          <div className="phone-island" aria-hidden />
          <div className="phone-screen" data-preview-theme={colorScheme}>
            <div className="phone-screen-inner">
              {state.validation.valid ? (
                <ThemeProvider
                  colorScheme={colorScheme}
                  withGestureRoot={false}
                >
                  <PreviewCanvas>
                    <RenderSchemaNode
                      node={state.schema.root}
                      componentMap={previewComponentMap}
                      actions={actions}
                      onAction={onAction}
                    />
                  </PreviewCanvas>
                </ThemeProvider>
              ) : (
                <div className="preview-error-panel">
                  <p className="preview-error-title">
                    Schema validation failed
                  </p>
                  <p className="muted">
                    Fix errors in the Validation tab or use Repair schema.
                  </p>
                  <ul className="validation-list">
                    {state.validation.errors.slice(0, 6).map((error) => (
                      <li key={`${error.path}-${error.message}`}>
                        <code>{error.path || 'root'}</code>
                        <span>{error.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {actionLog.length > 0 ? (
        <footer className="action-log">
          <strong>Actions</strong>
          <ul>
            {actionLog.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </footer>
      ) : null}
    </section>
  );
}
