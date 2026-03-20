---
sidebar_position: 63
---

# OTPInput

A one-time password (OTP) input component with auto-focus, paste support, and customizable cell styling.

## Import

```tsx
import { OTPInput } from "@rnui/ui";
```

## Usage

```tsx
import { OTPInput } from "@rnui/ui";
import { useState } from "react";

export function VerifyScreen() {
  const [otp, setOtp] = useState("");

  return (
    <OTPInput
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={(code) => verifyCode(code)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of OTP digits |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Called on every change |
| `onComplete` | `(value: string) => void` | — | Called when all digits are filled |
| `autoFocus` | `boolean` | `true` | Focus first input on mount |
| `secureTextEntry` | `boolean` | `false` | Hide digits (like password) |
| `keyboardType` | `"numeric" \| "default"` | `"numeric"` | Keyboard type |
| `cellStyle` | `ViewStyle` | — | Style for each cell container |
| `focusedCellStyle` | `ViewStyle` | — | Style override for focused cell |
| `error` | `boolean` | `false` | Show error state |

## Notes

- Supports paste from clipboard (auto-splits into cells)
- Auto-advances focus on each digit entry
- Backspace moves focus to previous cell
