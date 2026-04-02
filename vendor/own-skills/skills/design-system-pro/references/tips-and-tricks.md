# Design system tips and tricks

## Practical consistency wins

- **Start with tokens** — Color/spacing/radius before building one-off screens.
- **One primary button per view** — Reduces decision fatigue and visual noise.
- **Error placement** — Inline near field + summary for forms with many fields.
- **Loading** — Prefer **skeletons** over spinners for layout-stable content; **progress** for long operations.

## Data UI

- **Align numbers** — Right-align numeric columns; use **thousands separators** consistently.
- **Units** — Always label axes and key metrics (`ms`, `%`, currency).
- **Empty states** — Explain *why* empty and **next action** (import, filter reset).

## Handoff (design → dev)

- **Annotate** — Interaction states (default, hover, focus, disabled, error); **edge** cases (long text, RTL if relevant).
- **Redlines** — Prefer **token names** over raw px when the system exists.

## Review rituals

- **UI critique** — Compare against guidelines, not personal taste alone.
- **Screenshot diffs** — For refactors, **visual regression** in CI (**`testing-pro`**) where valuable.

## Documentation that gets read

- **Short** decision records: “We use X for Y because Z.”
- **Searchable** component catalog with **copy-paste** code snippets.

## Anti-patterns

- **Infinite customization** — Too many props on one component → split or compose.
- **Pixel-perfect Figma** — Subpixel mismatches across browsers; design in **discrete** steps where possible.
