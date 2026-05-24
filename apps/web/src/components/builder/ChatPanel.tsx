'use client';

import { useState } from 'react';
import { createMessage } from '@/lib/ai/types';
import { useAIProvider } from '@/lib/ai/context';
import { exampleSchemaList } from '@/lib/example-schemas';
import {
  applyExampleTemplate,
  applySchemaUpdate,
  type BuilderState,
} from '@/lib/builder-state';

type ChatPanelProps = {
  state: BuilderState;
  onStateChange: (next: BuilderState) => void;
};

export function ChatPanel({ state, onStateChange }: ChatPanelProps) {
  const ai = useAIProvider();
  const [input, setInput] = useState('');

  const runPrompt = async (prompt: string) => {
    if (!prompt.trim() || state.isGenerating) return;

    const userMessage = createMessage('user', prompt.trim());
    onStateChange({
      ...state,
      isGenerating: true,
      messages: [...state.messages, userMessage],
    });

    const result = await ai.generateSchema({
      prompt,
      currentSchema: state.schema,
    });
    const assistantMessage = createMessage(
      'assistant',
      result.reasoningSummary ?? 'Schema generated.'
    );

    onStateChange(
      applySchemaUpdate(
        {
          ...state,
          isGenerating: false,
          messages: [...state.messages, userMessage, assistantMessage],
        },
        result.schema
      )
    );
  };

  const runRepair = async () => {
    if (state.isGenerating) return;

    onStateChange({ ...state, isGenerating: true });
    const result = await ai.repairSchema({
      schema: state.schema,
      errors: state.validation.errors.map(
        (error) => `${error.path}: ${error.message}`
      ),
    });
    const assistantMessage = createMessage(
      'assistant',
      result.reasoningSummary ?? 'Schema repaired.'
    );

    onStateChange(
      applySchemaUpdate(
        {
          ...state,
          isGenerating: false,
          messages: [...state.messages, assistantMessage],
        },
        result.schema
      )
    );
  };

  return (
    <section className="panel chat-panel">
      <header className="panel-header">
        <div>
          <h2>Chat</h2>
          <p className="panel-subtitle">Mock AI → ScreenSchema (offline MVP)</p>
        </div>
      </header>

      <div className="preset-row">
        {exampleSchemaList.map((example) => (
          <button
            key={example.key}
            type="button"
            className="chip-button"
            onClick={() =>
              onStateChange(applyExampleTemplate(state, example.key))
            }
            disabled={state.isGenerating}
            title={example.description}
          >
            {example.label}
          </button>
        ))}
        <button
          type="button"
          className="chip-button chip-button--warn"
          onClick={() => void runPrompt('invalid schema for repair loop')}
          disabled={state.isGenerating}
        >
          Invalid demo
        </button>
      </div>

      <div className="chat-log" role="log" aria-live="polite">
        {state.messages.map((message) => (
          <article
            key={message.id}
            className={`chat-bubble chat-bubble--${message.role}`}
          >
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
          void runPrompt(input);
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
        <div className="chat-actions">
          <button
            type="submit"
            disabled={state.isGenerating || input.trim().length === 0}
          >
            Generate
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => void runRepair()}
            disabled={state.isGenerating || state.validation.valid}
          >
            Repair schema
          </button>
        </div>
      </form>
    </section>
  );
}
