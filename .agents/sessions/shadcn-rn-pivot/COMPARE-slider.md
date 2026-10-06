# So sánh: `slider` — RNUI vs shadcn/ui vs rn-primitives

## Kiến trúc

| | shadcn | rn-primitives (rnr) | RNUI |
| --- | --- | --- | --- |
| Engine | Radix Slider | `@rn-primitives/slider` + gesture-handler | `PanResponder` thuần — **zero dep** |
| Controlled | `value`/`defaultValue` đều có | cùng | chỉ controlled (`value`) |

RNUI self-contained là điểm mạnh — giữ PanResponder.

## Feature matrix

| | shadcn | RNUI | Gap |
| --- | --- | --- | --- |
| `defaultValue` uncontrolled | ✓ | ✗ (bắt buộc `value`) | **Thêm** — uncontrolled cần thiết cho demo/registry UX |
| `min`/`max`/`step` | ✓ | ✓ | ✓ |
| `onValueChange` | ✓ | ✓ | ✓ |
| `onSlidingComplete`/`onSlidingStart` | radix có | ✗ | thêm — iOS Slider cũ cũng có |
| `orientation: vertical` | ✓ | ✗ | P2 — mobile ít dùng, bỏ qua |
| multi-thumb (range) | ✓ | ✗ | P2 — bỏ qua |
| Track | `bg-muted` h-1.5 | `bg-secondary` h-1.5 | đổi `bg-muted` cho đúng token |
| Thumb | `size-4 border-primary bg-white` | `h-5 w-5 border-primary/50` | RNUI to hơn — giữ (touch target); border `/50` ok |
| disabled | `opacity-50` | `opacity-50` | ✓ — thêm `accessibilityState.disabled`... đã có qua `accessibilityValue`? `accessibilityState` thiếu — thêm |
| invalid | `aria-invalid` | ✗ | thêm `invalid` → thumb/track border destructive (FormField) |
| thumb `shadow-sm` | ✓ | `shadow` | static class — an toàn |

## Bug/edge trong hiện tại

- `value` không clamp lúc init cho thumb fill (đã clamp qua `clamp(value)` — ok).
- Controlled-only nghĩa là mọi usage phải tự `useState` — registry component nên hỗ trợ `defaultValue` + inner state (pattern MessageInput `value ?? inner` đã có sẵn trong codebase).
- `onPanResponderRelease` không gọi `onSlidingComplete`.

## Implementation

- `defaultValue`, internal `inner` state: `const val = value ?? inner`.
- `onSlidingStart`, `onSlidingComplete` callbacks.
- `invalid` + FormField → destructive thumb border + track tint.
- Track `bg-secondary` → `bg-muted` (đúng token shadcn).
- `accessibilityState={{ disabled }}`.
