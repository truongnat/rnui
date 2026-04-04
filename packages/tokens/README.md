# @truongdq01/tokens

Design tokens for RNUI — the foundation of the design system.

## Overview

This package contains the raw, semantic, and component-level tokens used across the RNUI ecosystem. It follows a multi-layered approach to ensure consistency and flexibility.

## Layers

- **Primitive Tokens:** Base values for colors, spacing, typography, and shadows.
- **Semantic Tokens:** Purpose-driven tokens (e.g., `color.brand.default`, `spacing.container`) that map to primitives.
- **Component Tokens:** Fine-grained tokens for specific components (e.g., `button.padding.md`).
- **Motion Presets:** Reanimated-compatible easing and duration constants.

## Installation

```bash
bun add @truongdq01/tokens
```

## Usage

```tsx
import { tokens } from '@truongdq01/tokens';

// Accessing primitive tokens
const brandColor = tokens.color.blue[500];

// Accessing semantic tokens
const padding = tokens.spacing[4];

// Subpath imports (tree-shakable)
import { primitive } from '@truongdq01/tokens/primitive';
import { semantic } from '@truongdq01/tokens/semantic';
import { component } from '@truongdq01/tokens/component';
import { brand } from '@truongdq01/tokens/brand';
import { motion } from '@truongdq01/tokens/motion';
```

## Development

```bash
# Build the package
bun run build

# Typecheck
bun run typecheck
```
