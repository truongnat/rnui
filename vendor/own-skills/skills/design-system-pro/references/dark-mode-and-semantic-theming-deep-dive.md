# Dark mode & semantic theming (deep dive)

Practical detail for shipping **light + dark** (or multi-theme) products without “inverted light” bugs. Use with **`design-system-pro`** foundations and your stack’s token implementation (**`react-pro`** / **`nextjs-pro`**).

## 1. Token layers (recommended mental model)

| Layer | Role | Example names |
|-------|------|-----------------|
| **Primitive** | Raw palette | `gray.50` … `gray.950`, `blue.500` |
| **Semantic** | Meaning in UI | `color.text.primary`, `color.surface.default`, `color.border.subtle` |
| **Component** | Optional alias | `button.primary.bg` → maps to semantic + primitive |

**Rule:** App code and Figma should consume **semantic** (or component) tokens, not primitives directly — except marketing one-offs you accept as debt.

## 2. Dark is not “negative light”

- **Surfaces** — Dark UIs need **multiple dark grays** (e.g. default vs raised vs sunken), not one `#121212` everywhere.
- **Borders** — On dark, borders often need **lighter** grays than fill (subtle edge light); pure low-contrast hairlines disappear.
- **Shadows** — Less visible on dark; use **surface step** + **border** to imply elevation, not only shadow.
- **Images & logos** — Provide **dark variants** (white logo on dark, raster @2×); avoid gray-on-gray illegible marks.

## 3. Contrast and WCAG on dark

- **Body text** — Gray-400 on gray-900 often **fails** AA; test **real** pairs (not assumed from light theme).
- **Disabled text** — Still needs discernible state; do not rely on “washed out” alone — pair with **cursor**, **aria**, or pattern.
- **Charts** — Series colors need **distinct** hues and **enough lightness separation** on dark; test **colorblind** simulators.

## 4. Semantic mapping per theme

For each semantic token, define **light** and **dark** (and brand if needed):

- `color.text.primary` → light: near-black; dark: near-white (not pure `#fff` if reducing glare).
- `color.text.secondary` → ensure **both** meet AA on their **surface** backgrounds.
- `color.focus.ring` — Visible in **both** themes (often brand or high-contrast accent).

## 5. System vs user preference

- **`prefers-color-scheme`** — Good default for first visit.
- **In-app toggle** — Persist choice (localStorage / account); avoid **flash** on load (inline script or SSR theme cookie — implementation: **`nextjs-pro`**).
- **“Auto”** — Follow OS until user overrides; document behavior in settings.

## 6. Elevation without skeuomorphism

Define **3–5 surface levels** as tokens:

- `surface.base` — App background
- `surface.raised` — Cards, panels
- `surface.overlay` — Modals, popovers

Each step should be **obvious** in both themes (different luminance steps).

## 7. Figma / design tooling

- **Variable collections** — `Mode: Light` / `Mode: Dark` bound to same semantic names.
- **Component sets** — One component, mode switches preview; spot **orphan** styles not wired to variables.

## 8. Engineering checklist

- [ ] No raw hex in components — use CSS variables or theme object.
- [ ] Focus, error, and success states defined per theme.
- [ ] Scrollbars, selection color, and native form controls don’t clash (where customizable).
- [ ] Print stylesheet or PDF export considered if product prints reports.

## 9. OLED and “true black”

- **Pure black** `#000` — Saves power on OLED; can cause **smear** on scroll and harsh contrast; many products use **dark gray** as page background for comfort.

## 10. Migration from light-only

1. Freeze **semantic** names; map primitives.
2. Ship **dark** read-only preview for internal dogfood.
3. Fix **chart** and **illustration** assets before public launch.
