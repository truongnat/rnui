---
name: design-system-pro
description: |
  Professional product UI design: design systems, visual foundations, accessibility baselines, data-dense interfaces, guidelines and consistency, web vs native vs desktop patterns, themes and visual direction, and trend-aware (judgment-first) styling.

  Use this skill when the user asks about design tokens, component libraries, Figma variables, UI kits, WCAG contrast, typography and spacing scales, dashboards and data tables, dark/light themes, **semantic token mapping**, **AI/copilot/chat UI**, streaming assistant layouts, citations and tool-use UI, design documentation, visual trends, brand-consistent UI, or cross-platform UX patterns.

  Use **with** **`mobile-design-pro`** for **mobile-native** touch, safe area, and iOS/Android UX depth; implementation skills: **`react-pro`** / **`nextjs-pro`** (web), **`react-native-pro`** / **`flutter-pro`** (mobile), **`electron-pro`** / **`tauri-pro`** (desktop), **`testing-pro`** (visual regression). This skill (`design-system-pro`) owns **design language, system rules, and UX patterns**; framework skills own **code APIs**.

  Triggers: "design system", "design tokens", "UI kit", "Figma", "component library", "style guide", "baseline", "WCAG", "accessibility", "dark mode", "semantic color", "CSS variables theme", "dashboard", "data table", "UX", "UI", "visual design", "consistency", "spacing", "typography", "color palette", "HIG", "Material", "Fluent", "brand", "handoff", "trend", "motion", "responsive", "copilot", "chat UI", "AI assistant", "streaming UI", "RAG UI", "citations".

metadata:
  short-description: Design system — baseline, guidelines, data UI, dark theme deep dive, AI/copilot UI
---

# Design system (professional)

Use platform **Human Interface Guidelines** and **Material Design** (or your chosen baseline) as references for native-feeling patterns; this skill encodes **token-driven consistency**, **accessible baselines**, and **product-level** visual discipline — not a replacement for brand designers or user research. Confirm **brand constraints**, **platforms** (web, iOS/Android, desktop), and **primary use case** (marketing site vs **data-heavy** app).

## Related skills (this repo)

| Skill | When to combine with `design-system-pro` |
|-------|----------------------------------------|
| **`react-pro`** / **`nextjs-pro`** | Implementing components, CSS/Tailwind, App Router layouts |
| **`mobile-design-pro`** | Touch targets, safe areas, mobile navigation, iOS vs Material — **before** pixel-pushing in code |
| **`react-native-pro`** / **`flutter-pro`** | RN/Flutter APIs, navigation implementation, lists, performance |
| **`electron-pro`** / **`tauri-pro`** | Desktop windowing, shortcuts, dense layouts |
| **`testing-pro`** | Visual regression, a11y checks in CI |
| **`seo-pro`** | Content hierarchy and heading structure for marketing pages |

**Boundary:** **`design-system-pro`** = **what** should look and behave like at the UX/UI layer; framework skills = **how** to code it.

## When to use

- Defining or evolving a **design system** (tokens, primitives, documentation).
- Setting **baseline**: type scale, spacing, color roles, **WCAG** targets, **data** density.
- **Web vs app vs desktop** — adapting patterns without cloning the wrong platform.
- **Themes** (light/dark), **visual direction**, and **trend** evaluation (fit vs fad).
- **Consistency** audits, handoff rules, governance anti-patterns.
- Trigger keywords: `design tokens`, `WCAG`, `dashboard`, `theme`, `Figma`, `UI kit`, `consistency`, …

## Workflow

1. Confirm brand/platform scope, **data density** (marketing vs analytics), and which **implementation skill** applies.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **framework code** to **`react-pro`** / **`nextjs-pro`** / … when the task is implementation-only.
3. Respond using **Suggested response format**; note accessibility residual risk and **consistency** maintenance cost.

### Operating principles

1. **Tokens before pixels** — Name and reuse; exceptions are documented.
2. **Accessibility is not optional** — Baseline **AA** contrast and keyboard/focus as default product quality.
3. **Data honesty** — Charts and metrics **readable**; no decorative distortion of scales.
4. **One product voice** — Components and microcopy follow the same guidelines.
5. **Trends serve users** — Adopt visual fashion only when it **does not** harm clarity or a11y.
6. **Platform-appropriate** — Respect mouse vs touch vs **window** conventions per surface.

### Foundations, baseline, and data UI (summary)

- Typography, spacing, color **roles**, elevation; **WCAG** baseline; **tables and dashboards** — alignment, density, chart honesty.

Details: [references/foundations-baseline-and-data-ui.md](references/foundations-baseline-and-data-ui.md)

### Accessibility, responsive web, and font loading (summary)

- **WCAG AA** contrast targets; **`prefers-reduced-motion`**; **breakpoint** discipline and a minimal **`@media`** pattern; **`font-display: swap`** and fallbacks — web **responsive** layer (not native mobile — see **`mobile-design-pro`**).

Details: [references/a11y-responsive-and-web-typography.md](references/a11y-responsive-and-web-typography.md)

### Web performance basics (summary)

- **Layout** thrash avoidance, **`will-change`** discipline, **lazy** images, **CLS** awareness — not a full **Core Web Vitals** audit (pair with **`seo-pro`** for CWV in search context).

Details: [references/web-performance-basics.md](references/web-performance-basics.md)

### Design system guidelines and consistency (summary)

- Tokens, primitives, **documentation**, governance, **design ↔ code** naming; fighting inconsistency.

Details: [references/design-system-guidelines-and-consistency.md](references/design-system-guidelines-and-consistency.md)

### Platforms: web, app, desktop (summary)

- Responsive web, **native** mobile patterns, **desktop** shells; cross-platform product strategy.

Details: [references/platforms-web-app-desktop.md](references/platforms-web-app-desktop.md)

### Trends, themes, and visual language (summary)

- Dark/light overview, brand beyond primary color, **motion** purpose; trends table with **judgment-first** caveats.

Details: [references/trends-themes-and-visual-language.md](references/trends-themes-and-visual-language.md)

### Dark mode & semantic theming (deep dive) (summary)

- **Primitive → semantic → component** token layers; dark **surfaces** (not inverted light); **borders/elevation** on dark; WCAG on real pairs; system vs user theme; OLED vs gray-black; Figma variable **modes**.

Details: [references/dark-mode-and-semantic-theming-deep-dive.md](references/dark-mode-and-semantic-theming-deep-dive.md)

### AI & copilot UI (deep dive) (summary)

- **Side dock / inline / modal** layouts; **streaming** without layout thrash; **citations** and trust; **tool-use** states; input (**Enter** vs newline), **context chips**; a11y **live regions**; stop/regenerate/feedback patterns.

Details: [references/ai-copilot-ui-patterns-deep-dive.md](references/ai-copilot-ui-patterns-deep-dive.md)

### Tips and tricks (summary)

- Handoff, loading/empty states, **one primary action**, UI critique habits.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- i18n/RTL, color-only status, custom controls, theme image assets, third-party embeds.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Screen type, platform, or system-level decision (token, pattern, theme).
2. **Recommendation** — Guideline + rationale; cite **Related skill** for code work.
3. **Code** — Token naming sketch, checklist, or layout **rules** — not a full component library implementation unless paired with **`react-pro`**.
4. **Residual risks** — a11y gaps, inconsistency debt, trend aging, engineering cost of tokens.

## Resources in this skill

- `references/` — foundations, system guidelines, platforms, trends, **two hot-topic deep dives** (dark semantic theme, AI/copilot UI), tips, edge cases.

| Topic | File |
|-------|------|
| Foundations & data UI | [references/foundations-baseline-and-data-ui.md](references/foundations-baseline-and-data-ui.md) |
| **A11y, responsive web, fonts** | [references/a11y-responsive-and-web-typography.md](references/a11y-responsive-and-web-typography.md) |
| Web performance (basics) | [references/web-performance-basics.md](references/web-performance-basics.md) |
| Guidelines & consistency | [references/design-system-guidelines-and-consistency.md](references/design-system-guidelines-and-consistency.md) |
| Web / app / desktop | [references/platforms-web-app-desktop.md](references/platforms-web-app-desktop.md) |
| Trends & themes (overview) | [references/trends-themes-and-visual-language.md](references/trends-themes-and-visual-language.md) |
| **Dark mode & semantic theming (deep dive)** | [references/dark-mode-and-semantic-theming-deep-dive.md](references/dark-mode-and-semantic-theming-deep-dive.md) |
| **AI & copilot UI (deep dive)** | [references/ai-copilot-ui-patterns-deep-dive.md](references/ai-copilot-ui-patterns-deep-dive.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Dashboard uses seven different grays and three border radii on one page.  
**Expected output:** Propose **token** set for `border`, `surface`, `radius`; migration path; single **density** preset; defer CSS variable implementation to **`nextjs-pro`** / **`react-pro`**.

**Input:** Shipping dark mode — body text looks fine in Figma but fails contrast on real surfaces.  
**Expected output:** Walk **semantic** mapping per theme; **border/elevation** on dark; verify pairs on **raised** surfaces; cite [references/dark-mode-and-semantic-theming-deep-dive.md](references/dark-mode-and-semantic-theming-deep-dive.md).

## Checklist before calling the skill done

- [ ] **Baseline** (type, space, color roles) and **a11y** targets stated for the context.
- [ ] **Platform** (web / native / desktop) appropriate patterns — not one-size-fits-all.
- [ ] **Data** presentation rules (alignment, units, empty states) when relevant.
- [ ] **Consistency** mechanism (tokens, governance) — not only one-off screens.
- [ ] Pure **implementation** work pointed to the right **framework skill** when applicable.
- [ ] For **dark theme** or **AI assistant** UI: opened the matching **deep-dive** reference when detail is needed.
