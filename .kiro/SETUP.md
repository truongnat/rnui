# Kiro Setup

## MCP Servers (`.kiro/settings/mcp.json`)

### Get Shit Done (Task Management)

- Command: `/opt/homebrew/bin/npx get-shit-done-cc@latest`
- Purpose: Task tracking

## Steering Files (`.kiro/steering/`)

- **get-shit-done-workflow.md**: Task management workflow
- **safety-checklist.md**: Pre/post-edit verification checklist

All set to `inclusion: auto` - automatically loaded in context.

## Customization

### Add Steering Rules

Create `.kiro/steering/my-rules.md`:

```markdown
---
title: My Rules
inclusion: auto
---
```

### Modify MCP Config

Edit `.kiro/settings/mcp.json` to add or modify MCP servers.
