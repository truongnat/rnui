---
name: Detect Changes
command: /changes
description: Verify scope of code changes
---

# Detect Changes Skill

Verify what symbols and files were affected by your changes.

## Usage

```
/changes [scope]
```

Scope options:
- `staged` - Only staged changes (default)
- `all` - All uncommitted changes
- `compare` - Compare with base branch

## What It Does

1. Runs `gitnexus_detect_changes({scope: "staged"})`
2. Lists all modified symbols
3. Shows affected execution flows
4. Identifies unexpected changes
5. Provides pre-commit verification

## Example

```
/changes staged
```

Output:
- Modified Symbols: 3
  - Button.render (packages/ui/src/Button.tsx)
  - ButtonProps (packages/ui/src/Button.tsx)
  - useButton (packages/ui/src/hooks/useButton.ts)
- Affected Flows: 2
  - ComponentRenderFlow
  - HookInitializationFlow
- Files Changed: 2

## When to Use

- Before committing changes
- Verifying refactoring scope
- Checking for unintended modifications
- Pre-PR review
