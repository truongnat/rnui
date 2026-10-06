# So sánh sâu: `textarea` — RNUI vs shadcn/ui vs react-native-reusables

File RNUI: `registry/shared/ui/textarea.tsx` (34 dòng). Kế thừa gần như toàn bộ phân tích của `COMPARE-input.md` — Textarea là `TextInput multiline`.

## Source đối chiếu

**shadcn/ui:**
```tsx
<textarea className={cn(
  "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
  className)} />
```

**rnr (nativewind):**
```tsx
<TextInput
  className={cn(
    'text-foreground border-input dark:bg-input/30 flex min-h-16 w-full flex-row rounded-md border bg-transparent px-3 py-2 text-base shadow-sm shadow-black/5 md:text-sm',
    props.editable === false && 'opacity-50',
    /* web-only: focus/invalid/disabled classes */)}
  placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
  multiline
  numberOfLines={Platform.select({ web: 2, native: 8 })}
  textAlignVertical="top"/>
```

**RNUI (hiện tại):**
```tsx
<TextInput multiline textAlignVertical="top"
  className={cn('min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground', 'disabled:opacity-50', className)}
  placeholderClassName / placeholderTextColorClassName />
```

## Diff ngoài phần chung với Input

| Khía cạnh | shadcn | rnr | RNUI | Ghi chú |
| --- | --- | --- | --- | --- |
| Min height | `min-h-16` (64px) | `min-h-16` | `min-h-20` (80px) | RNUI cao hơn — OK cho mobile; hoặc bám `min-h-16` theo chuẩn. Giữ `min-h-20` |
| `bg` | `bg-transparent` | `bg-transparent` | `bg-background` | rnr textarea khác input (transparent) — theo shadcn |
| `numberOfLines` | `field-sizing-content` (auto-grow) | `8` native / `2` web | không set | RN native: `numberOfLines` = **max** height — thêm giá trị default 8 như rnr? Với multiline RN tự grow theo content nếu không giới hạn → để caller quyết. Không set default cứng; để pass-through |
| `multiline` | — | `= true` default, caller override được | hardcode `multiline` | rnr expose `multiline` prop default true → caller có thể bỏ. Nhất quán theo rnr |
| `textAlignVertical` | — | `"top"` | `"top"` | Khớp |
| `py-2` | ✓ | ✓ | ✓ | Khớp |
| `resize-y`, `field-sizing-content` | ✓ | web-only | N/A | web-only |
| `disabled:opacity-50` | ✓ | check `editable===false` | dead class | Cùng bug với Input |
| focus ring | ✓ | web-only | không | Cùng pattern style-prop |
| invalid | `aria-invalid` | web-only | không | prop `invalid` + FormField |
| shadow | `shadow-xs` | `shadow-sm shadow-black/5` | không | bỏ qua (OOM-safe) |

## Quyết định thiết kế

1. **Đồng bộ API với Input mới**: `invalid`, `disabled`, FormField auto-wire, `nativeID`, focus ring, `selectionColor`/`cursorColor`, `accessibilityState`, `editable` handling, placeholder `/60`, `borderCurve`, `dark:bg-input/30`.
2. **`bg-background`** — RNUI giữ `bg-background` (khác rnr `bg-transparent`) — nhất quán với Input RNUI; dark dùng `bg-input/30` để tách khỏi card.
3. **`min-h-20` giữ nguyên** — mobile textarea nên cao hơn web; caller vẫn override qua className.
4. **`multiline` prop** expose với default `true` (rnr pattern) — không hardcode.
5. **`textAlignVertical="top"`** giữ — caller override được qua props.
6. `numberOfLines` **không** set default — RN multiline tự grow; caller set nếu muốn giới hạn.

## Implementation

Gần như copy shape của `input.tsx`, đổi: `multiline`, `textAlignVertical="top"`, `min-h-20`, `py-2`, bỏ `h-10`.
