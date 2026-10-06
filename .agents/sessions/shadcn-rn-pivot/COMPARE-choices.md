# So sánh: `label`, `checkbox`, `switch`, `radio-group` — RNUI vs shadcn/ui

## Label

| | shadcn | RNUI | Gap |
| --- | --- | --- | --- |
| Base | `text-sm leading-none font-medium` | cùng | ✓ |
| Disabled | `peer-disabled:opacity-50`, `group-data-[disabled]` | không | thêm `disabled` → `opacity-50` |
| Error | (web dùng peer/aria) | không | FormField error → `text-destructive` (FormLabel đã có; Label nên tự nhận luôn) |
| Association | Radix `htmlFor` | `onPress` callback thủ công | giữ — RN không có htmlFor; `nativeID` đã wire ở input |

## Checkbox

| | shadcn | RNUI | Gap |
| --- | --- | --- | --- |
| Unchecked border | `border-input` (xám) | **`border-primary`** (đậm) | **Bug visual** — box chưa check trông như active |
| Checked | `bg-primary border-primary` + check icon | `bg-primary` + `Check` icon | ✓ logic đúng — nhưng `checked && 'bg-primary'` là **var-class động** → đổi sang `style` prop |
| Size | `size-4` (16px) | `h-5 w-5` (20px) | RNUI lớn hơn — giữ cho touch |
| Invalid | `aria-invalid:border-destructive` | không | thêm `invalid` + FormField |
| Focus ring | `ring-[3px]` | không | mobile: bỏ qua (hitSlop đã có) |
| `dark:bg-input/30` | ✓ | không | thêm |

## Switch

| | shadcn | RNUI | Gap |
| --- | --- | --- | --- |
| Track | `bg-input` / checked `bg-primary` | cùng — nhưng **ternary var-class động** | `checked ? 'bg-primary' : 'bg-input'` toggle var → `style` prop |
| Size variants | `size: sm/default` | 1 size (44×26) | thêm `size?: 'sm' | 'default'` |
| Thumb | `bg-background`, translate | `bg-background` + Animated translateX | ✓ đã animate (vượt shadcn native) |
| Invalid/disabled | `disabled:opacity-50` | `disabled && 'opacity-50'` | ✓ — thêm `invalid` cho đồng nhất |

## Radio group

| | shadcn | RNUI | Gap |
| --- | --- | --- | --- |
| Item border | `border-input` | **`border-primary`** | Cùng bug với checkbox — circle chưa chọn viền đậm |
| Indicator | dot `fill-primary` | `bg-primary` mounted có điều kiện | mount/unmount → an toàn, giữ |
| Checked border | `border-input` vẫn giữ (không đổi) | `border-primary` | Theo shadcn: border giữ `border-input`, chỉ dot hiện. Đơn giản hóa |
| Invalid | `aria-invalid:border-destructive` | không | thêm `invalid` + FormField |
| Group gap | `gap-3` | `gap-3` | ✓ |

## Nguyên tắc áp dụng

Dynamic state (checked/invalid) → `style` prop + `useThemeColor()`; không toggle class chứa `var(--*)`.
