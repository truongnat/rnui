# Phase 3E — Builder polish + preview fidelity

## Scope

- Builder shell aligned to RNUI brand tokens (`#7C3AED`, `#F3F1F8` canvas)
- Light/Dark preview toggle in Preview panel
- Login schema: centered auth pattern (Avatar, Box flex, Stack justifyContent center)
- Phone frame + preview area visual refinements
- Responsive builder grid (preview spans full width on tablet)

## Not in scope

- Full design system redesign
- Real AI API
- Native example app changes

## Verify

```bash
bun run web:dev:clean
# http://localhost:3000/builder
# Toggle Light/Dark in Preview header
# Click Login template — centered card with avatar
```

## Remaining

- Builder shell still HTML/CSS (not RNUI components) — intentional to avoid circular deps
- Web preview still approximates native shadows/fonts
- Other templates (dashboard/settings) not yet re-patterned to same polish level as login
