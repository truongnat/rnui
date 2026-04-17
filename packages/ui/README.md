# @truongdq01/ui

The main UI component library for RNUI — 62+ batteries-included, fully themeable components.

## Overview

This package provides high-performance, styled UI components for React Native. It leverages `@truongdq01/headless` for logic and `@truongdq01/tokens` for styling, offering a seamless and consistent design system.

## Key Features

- **62+ Components:** From basic buttons to complex carousels and date pickers.
- **120+ Icons:** Integrated Lucide icon set.
- **Dark Mode:** Built-in support for system and manual theme switching.
- **High Performance:** Powered by Reanimated 4 and Gesture Handler.
- **Accessible:** WCAG-compliant accessibility support out of the box.

## Installation

```bash
bun add @truongdq01/ui
```

## Setup

Wrap your application in the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@truongdq01/ui';

export default function App() {
  return (
    <ThemeProvider colorScheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Basic Usage

```tsx
import { Button, Input, Card, Badge } from '@truongdq01/ui';

function MyForm() {
  return (
    <Card>
      <Input label="Email" placeholder="name@example.com" />
      <Button label="Submit" variant="solid" onPress={handleSubmit} />
      <Badge label="New" variant="brand" />
    </Card>
  );
}
```

## Peer Dependencies

- `react` (>=19.2.0)
- `react-native` (>=0.83.2)
- `react-native-gesture-handler` (>=2.30.0)
- `react-native-reanimated` (>=4.2.0)
- `react-native-safe-area-context` (>=5.6.0)
- `react-native-worklets` (>=0.7.0)
