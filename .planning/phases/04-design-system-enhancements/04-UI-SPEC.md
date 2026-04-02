---
phase: 04
slug: design-system-enhancements
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-02
requirements:
  - DS-01
---

# Phase 4 — UI Design Contract (Design system enhancements)

> Hợp đồng trực quan cho phase **token + brand + component** (RN). Không phải màn hình sản phẩm mới — khóa quyết định để `04-01-PLAN.md` không tự ý hardcode.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (React Native library) |
| Preset | `@truongdq01/tokens` semantic + primitive |
| Component library | `@truongdq01/ui` (internal) |
| Icon library | Theo từng component (không đổi trong phase này) |
| Font | **Mặc định:** system sans (`undefined` trên `fontFamily.sans`). **Tùy chọn:** brand/consumer set chuỗi qua token sau này. |

---

## Spacing Scale

Kế thừa **primitive spacing** (base 4px, có bước phân `0.5`, `1.5`, … cho fine-tune). Trong phase này **chỉ** dùng token — không magic number mới ngoài plan.

| Contract | Token / usage |
|----------|----------------|
| Switch row gap | `tokens.spacing[3]` (12px) |
| Switch thumb vertical nudge | `tokens.spacing[0.5]` (2px) — *micro-alignment thumb vs track; justified exception to pure 4-multiple grid on the row* |

**Exceptions (phase):** không thêm `spacing[18]` / `[28]` trừ khi mở lại D-44 trong roadmap.

---

## Typography

| Role | Contract |
|------|-----------|
| Scale | Giữ nguyên **semantic `text.*`** (size/weight/lineHeight) — không khai báo thêm bậc pixel mới trong phase này. |
| Font family | `tokens.fontFamily.sans` áp lên `Typography` khi **khác `undefined` và khác `""`** — overlay trên variant; không thay thế scale. |
| Mono | `tokens.fontFamily.mono` dự phòng (brand/code); Typography phase này chỉ bắt buộc `sans` theo plan. |

**Giới hạn:** tối đa **một** family override cho body/heading qua `sans` — không nhân đôi weights/sizes.

---

## Color

| Role | Contract |
|------|-----------|
| Dark `surface.hover` | Phải **tham chiếu primitive** (`color.gray[…]`), không literal `#1A1A28` trong semantic. Quan hệ: hover sáng hơn một bậc so với `raised` (gray[800]) — ghi trong code. |
| loveBrand light `text.disabled` | Một giá trị **đạt ≥ 3:1** trên `#FFFFFF` (UI text / WCAG non-text không áp vào label nhỏ nếu dùng làm “disabled” — ưu tiên đọc được). Ghi hex + comment trong `love.ts`. |
| Accent | Không mở rộng “accent cho mọi interactive” — phase không đổi quy tắc accent toàn lib. |

**60/30/10:** không áp dụng màn hình mới; brand preset love giữ hierarchy rose + neutrals như hiện có, chỉ sửa **disabled** theo contrast.

---

## Motion & shadow (Switch)

| Element | Contract |
|---------|-----------|
| Thumb elevation | Dùng **`tokens.shadow.sm`** (hoặc map đầy đủ shadow props từ token) — không `shadowColor: "#000"` cứng. |

---

## Copywriting Contract

Phase **không** thêm màn hình hay CTA mới.

| Element | Copy |
|---------|------|
| User-visible strings | **Không thay đổi** trong scope 04-01 (token/component styling only). |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| — | — | **Not applicable** — không shadcn / không third-party UI registry trong phase này. |

---

## Traceability → Plan tasks

| UI contract | `04-01-PLAN` task |
|-------------|-------------------|
| `fontFamily` + Typography | Task 1–2 |
| `surface.hover` | Task 3 |
| loveBrand `text.disabled` | Task 4 |
| Switch shadow + spacing | Task 5 |

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS *(không CTA generic mới; scope token-only)*
- [x] Dimension 2 Visuals: PASS *(hierarchy: Switch thumb + label row; Typography là text mặc định)*
- [x] Dimension 3 Color: PASS *(accent không “all interactive”; disabled + surface.hover cụ thể)*
- [x] Dimension 4 Typography: PASS *(scale = semantic `text.*`; + optional `fontFamily.sans`)*
- [x] Dimension 5 Spacing: PASS *(chỉ token; 2px qua `spacing[0.5]` có lý do)*
- [x] Dimension 6 Registry Safety: PASS *(không registry ngoài)*

**Approval:** approved 2026-04-02

---

## Verification (gsd-ui-checker)

```
UI-SPEC Review — Phase 4

Dimension 1 — Copywriting:     PASS
Dimension 2 — Visuals:         PASS
Dimension 3 — Color:           PASS
Dimension 4 — Typography:      PASS
Dimension 5 — Spacing:         PASS
Dimension 6 — Registry Safety: PASS

Status: APPROVED
```

## UI-SPEC VERIFIED
