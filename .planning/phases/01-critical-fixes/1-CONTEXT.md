# Phase 1: Critical fixes - Context

**Gathered:** 2026-04-02  
**Status:** Ready for planning

<domain>

## Phase Boundary

Phase 1 giao **sửa lỗi và rủi ro đã xác định trong audit**: an toàn kiểu trên Rating/Pressable, hiển thị nửa sao đúng glyph, tôn trọng reduce motion trong `usePressable`, token màu rating theo semantic accent, `precision` hợp lệ trong `useRating`, xử lý `Linking.openURL` an toàn, và `timingPreset` ↔ Reanimated qua `resolveTimingPreset`.

Không mở rộng sang Carousel/Skeleton (phase 3), không làm đầy đủ a11y Rating (phase 2), không thêm component backlog (phase 5).

</domain>

<decisions>

## Implementation Decisions

### Reduce motion vs press feedback

- **D-01:** Khi `AccessibilityInfo` báo reduce motion, `usePressable` dùng **`effectiveFeedbackMode === "none"`** — không chạy scale/opacity animation trên press (đủ cho WCAG 2.3.3 trong phạm vi thư viện).
- **D-02:** Không tắt haptic trong phase 1 (haptic không gắn reduce motion trong audit); có thể xem lại sau.

### Linking / Button

- **D-03:** `Linking.openURL(href)` sau `onPress` — lỗi promise **nuốt** bằng `.catch(() => {})` để tránh unhandled rejection; **không** thêm prop `onLinkError` trong phase 1 (defer nếu product cần).

### Rating / tokens

- **D-04:** Nửa sao dùng icon **`starHalf`** (map `Icon` / `ICON_MAP`) — không dùng `"star"` cho cả ba trạng thái.
- **D-05:** Màu filled/half từ **`t.color.accent.default`** trong `ratingTokens` (không hardcode amber).
- **D-06:** `ratingTokens` có **`container`** (row + gap); `pressableTokens` có **`container`** để bỏ `as any` trên `Pressable`.

### useRating

- **D-07:** `precision` không hợp lệ (≤0, không finite) → **fallback 1**; không đổi `max` trong phase 1 (audit `max=0` giữ hành vi hiện tại).

### Motion / easing

- **D-08:** **`resolveTimingPreset(key)`** trong `@truongdq01/headless` là cách chính để dùng `timingPreset` với `withTiming`; giữ **`motionEasing`** cho import trực tiếp.
- **D-09:** Tokens `easing` vẫn là chuỗi — **không** import Reanimated trong `@truongdq01/tokens`.

### Môi trường / test

- **D-10:** `useReduceMotionEnabled` **defensive**: nếu mock/test thiếu `isReduceMotionEnabled` / `addEventListener`, fallback an toàn (không throw).

### Claude's Discretion

- Chi tiết triển khai gesture/worklet (cách rebuild `Gesture.Tap` mỗi render) — để planner/executor tối ưu sau nếu cần.
- Có còn `as any` ở component khác (vd. `Button` `textStyle`) — **ngoài** phase 1 trừ khi audit nhắc cùng PR nhỏ.

</decisions>

<specifics>

## Specific Ideas

- Tham chiếu audit: `AUDIT_REPORT.md` §2.1, §4.1–4.2, §5.2–5.4, §6.5 (reduce motion, easing).
- Phase 1 đã có phần **code đã merge** trong repo (Rating, headless, tokens, Button) — planner cần **rà soát diff còn lại** vs success criteria (vd. `as any` tại `Button` icon color nếu vẫn còn).

</specifics>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Audit & requirements

- `AUDIT_REPORT.md` — Danh mục lỗi và roadmap cải tiến ưu tiên
- `.planning/REQUIREMENTS.md` — REQ-IDs QUAL-_, A11Y-01, RATE-_, MOT-01
- `.planning/ROADMAP.md` — Phase 1 goal & success criteria

### Code hotspots (tối thiểu)

- `packages/ui/src/components/Rating/Rating.tsx`
- `packages/ui/src/components/Button/Button.tsx`
- `packages/ui/src/components/Pressable/Pressable.tsx`
- `packages/headless/src/hooks/usePressable.ts`
- `packages/headless/src/hooks/useMotionPreference.ts` | `useRating.ts`
- `packages/headless/src/motion.ts` (`resolveTimingPreset`, `motionEasing`)
- `packages/tokens/src/component.ts` (`ratingTokens`, `pressableTokens`)
- `packages/tokens/src/motion.ts` (comments easing)

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `motionEasing` + layout `motionPresets` đã có trong `headless/motion.ts` — mở rộng bằng `resolveTimingPreset`, không nhân đôi curve.
- `ThemeProvider` / `resolveComponentTokens` — mọi thay token Rating/Pressable đi qua `component.ts` + type `ComponentTokens`.

### Established Patterns

- `React.memo` trên nhiều component UI — Rating sẽ theo ở phase 2, không bắt buộc phase 1 trừ khi roadmap chỉnh.

### Integration Points

- Export barrel: `packages/headless/src/index.ts` — mọi API mới (`useReduceMotionEnabled`, `resolveTimingPreset`) phải export.

</code_context>

<deferred>

## Deferred Ideas

- **onLinkError** (Button) — UX/debug; không thuộc phase 1.
- **Haptic + reduce motion** — có thể tắt haptic khi reduce motion trong phase sau.
- **Button `textStyle` typing** — audit §2.1; có thể phase 1.5 hoặc phase 3 tùy scope.

</deferred>

---

_Phase: 01-critical-fixes_
