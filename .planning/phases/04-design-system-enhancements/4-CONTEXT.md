# Phase 4: Design system enhancements — Context

**Gathered:** 2026-04-02  
**Status:** Ready for planning (synthesized for `/gsd-plan-phase` — no prior discuss-phase file)

<domain>

## Phase Boundary

Phase 4 đáp ứng **DS-01** (token typography, brand trung tính, contrast, spacing, shadows) theo **subset có thể verify** trong một/một vài plan — không bắt buộc làm hết mọi ý trong `AUDIT_REPORT.md` trong một PR.

**Success criteria (ROADMAP):** Mỗi hạng mục **đã chọn** trong plan có **acceptance cụ thể** và **test hoặc tài liệu ngắn**.

**Out of scope phase này:** OTP/DatePicker (phase 5), Carousel glow (audit 4.6 optional).

</domain>

<decisions>

## Implementation Decisions (subset DS-01 cho plan 04-01)

- **D-40 — Font family token:** Thêm lớp **`fontFamily`** trên semantic/shared (vd. `sans`, `mono`) — giá trị mặc định phù hợp RN (`undefined` = system, hoặc chuỗi platform). Export qua `SemanticTokens` / `useTokens`; `Typography` (hoặc component text chính) đọc `tokens.fontFamily.sans` cho `style` nếu có.
- **D-41 — `surface.hover` dark traceable:** Thay literal `#1A1A28` trong `darkTokens.color.surface.hover` bằng tham chiếu **primitive** (vd. `color.gray[700]` hoặc cặp hợp lệ với `raised`) + comment.
- **D-42 — loveBrand disabled contrast:** Điều chỉnh `text.disabled` (light) trong `packages/themes/src/brands/love.ts` để **≥ 3:1** trên `bg.default`/`surface.default` (mục tiêu WCAG UI / AA nếu khả thi) — ghi giá trị hex mới + lý do trong comment.
- **D-43 — Switch alignment (audit §2.3):** Thay `shadowColor: "#000"`, magic `gap`/`marginTop` bằng token (`switch` / `shadow` / `spacing`) nếu đã có trong `componentTokens` hoặc semantic.
- **D-44 (deferred trong cùng phase nếu tràn):** `spacing[18]` / `[28]`, `text.4xl`, dark glow shadow — chỉ thêm nếu plan còn chỗ.

### Claude's Discretion

- Thứ tự task: tokens trước → brand fix → component Switch.
- Nếu `/gsd-ui-phase 4` chạy sau, chỉ bổ sung visual contract — không chặn plan hiện tại.

</decisions>

<canonical_refs>

- `.planning/ROADMAP.md` — Phase 4
- `.planning/REQUIREMENTS.md` — DS-01
- `AUDIT_REPORT.md` — §4.x DS gaps, loveBrand, surface.hover
- `packages/tokens/src/semantic.ts`, `packages/tokens/src/primitive.ts`
- `packages/themes/src/brands/love.ts`
- `packages/ui/src/components/Switch/Switch.tsx`
- `packages/ui/src/components/Typography/Typography.tsx` (nếu có)

</canonical_refs>

---

*Phase: 04-design-system-enhancements*
