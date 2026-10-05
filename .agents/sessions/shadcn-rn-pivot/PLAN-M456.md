# Plan — M4 + M5 + M6 (one pass)

> Scope note (user): **native-only** — iOS/Android. Web platform (react-native-web,
> web export, apps/web builder) is out of scope for registry components.

## M5 — Wave 2 components + first block

Wave-2 set (14, RN-core only, shared-source):

`accordion` `tabs` `toggle` `toggle-group` `slider` `sheet` `toast` `popover`
`dropdown-menu` `table` `breadcrumb` `pagination` `collapsible` `command`

Rules giữ nguyên M1/M3: RN core primitives + Modal + Animated (không
reanimated/gesture dep), literal classes, semantic tokens, tv() cho variants.
Block đầu tiên: `login-screen` (registry:block) — demo cơ chế block.

## M4 — shadcn-style docs (Astro)

- `scripts/gen-component-docs.mjs` — generate `docs/src/content/docs/components/<name>.mdx`
  từ `registry/registry.json` + embedded usage snippets: description, install
  command (`rnui add`), usage example, source file list.
- `components/index.mdx` — catalog page + variant switch note.
- Sidebar mới cho section Components.

Out of scope: live RN preview trong docs (cần react-native-web embed — đánh giá
sau); v1 dùng code block + install command như shadcn v1 docs.

## M6 — Theme customizer v1

- `registry/themes/<brand>.json` — light/dark CSS var pairs (lấy từ
  `packages/themes` presets).
- Builder emit `theme-<brand>.json` per variant (wrap vars vào đúng css
  template của variant).
- Mục tiêu: `rnui add theme-zinc` (ví dụ) overwrite global.css với palette khác.

## DoD

- Wave 2: `rnui add` 14 items trên cả 2 test app → tsc + export pass.
- Docs generate + `astro build` pass (hoặc tối thiểu check frontmatter hợp lệ).
- Theme brand mới install được và đổi vars trong global.css.
- EXECUTION.md + README cập nhật.
