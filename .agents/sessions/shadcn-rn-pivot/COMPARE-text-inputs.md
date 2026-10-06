# So sánh: nhóm TextInput-based — autocomplete, input-otp, select, date-picker, message-input, command

Các component bọc `TextInput` hoặc `Pressable`-trigger hình-input. Nền so sánh: `COMPARE-input.md`.

## Autocomplete

| | shadcn/rnr | RNUI | Gap |
| --- | --- | --- | --- |
| Input bên trong | dùng `Input` primitive | dùng `Input` | tự hưởng state mới |
| `inputProps` type | `Omit<TextInputProps,...>` | cùng kiểu | không truyền được `invalid`/`disabled`/`placeholderClassName` của `InputProps` |
| Dropdown | popover (rnr dùng bottom-sheet/picker) | inline list khi focus | OK cho wave 1 |
| `keyboardShouldPersistTaps="handled"` | cần thiết | đã có | ✓ |

Fix: `inputProps` → `Partial<InputProps>`.

## Input OTP

| | shadcn | RNUI | Gap |
| --- | --- | --- | --- |
| Slot active | `border-ring` | `isActive && 'border-ring'` | **toggle class var động** — `border-ring` đọc `var(--ring)`; đổi className động với var-class là pattern gây css-interop upgrade warning (bài học OOM). Đổi sang `style` prop + `useThemeColor().ring` |
| Invalid | `aria-invalid` trên group | không | thêm `invalid` + FormField → slot border đỏ |
| Disabled | `disabled:` | không | thêm `disabled` → editable=false + `opacity-50` |
| `keyboardType` | — | `number-pad` hardcode | secure text cần default; expose prop với default `number-pad` |
| a11y | `aria-*` | ít | thêm `accessibilityLabel` cho hidden input |

## Select

| | shadcn/rnr | RNUI | Gap |
| --- | --- | --- | --- |
| Trigger | `border-input`, focus-visible ring | `border-input` static | thêm `invalid` + FormField → border đỏ; `borderCurve` |
| Disabled | `disabled:` works (Pressable có prop disabled) | `disabled && 'opacity-50'` | đã đúng — Pressable support `disabled:` |
| `accessibilityState` | — | không | thêm `{disabled}` |
| Text size | `text-sm` | `text-sm` | shadcn trigger `text-base` input → RNUI trigger nên match Input `text-base`? Select = button-like, `text-sm` ok |

Fix: `invalid` prop + FormField context + style borderColor + `accessibilityState`.

## DatePicker

Trigger giống Select — cùng fix: `invalid` + FormField + `accessibilityState` + style border.

## MessageInput

Dùng `Input` bên trong → hưởng sẵn. Không cần sửa.

## Command

`TextInput` trong modal — thêm `selectionColor`/`cursorColor` + dual placeholder props cho đồng nhất. Minor.

## Nguyên tắc chung (áp toàn bộ)

- Dynamic visual state → `style` prop với `useThemeColor()`, **không** toggle className chứa var (`border-ring`, `border-destructive`, `shadow-*`, `dark:`).
- FormField context (`lib/utils`) cho `invalid` + `nativeID` — không thêm registry dep.
- `disabled` → `editable`/`disabled` prop thật + `opacity-50` + `accessibilityState`.
