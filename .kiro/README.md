# Kiro Configuration for RNUI Project

This directory contains Kiro IDE configuration including MCP servers, workflows, and slash command skills.

## 🚀 Quick Start

### Available Slash Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/explore` | Find code by concept | `/explore authentication` |
| `/context` | Get 360° view of symbol | `/context Button` |
| `/impact` | Analyze blast radius | `/impact validateUser` |
| `/changes` | Verify code changes | `/changes staged` |
| `/rename` | Safe symbol rename | `/rename oldName newName` |
| `/debug` | Debug with flow analysis | `/debug button not working` |
| `/refresh` | Update GitNexus index | `/refresh --embeddings` |

## 📁 Directory Structure

```
.kiro/
├── settings/
│   └── mcp.json          # MCP server configuration
├── steering/
│   ├── gitnexus-workflow.md      # GitNexus workflow rules
│   └── get-shit-done-workflow.md # Task management workflow
└── skills/
    ├── gitnexus-explore.md   # /explore command
    ├── gitnexus-context.md   # /context command
    ├── gitnexus-impact.md    # /impact command
    ├── gitnexus-changes.md   # /changes command
    ├── gitnexus-rename.md    # /rename command
    ├── gitnexus-debug.md     # /debug command
    └── gitnexus-refresh.md   # /refresh command
```

## 🔧 MCP Servers

### GitNexus (Code Intelligence)
- **Status**: ✅ Installed (v1.4.10)
- **Index**: 398,527 symbols, 562,297 relationships, 300 execution flows
- **Auto-approved tools**: query, context, impact, detect_changes

### Get Shit Done (Task Management)
- **Status**: ✅ Configured
- **Purpose**: Task tracking and productivity management
- **Integration**: Works with GitNexus for code-aware task management

## 📋 Workflows

### Code Modification Workflow

1. **Before editing**:
   ```
   /impact <symbolName>
   ```
   Check blast radius and risk level

2. **Understand context**:
   ```
   /context <symbolName>
   ```
   See all callers, callees, and flows

3. **Make changes**:
   Edit code with awareness of dependencies

4. **Verify changes**:
   ```
   /changes staged
   ```
   Confirm only expected files changed

5. **Commit**:
   ```
   git commit -m "..."
   /refresh
   ```

### Refactoring Workflow

1. **Analyze impact**:
   ```
   /impact <targetSymbol>
   ```

2. **Safe rename**:
   ```
   /rename oldName newName
   ```
   Preview → Confirm → Execute

3. **Verify scope**:
   ```
   /changes all
   ```

4. **Update index**:
   ```
   /refresh
   ```

### Debugging Workflow

1. **Find related code**:
   ```
   /debug <error or symptom>
   ```

2. **Trace execution**:
   ```
   /context <suspectFunction>
   ```

3. **Check changes**:
   ```
   /changes compare
   ```
   Compare with base branch

## ⚠️ Safety Rules

### MUST DO
- ✅ Run `/impact` before modifying any symbol
- ✅ Warn user if risk is HIGH or CRITICAL
- ✅ Run `/changes` before committing
- ✅ Use `/rename` instead of find-and-replace

### NEVER DO
- ❌ Edit without impact analysis
- ❌ Ignore HIGH/CRITICAL risk warnings
- ❌ Commit without verifying changes
- ❌ Use find-and-replace for renaming

## 🎯 Risk Levels

| Depth | Meaning | Action Required |
|-------|---------|-----------------|
| d=1 | WILL BREAK | MUST update all |
| d=2 | LIKELY AFFECTED | Should test |
| d=3 | MAY NEED TESTING | Test if critical |

## 🔄 Keeping Index Fresh

After code changes:
```bash
npx gitnexus analyze
```

With embeddings (if previously enabled):
```bash
npx gitnexus analyze --embeddings
```

Check embedding status in `.gitnexus/meta.json` → `stats.embeddings`

## 📚 Resources

- GitNexus context: `gitnexus://repo/rnui/context`
- All clusters: `gitnexus://repo/rnui/clusters`
- All processes: `gitnexus://repo/rnui/processes`
- Specific process: `gitnexus://repo/rnui/process/{name}`

## 🛠️ Customization

### Add New Skills

Create `.kiro/skills/my-skill.md`:
```markdown
---
name: My Skill
command: /mycommand
description: What it does
---

# My Skill

Content here...
```

### Add Steering Rules

Create `.kiro/steering/my-rules.md`:
```markdown
---
title: My Rules
inclusion: auto
---

Rules and guidelines...
```

### Configure MCP Servers

Edit `.kiro/settings/mcp.json` to add or modify servers.

## 📖 Learn More

- [GitNexus Documentation](https://github.com/gitnexus/gitnexus)
- [Kiro Documentation](https://kiro.dev)
- [MCP Protocol](https://modelcontextprotocol.io)
