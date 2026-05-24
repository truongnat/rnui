# Phase 2C — Core Components Visual Polish — Investigation

**Date:** 2026-05-24  
**Scope:** Button, Input, TextField, Card, Paper, Typography, Stack, Box, Switch, Checkbox  
**Note:** Distinct from earlier docs-only “Phase 2C” in followups — this phase is **core component visual polish**.

---

## Current problems (pre-2C)

| Area | Issue | Severity |
|------|-------|----------|
| **Input vs Button** | md Input 48dp vs Button 44dp — forms look misaligned | High |
| **Input radius** | `radius.xl` (16) vs Button `radius.lg` (12) — mixed corner language | Medium |
| **Input disabled** | Duplicate `disabled` vs `state.disabled` tokens with different values | Medium |
| **Input focus** | `focusRing` 2px unused; risk of layout shift if mixed | Low |
| **Paper default** | No border/shadow — invisible on app bg | High |
| **Card vs Paper** | Card raised + shadow; Paper flat — inconsistent panel family | Medium |
| **Typography** | h1–h4 heavy (700/600); caption/helper too faint; `button` variant uppercase | Medium |
| **Checkbox** | 20px md box; below 44dp touch target | High |
| **Card children** | Raw string children crash RN | Medium |
| **TextField** | `variant` prop unused; token passthrough only | Low (document) |
| **Examples** | Component dumps, generic copy, no hero patterns | Medium |
| **Docs** | Visual baseline still referenced 48px input | Low |

## Worst default appearance

1. Paper (flat on `#F3F1F8` canvas)
2. Checkbox touch target
3. Form row with md Button + md Input height mismatch

## Token inconsistencies

- Input container `border.subtle` vs `state.default` `border.default`
- Helper text `tertiary` vs label `primary` — helper should be `secondary`
- Button solid `semibold` vs outline `medium`

## Planned fixes

1. Align Input/Button heights: sm 36, md 44, lg 52; Input radius `lg`
2. Unify Input disabled state; helper spacing `spacing[2]`
3. Paper default: border + `shadow.sm`; radius `xl` to match Card
4. Soften typography weights h1–h4; remove uppercase from typography `button` variant
5. Checkbox larger boxes + 44dp touch wrapper
6. Card string-child safety
7. Example hero patterns + docs baseline update

## Files to modify

### Tokens
- `button.ts`, `input.ts`, `paper.ts`, `checkbox.ts`, `typography.ts`, `semantic.ts`

### UI
- `Card/Card.tsx`, `Checkbox/Checkbox.tsx`

### Examples
- Button, Input, TextField, Card, Paper, Typography, Switch, Checkbox screens

### Docs
- `visual-baseline.mdx`, component docs as needed

### Tests
- `tokens.test.ts`, `Card.test.tsx`

## Out of scope

Modal/Dialog, status surfaces, AI schema, engineering debt batch fixes.
