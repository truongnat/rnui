# Phase 2: Rating component depth - Context

**Gathered:** 2026-04-02  
**Status:** Ready for planning

<domain>

## Phase Boundary

Phase 2 nâng **`Rating`** từ “dùng được” lên **truy cập được + có cảm giác tương tác rõ**, trong phạm vi `ROADMAP` / `REQUIREMENTS`:

- **A11Y-02:** Vai trò + giá trị a11y; thông báo khi giá trị đổi (SR).
- **RATE-03:** Ít nhất một chế độ **read-only / compact** (và tùy chọn **custom icon** nếu còn chỗ sau các hạng mắc buộc).

**Không** làm Carousel/Skeleton (phase 3), không đổi token pipeline toàn cục (phase 4), không NumericScore/ReviewSummary đầy đủ (phase 5) — chỉ ghi ý tưởng vào deferred nếu lệch scope.

**Kế thừa Phase 1:** `useReduceMotionEnabled` đã có — mọi animation trên sao **phải** tôn trọng reduce motion (bỏ scale/spring khi bật).

</domain>

<decisions>

## Implementation Decisions

### Accessibility (container + stars)

- **D-20:** Bọc hàng sao trong một **`View`/`Pressable` gốc** (hoặc `View` + các `Pressable` con) và gán:
  - `accessibilityRole`: dùng **`"adjustable"`** trên container điều khiển được (khi không `readOnly`/`disabled`), hoặc `"none"` khi chỉ hiển thị — planner chọn API cụ thể sao cho VoiceOver/TalkBack không báo “button” lặp 5 lần. **Khuyến nghị:** một vùng điều chỉnh tổng + `accessibilityValue` / `accessibilityHint`; các star con `accessible={false}` để tránh trùng lặp (hoặc pattern 1 star điều chỉnh — quyết định cuối trong plan).
- **D-21:** `accessibilityValue`: `{ min: 0, max: max, now: ratingValue }` (hoặc text tương đương nếu API RN yêu cầu string).
- **D-22:** Khi người dùng **đổi giá trị** (chỉ interactive): gọi **`AccessibilityInfo.announceForAccessibility`** (hoặc API tương đương trên nền tảng) với chuỗi ngắn kiểu `"X trên Y sao"` / `"X out of Y stars"` — ngôn ngữ theo locale app (nếu chưa có i18n, chuỗi tiếng Anh cố định + TODO i18n).

### Animation

- **D-23:** Phản hồi khi chọn sao: **scale nhẹ** (Reanimated `withSpring` / token `spring.bouncy` hoặc `snappy`) trên star được nhấn; nếu **`useReduceMotionEnabled()`** true → **không** animate (giữ scale 1).
- **D-24:** Không dùng `usePressable` cho từng star nếu làm phức tạp gesture; có thể `Animated.View` + `Pressable` RN hoặc gesture hiện có — ưu tiên **ít thay đổi hành vi** so với hiện tại.

### Performance API

- **D-25:** Export **`React.memo(Rating)`** (hoặc `const Rating = memo(...)`) với so sánh props ổn định (`onChange` identity được document cho consumer).

### Read-only / compact (RATE-03)

- **D-26:** **`readOnly`** đã có: bổ sung **một** trong hai (ưu tiên cả hai nếu nhỏ):
  - **`showValue` hoặc `label`**: hiển thị text dạng `"4.5"` hoặc `"4.5/5"` cạnh hàng sao (vị trí: `valuePosition: 'start' | 'end'`, mặc định `'end'`).
  - **`compact`**: boolean thu nhỏ khoảng cách / `size` preset — map vào `rating.size` hoặc token spacing.
- **D-27:** **Custom icon** (RATE-03): prop tùy chọn **`iconNames?: { filled: IconName; empty: IconName; half: IconName }`** mặc định `{ filled: 'star', empty: 'star', half: 'starHalf' }` — empty vẫn dùng glyph “star” rỗng nếu chưa có `starOutline` trong map thì document rõ giới hạn.

### Claude's Discretion

- Chi tiết triển khai **một vùng adjustable vs nhiều nút**: để planner/executor chọn sau khi spike 10 phút trên iOS/Android SR.
- Snapshot test optional nếu CI đã có pattern.

</decisions>

<specifics>

## Specific Ideas

- `AUDIT_REPORT.md` §5.3–5.5 (a11y table, thiếu label, animation).
- Icon map: `packages/ui/src/components/Icon/Icon.tsx` (`star`, `starHalf`, …).

</specifics>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planning / requirements

- `.planning/ROADMAP.md` — Phase 2 goal & success criteria
- `.planning/REQUIREMENTS.md` — A11Y-02, RATE-03
- `.planning/phases/01-critical-fixes/1-CONTEXT.md` — reduce motion, token Rating phase 1
- `AUDIT_REPORT.md` — §5 Rating deep dive

### Code

- `packages/ui/src/components/Rating/Rating.tsx`
- `packages/headless/src/hooks/useRating.ts`
- `packages/headless/src/hooks/useMotionPreference.ts` (`useReduceMotionEnabled`)
- `packages/tokens/src/component.ts` — `ratingTokens` (mở rộng nếu cần cho compact/label)

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `useRating`, `rating` tokens, `Icon` + `IconName`.
- `spring` / `motionEasing` / Reanimated trong các component khác (tham chiếu `Button`, `Card`).

### Established Patterns

- Phase 1: half-star = `starHalf`, màu accent — giữ nguyên.

### Integration Points

- Export `Rating` từ `packages/ui/src/index.ts` (nếu barrel chưa re-export đủ).

</code_context>

<deferred>

## Deferred Ideas

- **Keyboard/web/TV** điều khiển bằng phím mũi tên — backlog nếu không trong success criteria phase 2.
- **Histogram / NumericScore** — phase 5.
- **Đầy đủ i18n** chuỗi announce — có thể TODO sau khi app consumer có `react-i18next`.

</deferred>

---

_Phase: 02-rating-component-depth_
