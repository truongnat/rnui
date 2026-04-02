# UI / UX and semantics (React web)

## Contents

1. [Semantic HTML](#semantic-html)
2. [Accessibility](#accessibility)
3. [Styling approaches](#styling-approaches)
4. [Responsive and zoom](#responsive-and-zoom)
5. [Loading and feedback](#loading-and-feedback)

---

## Semantic HTML

- Use **`button`** for actions, **`a`** for navigation with `href` — do not use `<div onClick>` for primary actions (keyboard and SR suffer).
- **Headings** (`h1`–`h6`) reflect outline; one logical `h1` per main view when possible.
- **`main`**, **`nav`**, **`aside`**, **`footer`** — landmark regions help assistive tech.

---

## Accessibility

- **Label controls** — `htmlFor` + `id`, or `aria-label` / `aria-labelledby` when visible label is awkward.
- **Keyboard** — all interactive UI reachable via Tab; custom widgets need `role`, `aria-expanded`, `aria-controls` as appropriate.
- **Focus** — modals: trap focus, Esc to close, return focus to trigger on exit (see [WCAG modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)).
- **Motion** — `prefers-reduced-motion` media query for large animations.

---

## Styling approaches

- **CSS Modules**, **Tailwind**, **styled-components**, **Panda** — team consistency matters; avoid mixing three systems in one feature without reason.
- **Design tokens** — centralize color/spacing/radius for dark mode and theming.

---

## Responsive and zoom

- **Relative units** (`rem`, `%`, `clamp`) for typography and layout where possible.
- Test at **200% zoom** and **320px** width for WCAG-style checks on critical flows.

---

## Loading and feedback

- **`aria-busy`** / live regions for async status when screen readers must announce updates.
- **Skeleton** vs **spinner** — skeletons reduce layout shift when structure is known.

---

*Pair with your design system; React only renders what you compose.*
