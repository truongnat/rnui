import { validateSchemaDraft } from '../lib/mock-ai';
import {
  applySchemaUpdate,
  parseSchemaText,
  type BuilderState,
  type BuilderTab,
} from '../lib/builder-state';

type SchemaPanelProps = {
  state: BuilderState;
  onStateChange: (next: BuilderState) => void;
};

const TABS: Array<{ id: BuilderTab; label: string }> = [
  { id: 'schema', label: 'Schema JSON' },
  { id: 'validation', label: 'Validation' },
  { id: 'tsx', label: 'TSX export' },
];

export function SchemaPanel({ state, onStateChange }: SchemaPanelProps) {
  const setTab = (activeTab: BuilderTab) => {
    onStateChange({ ...state, activeTab });
  };

  const revalidate = () => {
    try {
      const schema = parseSchemaText(state.schemaText);
      const validation = validateSchemaDraft(schema, true);
      onStateChange(applySchemaUpdate(state, schema, validation));
    } catch (error) {
      onStateChange({
        ...state,
        activeTab: 'validation',
        validation: {
          valid: false,
          errors: [
            {
              path: 'schemaText',
              message: error instanceof Error ? error.message : 'Invalid JSON',
              code: 'invalid_json',
            },
          ],
          warnings: [],
        },
      });
    }
  };

  return (
    <section className="panel schema-panel">
      <header className="panel-header">
        <div>
          <h2>Schema & Code</h2>
          <p className="panel-subtitle">Edit JSON, validate, export TSX</p>
        </div>
        <button type="button" className="primary-button" onClick={revalidate}>
          Validate
        </button>
      </header>

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
        <textarea
          className="code-editor"
          value={state.schemaText}
          onChange={(event) =>
            onStateChange({ ...state, schemaText: event.target.value })
          }
          spellCheck={false}
        />
      ) : null}

      {state.activeTab === 'validation' ? (
        <div className="validation-panel">
          <p className={`validation-summary ${state.validation.valid ? 'ok' : 'error'}`}>
            {state.validation.valid
              ? 'Schema is valid for web preview.'
              : `${state.validation.errors.length} validation error(s) — repair schema only.`}
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
                  <li key={`${warning.path}-${warning.code}-${warning.message}`}>
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
        <textarea className="code-editor" value={state.tsx} readOnly spellCheck={false} />
      ) : null}
    </section>
  );
}
