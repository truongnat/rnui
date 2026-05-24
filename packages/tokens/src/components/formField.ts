import type { SemanticTokens } from '../semantic';

export function formFieldTokens(_t: SemanticTokens) {
  return {
    // Spacing between fields is owned by FormGroup `gap`, not this wrapper
    container: {},
    /** Single field inside a grouped card (no outer margin; divider handled by FormGroup) */
    groupedContainer: {
      marginBottom: 0,
    },
  } as const;
}
