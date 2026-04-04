# Contributing to RNUI

## Setup

```bash
git clone https://github.com/your-org/rnui
cd rnui
bun install
bun turbo build
```

## Monorepo structure

| Package             | Role                                                |
| ------------------- | --------------------------------------------------- |
| `packages/tokens`   | Design tokens — edit here to change visual language |
| `packages/headless` | Logic hooks — no styles, pure React                 |
| `packages/ui`       | Styled components — wrap headless, use tokens       |
| `apps/example`      | Expo app kitchen sink                               |
| `apps/storybook`    | RN Storybook on-device                              |

## Rules

**No primitive tokens in components.** ESLint will fail if you import `primitive` directly from `@truongdq01/tokens` inside a component. Always go through `useTokens()` or `useComponentTokens()`.

**Every styled component must wrap a headless hook.** If the component has any interactive state (press, focus, toggle, open/close), it should use the corresponding `use*` hook from `@truongdq01/headless`.

**All animation runs on the UI thread.** Use Reanimated 3 worklets. Never use the legacy `Animated` API or `setTimeout` for transitions.

**Dark mode is mandatory.** Every style value must come from a semantic token. Never hardcode a color.

## Adding a new component

1. Add headless hook to `packages/headless/src/hooks/use<Name>.ts`
2. Export from `packages/headless/src/index.ts`
3. Add styled component to `packages/ui/src/components/<Name>/`
4. Export from `packages/ui/src/index.ts`
5. Add unit tests to `packages/headless/src/__tests__/hooks.test.tsx`
6. Add Storybook story to `apps/storybook/stories/`
7. Add to kitchen sink at `apps/example/app/index.tsx`
8. Add E2E scenario to `apps/example/e2e/main.e2e.ts`

## Testing

```bash
bun turbo test           # all unit tests
cd packages/ui && bun test:perf  # Reassure perf regression
cd apps/example && bun e2e:ios   # Detox E2E on iOS simulator
```

## Releasing

```bash
# Create a changeset describing what changed
bun run changeset

# Commit, push, open PR → CI runs
# Merge to main → changesets/action creates release PR automatically
# Merge release PR → packages published to npm
```

## Token changes

When changing tokens, think in order:

1. Does the change belong in `primitive.ts`? (new raw value)
2. Does it need a new semantic mapping? (`semantic.ts`)
3. Does it need a new component-level recipe? (`component.ts`)

Never skip a layer. A component should never use a primitive token directly.
