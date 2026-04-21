---
title: PasswordInput
---

# PasswordInput

The `PasswordInput` component extends the base `Input` and includes a built-in visibility toggle.

## Usage

```tsx
import { PasswordInput } from '@truongdq01/ui';

<PasswordInput
  label="Password"
  placeholder="Enter your password"
  onChangeText={(pw) => console.log(pw)}
/>;
```

## Props

Inherits all props from [Input](./input.md).

## Built-in Visibility Toggle

`PasswordInput` automatically adds an eye icon in the `trailingElement` slot that toggles the `secureTextEntry` prop. You can still provide your own `leadingElement`.

```tsx
import { Lock } from 'lucide-react-native';

<PasswordInput label="Secure Entry" leadingElement={<Lock />} />;
```
