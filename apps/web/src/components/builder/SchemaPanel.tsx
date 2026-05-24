'use client';

import { copyText } from '@/lib/clipboard';
import {
  applyInvalidJson,
  applySchemaUpdate,
  exportTsxFromState,
  parseSchemaText,
  type BuilderState,
  type BuilderTab,
} from '@/lib/builder-state';

type SchemaPanelProps = {
  state: BuilderState;
  onStateChange: (next: BuilderState) => void;
};

const TABS: Array<{ id: BuilderTab; label: string }> = [
  { id: 'schema', label: 'Schema JSON' },
  { id: 'validation', label: 'Validation' },
  { id: 'tsx', label: 'Export TSX' },
  { id: 'lazy', label: 'Lazy-load plan' },
];

export function SchemaPanel({ state, onStateChange }: SchemaPanelProps) {
  const setTab = (activeTab: BuilderTab) => {
    onStateChange({ ...state, activeTab });
  };

  const revalidate = () => {
    try {
      const schema = parseSchemaText(state.schemaText);
      onStateChange(applySchemaUpdate(state, schema));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON';
      onStateChange(applyInvalidJson(state, message));
    }
  };

  const exportTsx = () => {
    const tsx = exportTsxFromState(state);
    onStateChange({ ...state, tsx, activeTab: 'tsx' });
  };

  const copySchema = async () => {
    const ok = await copyText(state.schemaText);
    onStateChange({
      ...state,
      copyNotice: ok ? 'Schema copied to clipboard.' : 'Clipboard unavailable.',
    });
  };

  const copyTsx = async () => {
    const ok = await copyText(state.tsx);
    onStateChange({
      ...state,
      copyNotice: ok ? 'TSX copied to clipboard.' : 'Clipboard unavailable.',
    });
  };

  return (
    <section className="panel schema-panel">
      <header className="panel-header">
        <div>
          <h2>Schema & Code</h2>
          <p className="panel-subtitle">Edit JSON, validate, export TSX</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={revalidate}
          >
            Validate
          </button>
          <button type="button" className="primary-button" onClick={exportTsx}>
            Export TSX
          </button>
        </div>
      </header>

      {state.copyNotice ? (
        <p className="copy-notice" role="status">
          {state.copyNotice}
        </p>
      ) : null}

      <div className="tab-row" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={state.activeTab === tab.id}
            className={state.activeTab === tab.id ? 'tab active' : 'tab'}
            onClick={() => setTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {state.activeTab === 'schema' ? (
        <>
          <textarea
            className="code-editor"
            value={state.schemaText}
            onChange={(event) =>
              onStateChange({
                ...state,
                schemaText: event.target.value,
                copyNotice: null,
              })
            }
            spellCheck={false}
          />
          <div className="panel-footer-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => void copySchema()}
            >
              Copy schema
            </button>
          </div>
        </>
      ) : null}

      {state.activeTab === 'validation' ? (
        <div className="validation-panel">
          <p
            className={`validation-summary ${state.validation.valid ? 'ok' : 'error'}`}
          >
            {state.validation.valid
              ? 'Schema is valid for web preview.'
              : `${state.validation.errors.length} validation error(s).`}
          </p>
          {state.validation.errors.length > 0 ? (
            <ul className="validation-list">
              {state.validation.errors.map((error) => (
                <li key={`${error.path}-${error.code}-${error.message}`}>
                  <code>{error.path || 'root'}</code>
                  <span>{error.message}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {state.validation.warnings.length > 0 ? (
            <>
              <h3>Warnings</h3>
              <ul className="validation-list validation-list--warn">
                {state.validation.warnings.map((warning) => (
                  <li
                    key={`${warning.path}-${warning.code}-${warning.message}`}
                  >
                    <code>{warning.path || 'root'}</code>
                    <span>{warning.message}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}

      {state.activeTab === 'tsx' ? (
        <>
          <textarea
            className="code-editor"
            value={state.tsx}
            readOnly
            spellCheck={false}
          />
          <div className="panel-footer-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => void copyTsx()}
            >
              Copy TSX
            </button>
          </div>
        </>
      ) : null}

      {state.activeTab === 'lazy' ? (
        <div className="lazy-panel">
          {!state.lazyPlan ? (
            <p className="muted">
              Fix validation errors to see the lazy-load plan.
            </p>
          ) : (
            <table className="lazy-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>lazyKey</th>
                  <th>import</th>
                  <th>webPreview</th>
                </tr>
              </thead>
              <tbody>
                {state.lazyPlan.components.map((entry) => (
                  <tr key={entry.type}>
                    <td>{entry.type}</td>
                    <td>
                      <code>{entry.import.lazyKey}</code>
                    </td>
                    <td>
                      <code>{entry.import.named}</code>
                    </td>
                    <td>{entry.webPreview ? 'yes' : 'no'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : null}
    </section>
  );
}
