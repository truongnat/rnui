---
name: Symbol Context
command: /context
description: Get 360-degree view of a symbol
---

# Symbol Context Skill

Get complete context for a specific symbol including callers, callees, and execution flows.

## Usage

```
/context <symbolName>
```

## What It Does

1. Runs `gitnexus_context({name: "symbolName"})`
2. Shows all incoming references (who calls this)
3. Shows all outgoing references (what this calls)
4. Lists execution flows this symbol participates in
5. Provides file location and definition

## Example

```
/context Button
```

Output:

- Location: packages/ui/src/Button.tsx
- Called by: 45 components
- Calls: 3 internal functions
- Participates in: 12 execution flows
- Dependencies: react, react-native

## When to Use

- Before modifying a symbol
- Understanding symbol relationships
- Tracing dependencies
- Planning refactoring
