'use client';

import { useMemo, useState } from 'react';
import { ThemeProvider } from '@truongdq01/headless';
import type { RendererAction } from '../../../../../packages/renderer/src/types';
import { RenderSchemaNode } from '../../../../../packages/renderer/src/render-node';
import { previewComponentMap } from '@/lib/preview-component-map';
import type { BuilderState } from '@/lib/builder-state';

type PreviewPanelProps = {
  state: BuilderState;
};

export function PreviewPanel({ state }: PreviewPanelProps) {
  const [actionLog, setActionLog] = useState<string[]>([]);

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
          <p className="panel-subtitle">React Native Web preview</p>
        </div>
        <span
          className={`status-pill ${state.validation.valid ? 'ok' : 'error'}`}
        >
          {state.validation.valid ? 'Valid schema' : 'Invalid schema'}
        </span>
      </header>

      <p className="preview-disclaimer">
        Web preview approximates React Native rendering. Verify final UI in the
        iOS/Android example app.
      </p>

      <div className="phone-shell">
        <div className="phone-notch" aria-hidden />
        <div className="phone-screen">
          {state.validation.valid ? (
            <ThemeProvider withGestureRoot={false}>
              <RenderSchemaNode
                node={state.schema.root}
                componentMap={previewComponentMap}
                actions={actions}
                onAction={onAction}
              />
            </ThemeProvider>
          ) : (
            <div className="preview-placeholder">
              <p>Schema validation failed.</p>
              <p className="muted">
                Fix errors in the Validation tab or use Repair schema.
              </p>
              <ul className="validation-list">
                {state.validation.errors.slice(0, 4).map((error) => (
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
