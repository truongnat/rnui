import type { SemanticTokens } from '../semantic';

export function autocompleteTokens(t: SemanticTokens) {
  return {
    container: {
      width: '100%',
    },
    menu: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      ...t.shadow.lg,
      marginTop: t.spacing[1],
      maxHeight: 250,
      borderWidth: 1,
      borderColor: t.color.border.default,
    },
    item: {
      padding: t.spacing[3],
      hover: { backgroundColor: t.color.bg.hover },
      active: { backgroundColor: t.color.brand.subtle },
    },
    /**
     * Suggestion panel layering: `modal` uses a native Modal (always above siblings).
     * `inline` keeps the panel in-tree and raises z-index/elevation on the root while open.
     */
    overlay: {
      layer: 'modal' as 'modal' | 'inline',
      /** Android elevation for the panel surface when `layer === "modal"`. */
      modalElevation: 24,
      /** When `layer === "inline"`, applied to the Autocomplete root while the panel is open. */
      inlineRootZIndex: 50_000,
      inlineRootElevation: 50_000,
    },
    /** Default open/close motion; override per-instance via `dropdownMotion` on Autocomplete. */
    motion: {
      slideOffsetPx: 8,
      openDurationMs: 200,
      closeDurationMs: 140,
    },
  } as const;
}
