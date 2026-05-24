import { useState } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { SchemaPanel } from './components/SchemaPanel';
import { createInitialState } from './lib/builder-state';
import './styles/builder.css';

export function App() {
  const [state, setState] = useState(createInitialState);

  return (
    <div className="builder-app">
      <header className="builder-topbar">
        <div>
          <p className="eyebrow">RNUI</p>
          <h1>Screen Builder</h1>
        </div>
        <p className="topbar-note">
          Phase 3C MVP — mock chat, live preview, schema repair loop
        </p>
      </header>

      <main className="builder-grid">
        <ChatPanel state={state} onStateChange={setState} />
        <PreviewPanel state={state} />
        <SchemaPanel state={state} onStateChange={setState} />
      </main>
    </div>
  );
}
