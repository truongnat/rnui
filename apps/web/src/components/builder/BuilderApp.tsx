'use client';

import { useState } from 'react';
import { AIProviderContext } from '@/lib/ai/context';
import { createInitialState } from '@/lib/builder-state';
import { ChatPanel } from './ChatPanel';
import { PreviewPanel } from './PreviewPanel';
import { SchemaPanel } from './SchemaPanel';

export function BuilderApp() {
  const [state, setState] = useState(createInitialState);

  return (
    <AIProviderContext>
      <div className="builder-app">
        <header className="builder-topbar">
          <div>
            <p className="eyebrow">RNUI</p>
            <h1>Screen Builder</h1>
          </div>
          <div className="topbar-actions">
            <p className="topbar-note">
              Phase 3C — mock AI, RN Web preview, TSX export
            </p>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setState(createInitialState())}
            >
              Reset
            </button>
          </div>
        </header>

        <main className="builder-grid">
          <ChatPanel state={state} onStateChange={setState} />
          <PreviewPanel state={state} />
          <SchemaPanel state={state} onStateChange={setState} />
        </main>
      </div>
    </AIProviderContext>
  );
}
