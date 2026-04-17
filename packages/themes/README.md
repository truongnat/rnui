# @truongdq01/themes

Multi-brand plugin presets for the RNUI ecosystem.

## Overview

This package provides pre-configured brand presets for the RNUI `@truongdq01/ui` components. Easily switch between different visual identities with a single configuration.

## Available Brands

- **Love:** Soft rose and red hues.
- **Ocean:** Deep blues and aquatic tones.
- **Forest:** Earthy greens and natural palettes.
- **Sunset:** Warm oranges and vibrant yellows.
- **Midnight:** Sleek dark mode optimizations.

## Installation

```bash
bun add @truongdq01/themes
```

## Usage

```tsx
import { ThemeProvider } from '@truongdq01/ui';
import { loveBrand } from '@truongdq01/themes';

export default function App() {
  return (
    <ThemeProvider brand={loveBrand} colorScheme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Subpath Imports

```tsx
// Import từng theme riêng lẻ (tree-shakable)
import defaultBrand from '@truongdq01/themes/default';
import loveBrand from '@truongdq01/themes/love';
import forestBrand from '@truongdq01/themes/forest';
import midnightBrand from '@truongdq01/themes/midnight';
import oceanBrand from '@truongdq01/themes/ocean';
import sunsetBrand from '@truongdq01/themes/sunset';
import telegramBrand from '@truongdq01/themes/telegram';
```

### Utilities

```tsx
import { allBrands, getBrandById, BrandId } from '@truongdq01/themes';

// Lấy tất cả brands
console.log(allBrands.length); // 7

// Lấy brand theo ID
const brand = getBrandById('telegram');
```

## Development

```bash
# Build the package
bun run build

# Typecheck
bun run typecheck
```
