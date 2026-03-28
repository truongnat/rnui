#!/bin/bash
set -e

echo "Building RNUI monorepo..."

# Build tokens first (no dependencies)
echo "Building @truongdq01/tokens..."
cd packages/tokens
bun run build
bun tsc --emitDeclarationOnly --outDir dist --declaration --declarationMap
cd ../..

# Build headless (depends on tokens)
echo "Building @truongdq01/headless..."
cd packages/headless
bun run build
bun tsc --emitDeclarationOnly --outDir dist --declaration --declarationMap
cd ../..

# Build themes (depends on tokens)
echo "Building @truongdq01/themes..."
cd packages/themes
bun run build
bun tsc --emitDeclarationOnly --outDir dist --declaration --declarationMap
cd ../..

# Build UI (depends on headless and tokens)
echo "Building @truongdq01/ui..."
cd packages/ui
bun run build
bun tsc --emitDeclarationOnly --outDir dist --declaration --declarationMap
cd ../..

echo "Build complete!"
