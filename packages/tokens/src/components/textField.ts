import type { SemanticTokens } from '../semantic';
import { inputTokens } from './input';

export function textFieldTokens(t: SemanticTokens) {
  const base = inputTokens(t);
  return {
    ...base,
    container: {
      ...base.container,
      // Any specific TextField overrides
    },
  } as const;
}
