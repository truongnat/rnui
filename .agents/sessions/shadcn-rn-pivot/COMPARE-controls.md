# So sánh: `chip`, `toggle`, `toggle-group`, `rating`, `segmented-control`

## Chip (không có trong shadcn — pattern Material)

- `tv()` compoundVariants toggle `bg-primary`/`border-primary` khi `selected` đổi → **var-class động** → css-interop upgrade warning → OOM trong dev (cùng bug segmented-control).
- Fix: `selected` styles chuyển sang `style` prop + `useThemeColor()`. Text `text-primary-foreground` → `style.color`.
- Giữ `onRemove`, variants `filled`/`outlined`, `hitSlop` cho nút x.

## Toggle

- shadcn: `data-[state=on]:bg-accent` — RNUI toggle `pressed: 'bg-accent'` qua tv() → cùng var-class động → chuyển `style` prop.
- Sizes `sm/default/lg`, variants `default/outline` đã khớp shadcn.
- `disabled` → `opacity-50` ✓.
- Ghi chú: `active:bg-accent` (press feedback) giữ — đó là pseudo state, không toggle JS.

## ToggleGroup

- `single`/`multiple` + controlled/uncontrolled đã đúng shadcn.
- Truyền `variant`/`size` từ group → item ✓. Không cần sửa ngoài hưởng Toggle fix.

## Rating (không có trong shadcn)

- Hardcode `#f59e0b`/`#d6d3d1` — nên theme-aware: `primary` cho filled, `muted`/`border` cho empty? Star vàng là convention — giữ màu vàng nhưng cho phép override qua props (`color`/`emptyColor`), vì sao vàng hợp lý cả dark mode.
- Thêm `hitSlop` cho vùng bấm sao nhỏ, `disabled`, `accessibilityValue`.
- `readonly` prop ✓.

## SegmentedControl (không có trong shadcn — iOS pattern)

- Đã fix OOM (indicator mount riêng). Còn lại: `disabled` per-option? P2. Giữ nguyên.

## Tóm tắt sửa

| File | Đổi |
| --- | --- |
| `chip` | `selected` → style prop; text color động → style |
| `toggle` | `pressed` → style prop (`bg-accent`) |
| `toggle-group` | không đổi |
| `rating` | `color`/`emptyColor` props, `hitSlop`, `disabled`, `accessibilityValue` |
| `segmented-control` | không đổi |

`utils.useThemeColor` cần thêm token: `primaryForeground`, `accent`, `accentForeground`.
