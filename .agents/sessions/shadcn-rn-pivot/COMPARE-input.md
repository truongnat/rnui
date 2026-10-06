# So sánh sâu: `input` — RNUI registry vs shadcn/ui vs react-native-reusables vs HeroUI Native

4 nguồn đối chiếu:

| Nguồn | Vai trò | File |
| --- | --- | --- |
| **RNUI** | Hiện tại | `registry/shared/ui/input.tsx` (33 dòng) |
| **shadcn/ui** | Chuẩn gốc (web, new-york-v4) | `registry/new-york-v4/ui/input.tsx` |
| **rnr** | react-native-reusables — port shadcn→RN chính thống | `registry/src/nativewind/components/ui/input.tsx` + bản `uniwind` |
| **HeroUI Native** | Tham chiếu RN hiện đại khác | `src/components/input/input.tsx` |

## 1. Source đối chiếu

### shadcn/ui (web)

```tsx
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}
```

### react-native-reusables (nativewind — bản uniwind gần giống, khác placeholder prop)

```tsx
<TextInput
  className={cn(
    'dark:bg-input/30 border-input bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9',
    props.editable === false &&
      cn('opacity-50',
        Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })),
    Platform.select({
      web: cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none transition-[color,box-shadow] md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'),
      native: 'placeholder:text-muted-foreground/50',
    }),
    className
  )}
  {...props}
/>
```

### RNUI (hiện tại)

```tsx
<TextInput
  ref={ref}
  className={cn(
    'h-10 w-full rounded-md border border-input bg-background px-3 text-base text-foreground',
    'disabled:opacity-50',
    className
  )}
  placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
  placeholderTextColorClassName={/* same */}   // dual-engine hack
  {...props}
/>
```

### HeroUI Native (tham chiếu thêm)

```tsx
<TextInput
  className={inputClassNames.input({ variant: finalVariant, isInvalid, isDisabled, className })}
  style={[inputStyleSheet.borderCurve, style]}        // borderCurve: 'continuous'
  placeholderTextColorClassName={placeholderColorClassName}
  selectionColorClassName={selectionColorClassName}
  editable={!isDisabled}
/>
// + useFormField(): isInvalid/isDisabled tự kế thừa từ FormField context
```

## 2. Audit từng class/prop

### Layout & base

| shadcn | rnr | RNUI | Phân tích |
| --- | --- | --- | --- |
| `h-9` | `h-10 ... sm:h-9` | `h-10` | rnr khôn ngoan: 40px native (touch target), 36px web. RNUI đúng hướng native. **OK** |
| `w-full min-w-0` | `w-full min-w-0` | `w-full` | `min-w-0` chỉ có nghĩa trên web/flex — trên RN không cần, thiếu không sao |
| `rounded-md` | `rounded-md` | `rounded-md` | Khớp token `--radius` |
| `border border-input` | `border-input border` | `border border-input` | Khớp. Token `--input` có trong cả 2 theme của RNUI |
| `bg-transparent dark:bg-input/30` | `bg-background dark:bg-input/30` | `bg-background` | shadcn trong suốt để lộ card bg; rnr dùng `bg-background` + dark-only `bg-input/30`. RNUI thiếu `dark:bg-input/30` — trên dark theme input trông giống card, mất tương phản |
| `px-3 py-1` | `px-3 py-1` | `px-3` | `py-1` vô nghĩa khi `h-10` cố định — không đáng kể |
| `text-base md:text-sm` | `text-base leading-5` (+ `md:text-sm` trên web) | `text-base` | `leading-5` của rnr chặn text bị chật line-height; RNUI thiếu — minor |
| `flex flex-row items-center` | có (rnr) | không | Cho phép children icons? TextInput không nhận children — class này của rnr hơi thừa |
| `shadow-xs` | `shadow-sm shadow-black/5` | không | **Có chủ đích không thêm** — `shadow-*` set CSS vars, toggle động gây bug OOM đã fix. Nếu thêm phải static luôn. Đề xuất: thêm `shadow-sm` static (an toàn) |
| `transition-[color,box-shadow]` | web-only | không | RN: NativeWind hỗ trợ `transition-*` kém; focus animate nên dùng Reanimated nếu muốn (điểm khác biệt của RNUI) |

### Placeholder

| shadcn | rnr | RNUI |
| --- | --- | --- |
| `placeholder:text-muted-foreground` | native: `placeholder:text-muted-foreground/50` | `placeholderClassName + placeholderTextColorClassName = text-muted-foreground` |

- RNUI **tốt hơn rnr ở chỗ**: một file chạy cả NativeWind + Uniwind (dual-prop hack). rnr phải tách 2 file riêng.
- Chi tiết: rnr giảm opacity placeholder `/50` trên native — placeholder RNUI hơi đậm hơn chuẩn iOS (`placeholderText` mặc định). Đề xuất `text-muted-foreground/60` hoặc giữ nguyên — taste.
- Typo-risk: `placeholderTextColorClassName` được cast `as Partial<TextInputProps>` — hoạt động nhưng type-unsafe. OK cho registry code.

### States — gap lớn nhất

| State | shadcn | rnr (native) | HeroUI | RNUI | Verdict |
| --- | --- | --- | --- | --- | --- |
| **Focus** | `border-ring` + `ring-[3px] ring-ring/50` | web-only, native **không có** | border đổi theo focus (qua styles) | **không có** | Cả rnr lẫn RNUI đều bỏ qua trên native — đây là chỗ RNUI **vượt** được |
| **Invalid** | `aria-invalid:border-destructive` + ring/20 | web-only, native không có | `isInvalid` prop + tự kế thừa `useFormField()` | **không có** | HeroUI chỉ đường: prop `invalid` + FormField context |
| **Disabled** | `disabled:opacity-50` + `pointer-events-none` + `cursor-not-allowed` | `props.editable === false → opacity-50` | `editable={!isDisabled}` | `disabled:opacity-50` | **Bug thật**: `disabled:` modifier của NativeWind trigger trên prop `disabled` — TextInput dùng `editable`, không có prop `disabled` → class **không bao giờ activate**. Phải theo rnr: check `props.editable === false` |
| Read-only | N/A | `editable={false}` + `selectTextOnFocus` | — | không phân biệt | RN gộp chung editable; chấp nhận |
| Selection | `selection:bg-primary` | web-only | `selectionColorClassName` (text-primary, đỏ khi invalid) | không | RN prop `selectionColor` + `cursorColor`(iOS)/`underlineColorAndroid` — thiếu |

### Điểm phát hiện quan trọng

1. **`disabled:opacity-50` là dead code.** TextInput không có prop `disabled` — NativeWind modifier không trigger. rnr và HeroUI đều check `editable === false` thủ công. → Fix P0.
2. **FormField context đã có nhưng Input không dùng.** `form.tsx` expose `useFormField()` trả `{id, error}` — Input nên tự đọc `error` để bật invalid styling (giống HeroUI). Hiện FormMessage đỏ nhưng input vẫn xám → inconsistent.
3. **Label↔Input association yếu.** `label.tsx` chỉ hỗ trợ `onPress` callback thủ công. rnr Label dùng `nativeID` + `aria-labelledby`/`accessibilityLabelledBy`; RNUI `FormField` đã có `id` — nên wire `nativeID={id}` vào input và `accessibilityLabelledBy` tự động.
4. **Focus ring trên RN không có primitive ring.** Cần `onFocus`/`onBlur` → state → đổi `borderColor` sang `ring`. **Cẩn thận**: `border-ring` đọc `var(--ring)` — đổi className động với class chứa var reference *có thể* vẫn trigger css-interop upgrade. An toàn hơn: toggle qua `style` prop với màu resolve sẵn (pattern `useIconColor` → mở rộng `useThemeColor`), hoặc render 2 lớp border. Verify bằng Metro log không có CssInterop warning.
5. **`borderCurve: 'continuous'`** — HeroUI dùng để có squircle iOS 26-style. RN ≥0.81 hỗ trợ `borderCurve` trong style — polish nhỏ nhưng "native-feel" rõ.

## 3. API matrix

| Prop/feature | shadcn | rnr | HeroUI | RNUI hiện tại | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| `className` | ✓ | ✓ | ✓ | ✓ | giữ |
| `placeholderClassName` | — | uniwind có | ✓ (`placeholderColorClassName`) | ✓ | giữ |
| `selectionColorClassName` | — | — | ✓ | ✗ | thêm (dual-prop) |
| `invalid`/`isInvalid` | `aria-invalid` | — | ✓ + FormField | ✗ | thêm `invalid?: boolean`, auto-đọc FormField.error |
| `disabled` | ✓ | dùng `editable` | `isDisabled` → `editable` | dead class | map `disabled → editable=false` |
| `variant` | — | — | `primary`/`secondary` (on-surface detect) | ✗ | P2 — có thể thêm `filled` variant |
| `type` | ✓ | kế thừa input type web | — | N/A | không cần (RN dùng keyboardType/secureTextEntry) |
| forwardRef | fn prop | fn props | ✓ | ✓ | giữ |
| FormField wiring | — | — | `useFormField()` | context có nhưng không wire | thêm `useFormFieldSafe()` optional |
| `data-slot` | ✓ | ✓ | — | ✗ | N/A native |

## 4. Demo/docs coverage

shadcn docs demo cho Input: default, disabled, with label, with button, invalid, file. Showcase RNUI hiện chỉ có 1 `Input placeholder="you@example.com"` trong FormField. **Thiếu demo**: disabled, invalid, focus-visible, password, icon-trong-input.

## 5. Đề xuất implementation (ưu tiên)

### P0 — parity state

```tsx
export interface InputProps extends TextInputProps {
  className?: string;
  placeholderClassName?: string;
  invalid?: boolean;
  disabled?: boolean;   // alias → editable=false + opacity
}
```

- `editable={!disabled && props.editable !== false}`; opacity check `editable === false` (theo rnr).
- `invalid` hoặc `formField?.error` → `border-destructive` qua **style prop** (không className động với var-class).
- `onFocus`/`onBlur` → borderColor `ring` qua style prop; merge với caller's handlers.
- `selectionColor`/`cursorColor` mặc định token `primary`; giữ prop override.

### P1 — chất lượng

- `leading-5` cho text; `dark:bg-input/30` nếu theme RNUI có ý nghĩa (dark input cần tách khỏi card bg).
- Wire `nativeID`/`accessibilityLabelledBy` từ FormField.id vào Label/Input.
- `borderCurve: 'continuous'` trong style.
- `placeholderClassName` default `/60` opacity cho cảm giác native.

### P2 — khác biệt hóa (vượt shadcn)

- Focus border animate bằng Reanimated (RNUI định vị animation-first).
- Prop `startIcon`/`endIcon` hoặc `InputGroup` wrapper — pattern phổ biến trên mobile mà shadcn web vừa thêm (`input-group`).
- `type` convenience map sang keyboardType/secureTextEntry — optional.

### Nguyên tắc an toàn (từ bug OOM)

- **Không** toggle className động cho bất kỳ class nào set CSS vars (`shadow-*`, `--*`, animate, dark: conditional trên native). State styles động → `style` prop hoặc mount/unmount View riêng.
- Verify sau khi sửa: Metro log không có `CssInterop` warning khi focus/blur/toggle invalid.

## 6. Kết luận

RNUI Input **API-shape đã đúng chuẩn shadcn-RN** (thậm chí dual-engine tốt hơn rnr), nhưng **state layer thiếu hoàn toàn**: `disabled:` là dead code, không focus visual, không invalid, không kết nối FormField context sẵn có, không selection color. 3 fix P0 đưa nó ngang rnr + phần FormField-wiring vượt cả rnr (họ cũng không wire). Phần focus ring + selection color là cơ hội khác biệt hóa ngay trong component đầu tiên.
