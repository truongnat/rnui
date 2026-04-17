# Design system guidelines and consistency

## What a design system includes

- **Tokens** — Color, space, radius, typography, motion (named, versioned).
- **Primitives** — Button, input, checkbox, link, icon set.
- **Patterns** — Forms, navigation, empty states, errors, **data table** composition.
- **Documentation** — When to use each variant; **do / don’t** examples; accessibility notes.

## Consistency (why it breaks)

- **One-off pixels** — Replace with **token** references in code and design tools.
- **Forked components** — Same “button” with three implementations; consolidate or document **exceptions**.
- **Unnamed colors** — `#ccc` scattered vs `color.border.default`.

## Governance (lightweight to start)

- **Owners** — Design + engineering sponsors for the library.
- **Contribution path** — Proposal → review → add to Figma + code → document.
- **Deprecation** — Version old tokens; migration guide for apps.

## Design ↔ code alignment

- **Single source of truth** — Often **tokens in repo** (CSS variables, Style Dictionary, Tailwind theme) consumed by Figma **variables** or documented mapping.
- **Naming** — Shared vocabulary: `semantic` tokens (`button.primary.bg`) over raw `blue-500` in app code.

## Content and UI

- **Voice** — Error messages, empty states, and labels should match product tone (document in guidelines).
- **Microcopy** — Button labels, **sentence case** vs Title Case — pick one.

## Measurement

- **Adoption** — Track usage of primitives vs custom; **lint** for forbidden raw values where possible.
- **UX debt** — Backlog for inconsistencies found in audits.
