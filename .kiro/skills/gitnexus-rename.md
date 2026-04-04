---
name: Safe Rename
command: /rename
description: Rename symbols across the codebase safely
---

# Safe Rename Skill

Rename a symbol across the entire codebase using call graph analysis.

## Usage

```
/rename <oldName> <newName>
```

## What It Does

1. Runs `gitnexus_rename` with `dry_run: true` first
2. Shows preview of all changes
3. Identifies graph-based edits (safe) vs text-search edits (needs review)
4. Asks for confirmation
5. Executes rename with `dry_run: false`

## Example

```
/rename validateUser verifyUser
```

Output (Preview):

- Graph Edits: 15 references (safe)
  - auth/validator.ts:45
  - auth/middleware.ts:23
  - ...
- Text Search Edits: 2 references (review needed)
  - docs/api.md:100
  - README.md:50

Confirm? (y/n)

## When to Use

- Renaming functions, classes, methods
- Refactoring API names
- Improving code clarity
- Never use find-and-replace for this!

## Safety

- Graph edits are safe (based on call graph)
- Text search edits need manual review (comments, docs, strings)
- Always preview before executing
