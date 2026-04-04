---
name: Impact Analysis
command: /impact
description: Analyze blast radius before code changes
---

# Impact Analysis Skill

Run impact analysis on a symbol before making changes.

## Usage

```
/impact <symbolName>
```

## What It Does

1. Runs `gitnexus_impact({target: "symbolName", direction: "upstream"})`
2. Reports blast radius with depth levels
3. Identifies risk level (LOW/MEDIUM/HIGH/CRITICAL)
4. Lists all direct callers (d=1) that WILL BREAK
5. Warns user if risk is HIGH or CRITICAL

## Example

```
/impact validateUser
```

Output:

- Risk Level: HIGH
- Direct Callers (d=1): 12 files
- Indirect Dependencies (d=2): 45 files
- Transitive (d=3): 120 files
- ⚠️ WARNING: HIGH RISK - Review all direct callers before proceeding

## When to Use

- Before modifying any function, class, or method
- Before refactoring or extracting code
- Before changing API signatures
- Before deleting code
