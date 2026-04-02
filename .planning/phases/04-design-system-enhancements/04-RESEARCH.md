# Phase 4 — Technical research (design system)

**Date:** 2026-04-02  
**Source:** `4-CONTEXT.md`, `AUDIT_REPORT.md`, `semantic.ts`, `love.ts`, `Switch.tsx`.

## RESEARCH COMPLETE

### Font family (RN)

- `Text` nhận `fontFamily` optional; **`undefined`** = font hệ thống. Token layer nên dùng `string | undefined` để brand override sau này.
- Composite `text.xs`… trong `shared.text` có thể gắn `fontFamily` sau — phase này ưu tiên **field** `tokens.fontFamily` + **Typography** base.

### surface.hover dark

- `raised` = `gray[800]`; hover cần **nhạt hơn** một bậc → `gray[700]` traceable từ `primitive.color.gray`.

### loveBrand disabled

- `#FDA4AF` ~2.3:1 trên trắng — thay bằng rose đậm hơn (vd. `#E11D48` / `#F43F5E`) và verify tỷ lệ ≥3:1 UI.

### Switch

- Shadow `sm` đã có trong semantic `shadow.sm`; gap/spacing từ `tokens.spacing`.

---

## Validation Architecture

| Verify | Method |
|--------|--------|
| Tokens | `bun tsc --noEmit` trong `packages/tokens`, `packages/ui` |
| Contrast | Comment + optional manual contrast check |
| DS-01 | `rg 'fontFamily' packages/tokens/src/semantic.ts`; `rg 'surface.hover' packages/tokens/src/semantic.ts` (no raw `#1A1A28`) |
