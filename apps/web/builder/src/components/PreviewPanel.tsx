import { useMemo, useState } from 'react';
import { ThemeProvider } from '../../../../../packages/headless/src/theme/provider';
import type { SchemaActionHandlers } from '@truongdq01/renderer';
import { RenderSchemaNode } from '../../../../../packages/renderer/src/render-node';
import { View } from 'react-native';
import type { BuilderState } from '../lib/builder-state';
import { previewComponentMap } from '../lib/preview-component-map';

type PreviewPanelProps = {
  state: BuilderState;
};

export function PreviewPanel({ state }: PreviewPanelProps) {
  const [actionLog, setActionLog] = useState<string[]>([]);

  const actions = useMemo<SchemaActionHandlers>(() => {
    const handlers: SchemaActionHandlers = {};
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

  return (
    <section className="panel preview-panel">
      <header className="panel-header">
        <div>
          <h2>Preview</h2>
          <p className="panel-subtitle">react-native-web via @truongdq01/renderer</p>
        </div>
        <span
          className={`status-pill ${state.validation.valid ? 'ok' : 'error'}`}
        >
          {state.validation.valid ? 'Valid schema' : 'Invalid schema'}
        </span>
      </header>

      <div className="preview-frame">
        {state.validation.valid ? (
          <ThemeProvider withGestureRoot={false}>
            <View style={{ flex: 1, minHeight: 520 }}>
              <RenderSchemaNode
                node={state.schema.root}
                componentMap={previewComponentMap}
                actions={actions}
              />
            </View>
          </ThemeProvider>
        ) : (
          <div className="preview-placeholder">
            <p>Fix validation errors to enable live preview.</p>
            <p className="muted">Open the Validation tab in the Schema panel.</p>
          </div>
        )}
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
