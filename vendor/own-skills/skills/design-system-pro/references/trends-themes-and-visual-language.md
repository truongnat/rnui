# Trends, themes, and visual language

**Hot-topic deep dives (detail):** [dark-mode-and-semantic-theming-deep-dive.md](dark-mode-and-semantic-theming-deep-dive.md), [ai-copilot-ui-patterns-deep-dive.md](ai-copilot-ui-patterns-deep-dive.md).

## Themes (dark / light / brand)

- **Dark mode** — Not “inverted light”; **surfaces** and **elevated** layers need separate tokens; test charts and images on dark.
- **Brand** — Primary color is not the only expression; **illustration**, **motion**, and **typography** carry identity.
- **Semantic color** — `danger`/`warning`/`success` consistent across themes (may remap per theme).

## Visual direction (product-level)

- **Mood board** — Keywords (calm, playful, enterprise); **reference** competitors for positioning, not copying.
- **Shape language** — Radius scale (sharp vs soft); consistency across cards, inputs, modals.
- **Imagery** — Photo vs illustration; **diversity** and licensing; aspect ratios in cards.

## Trends (use with judgment)

Trends **change**; **usability** and **accessibility** outlive aesthetics. Short orientation:

| Trend area | Note |
|------------|------|
| **Neumorphism** | Often fails contrast; use sparingly for non-text decorative surfaces. |
| **Glassmorphism** | Legibility on busy backgrounds; blur performance cost. |
| **Heavy 3D / skeuomorph** | Motion and asset weight; accessibility of metaphors. |
| **Brutalism / anti-design** | Intentional tension; still need readable text and focus states for real users. |
| **AI-generated art** | Brand risk and uniformity; review for bias and copyright. |

## Motion

- **Purpose** — Orient (layout change), **feedback** (success), **delight** (secondary).
- **Duration** — Short for micro-interactions; avoid blocking tasks with long intro animations.

## Avoiding “trend soup”

- Pick **2–3** signature moves (e.g. radius + motion easing + illustration style); everything else stays **neutral** and token-driven.
