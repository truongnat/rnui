---
title: GitNexus Code Intelligence Workflow
inclusion: auto
---

# GitNexus Workflow for RNUI Project

This project uses GitNexus for code intelligence with 398,527 symbols and 562,297 relationships indexed.

## Pre-Edit Checklist

Before modifying any code:

1. **Impact Analysis**: Run `gitnexus_impact` on the target symbol
2. **Risk Assessment**: Check if risk is HIGH or CRITICAL
3. **User Warning**: Alert user if high-risk changes detected
4. **Context Gathering**: Use `gitnexus_context` for full symbol understanding

## Workflow Steps

### 1. Understanding Code
```
gitnexus_query({query: "concept or feature name"})
```
Returns execution flows grouped by process, ranked by relevance.

### 2. Symbol Deep Dive
```
gitnexus_context({name: "symbolName"})
```
Shows callers, callees, and execution flow participation.

### 3. Impact Analysis (REQUIRED before edits)
```
gitnexus_impact({target: "symbolName", direction: "upstream"})
```
Returns blast radius with depth levels:
- d=1: WILL BREAK (direct callers)
- d=2: LIKELY AFFECTED (indirect deps)
- d=3: MAY NEED TESTING (transitive)

### 4. Safe Refactoring
```
gitnexus_rename({symbol_name: "oldName", new_name: "newName", dry_run: true})
```
Preview changes first, then run with `dry_run: false`.

### 5. Pre-Commit Verification
```
gitnexus_detect_changes({scope: "staged"})
```
Verify only expected files changed.

## Risk Level Actions

| Risk | Action |
|------|--------|
| LOW | Proceed with caution |
| MEDIUM | Review dependents, test affected areas |
| HIGH | **WARN USER**, update all d=1 dependents |
| CRITICAL | **WARN USER**, comprehensive testing required |

## Resources

- Context overview: `gitnexus://repo/rnui/context`
- All clusters: `gitnexus://repo/rnui/clusters`
- All processes: `gitnexus://repo/rnui/processes`
- Specific process: `gitnexus://repo/rnui/process/{processName}`

## Never Do

- ❌ Edit without running `gitnexus_impact` first
- ❌ Ignore HIGH/CRITICAL risk warnings
- ❌ Use find-and-replace for renaming (use `gitnexus_rename`)
- ❌ Commit without running `gitnexus_detect_changes`
