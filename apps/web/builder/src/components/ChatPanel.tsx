import { useState } from 'react';
import {
  createMessage,
  generateMockSchema,
} from '../lib/mock-ai';
import { exampleSchemaList } from '../lib/example-schemas';
import type { BuilderState } from '../lib/builder-state';
import { applySchemaUpdate } from '../lib/builder-state';

type ChatPanelProps = {
  state: BuilderState;
  onStateChange: (next: BuilderState) => void;
};

export function ChatPanel({ state, onStateChange }: ChatPanelProps) {
  const [input, setInput] = useState('');

  const runPrompt = (prompt: string) => {
    if (!prompt.trim() || state.isGenerating) return;

    const userMessage = createMessage('user', prompt.trim());
    onStateChange({ ...state, isGenerating: true, messages: [...state.messages, userMessage] });

    window.setTimeout(() => {
      const result = generateMockSchema(prompt);
      const assistantMessage = createMessage('assistant', result.reply);
      onStateChange(
        applySchemaUpdate(
          {
            ...state,
            isGenerating: false,
            messages: [...state.messages, userMessage, assistantMessage],
          },
          result.schema,
          result.validation
        )
      );
    }, 350);
  };

  return (
    <section className="panel chat-panel">
      <header className="panel-header">
        <div>
          <h2>Chat</h2>
          <p className="panel-subtitle">Mock AI → ScreenSchema (no API in Phase 3C MVP)</p>
        </div>
      </header>

      <div className="preset-row">
        {exampleSchemaList.map((example) => (
          <button
            key={example.key}
            type="button"
            className="chip-button"
            onClick={() => runPrompt(`Create a ${example.label.toLowerCase()} screen`)}
            disabled={state.isGenerating}
          >
            {example.label}
          </button>
        ))}
        <button
          type="button"
          className="chip-button chip-button--warn"
          onClick={() => runPrompt('invalid schema for repair loop')}
          disabled={state.isGenerating}
        >
          Invalid demo
        </button>
      </div>

      <div className="chat-log" role="log" aria-live="polite">
        {state.messages.map((message) => (
          <article key={message.id} className={`chat-bubble chat-bubble--${message.role}`}>
            <span className="chat-role">{message.role}</span>
            <p>{message.content}</p>
          </article>
        ))}
        {state.isGenerating ? (
          <article className="chat-bubble chat-bubble--assistant">
            <span className="chat-role">assistant</span>
            <p>Generating ScreenSchema…</p>
          </article>
        ) : null}
      </div>

      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          runPrompt(input);
          setInput('');
        }}
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Describe a screen: login, settings, profile card, dashboard, form…"
          rows={3}
          disabled={state.isGenerating}
        />
        <button type="submit" disabled={state.isGenerating || input.trim().length === 0}>
          Generate schema
        </button>
      </form>
    </section>
  );
}
