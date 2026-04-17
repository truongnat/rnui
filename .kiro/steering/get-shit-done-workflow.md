---
title: Get Shit Done Workflow
inclusion: auto
---

# Get Shit Done - Task Management Workflow

This project uses get-shit-done-cc for task management and productivity tracking.

## Available Commands

The get-shit-done MCP server provides task management capabilities:

- Create and track tasks
- Set priorities and deadlines
- Break down complex work into subtasks
- Track progress and completion
- Generate productivity reports

## Integration with GitNexus

Combine task management with code intelligence:

1. **Before Starting Task**: Run impact analysis on affected symbols
2. **During Task**: Use GitNexus to understand code context
3. **After Task**: Verify changes with `gitnexus_detect_changes`
4. **Task Completion**: Mark task complete and document changes

## Workflow Example

```
1. Create task: "Refactor authentication flow"
2. Run: /explore authentication flow
3. Run: /impact validateUser
4. Make changes with awareness of blast radius
5. Run: /changes staged
6. Complete task with summary
```

## Best Practices

- Link tasks to specific symbols or files
- Use impact analysis to estimate task complexity
- Track high-risk changes separately
- Document breaking changes in task notes
