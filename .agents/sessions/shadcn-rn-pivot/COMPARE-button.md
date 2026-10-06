# So sánh: `button` + `text` — RNUI vs shadcn/ui vs react-native-reusables

## Variants & sizes

| | shadcn | rnr | RNUI | Gap |
| --- | --- | --- | --- | --- |
| Variants | default/destructive/outline/secondary/ghost/link | cùng | cùng | ✓ parity |
| Sizes | default/xs/sm/lg/icon/icon-xs/icon-sm/icon-lg | default/sm/lg/icon (h-10 native, sm:h-9 web) | default/sm/lg/icon | RNUI đủ; có thể thêm `icon-sm`/`icon-lg` |
| Pressed | `hover:` | `active:` per-variant | `active:` per-variant | ✓ |
| Text color | same class trên button | **`TextClassContext`** | `typeof children === 'string'` hack | **Gap**: RNUI chỉ style được string children; icon + text mix mất màu |
| `asChild`/Slot | ✓ | ✓ (Slot) | ✗ | P2 — RN ít cần |
| `disabled` | `pointer-events-none opacity-50` | `opacity-50` | `disabled:opacity-50` (Pressable có prop disabled → hoạt động) | thiếu `accessibilityState` |
| focus ring | web-only | web-only | N/A | mobile không cần |
| `aria-invalid` | ✓ | web-only | ✗ | thêm `invalid` → `border-destructive` cho outline |

## TextClassContext (rnr pattern)

rnr: `text.tsx` expose `TextClassContext`; Button wrap children bằng `Provider value={buttonTextVariants(...)}` → mọi `Text` con (kể cả custom nesting) nhận đúng màu label. RNUI Button hiện chỉ bọc `Text` khi children là string — `<Button><Icon /> <Text>Save</Text></Button>` thì Text trong không có màu `primary-foreground`.

**Implement**: `text.tsx` thêm `export const TextClassContext = createContext<string | undefined>(undefined)`; Text merge `cn(textVariants({variant}), textClass, className)` — context nằm giữa để override variant color nhưng vẫn nhường `className`. Button: wrap children trong `<TextClassContext.Provider value={label()}>` + giữ string shortcut.

Không cần registry dep mới — button đã dep `text`/`utils`? Kiểm tra: button deps hiện `utils`, `theme` — nếu dùng TextClassContext từ `text.tsx` thì phải thêm `text` vào deps, hoặc đặt context trong `lib/utils` (như FormFieldContext). → đặt trong utils cho nhất quán.

## Thêm nhỏ

- `size: 'icon-sm' | 'icon-lg'` cho parity.
- `accessibilityState={{ disabled }}` cho Pressable.
- `invalid` prop → outline/destructive border qua style prop.
