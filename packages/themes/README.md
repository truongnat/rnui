# @truongdq01/themes

Astryx theme gallery for the RNUI ecosystem.

## Overview

This package ports the [Astryx](https://astryx.atmeta.com/themes) theme gallery as brand presets for the RNUI `@truongdq01/ui` components. The built-in default tokens (no `brand`) already use the Astryx **neutral** palette; these presets provide the rest of the gallery.

## Available Brands

- **Neutral:** Muted, minimal starting point (matches the built-in default).
- **Stone:** Warm stone and slate tones.
- **Butter:** Golden buttery surfaces with a blue accent.
- **Chocolate:** Warm brown tones and cozy beige.
- **Matcha:** Earthy green.
- **Gothic:** Atmospheric deep blue-gray (dark-first).
- **Y2K:** Periwinkle body with holographic pink accents.

## Installation

```bash
bun add @truongdq01/themes
```

## Usage

```tsx
import { ThemeProvider } from '@truongdq01/ui';
import { matchaBrand } from '@truongdq01/themes';

export default function App() {
  return (
    <ThemeProvider brand={matchaBrand} colorScheme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Subpath Imports

```tsx
// Import từng theme riêng lẻ (tree-shakable)
import { neutralBrand } from '@truongdq01/themes/neutral';
import { stoneBrand } from '@truongdq01/themes/stone';
import { butterBrand } from '@truongdq01/themes/butter';
import { chocolateBrand } from '@truongdq01/themes/chocolate';
import { matchaBrand } from '@truongdq01/themes/matcha';
import { gothicBrand } from '@truongdq01/themes/gothic';
import { y2kBrand } from '@truongdq01/themes/y2k';
```

### Utilities

```tsx
import { allBrands, getBrandById, type BrandId } from '@truongdq01/themes';

// Lấy tất cả brands
console.log(allBrands.length); // 7

// Lấy brand theo ID
const brand = getBrandById('matcha');
```

## Development

```bash
# Build the package
bun run build

# Typecheck
bun run typecheck
```
