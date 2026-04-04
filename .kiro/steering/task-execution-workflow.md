---
title: Task Execution Workflow
inclusion: auto
---

# Task Execution Workflow for RNUI Gap Fix

This workflow integrates GitNexus code intelligence with task management for the RNUI gap fix project.

## 📋 Task Plan Location

**Main Plan:** `TASK_PLAN.md` (24 tasks, 3 weeks)  
**Status Report:** `STATUS_REPORT.md` (detailed gap analysis)

## 🔄 Standard Task Workflow

### 1. Before Starting Task

```bash
# Read task details from TASK_PLAN.md
# Identify affected files and symbols

# Run GitNexus impact analysis
/impact <symbolName> --repo rnui

# Understand context
/context <symbolName> --repo rnui

# Explore related code
/explore <concept> --repo rnui
```

### 2. During Task Execution

**For Code Changes:**

```bash
# Make changes with awareness of:
# - Blast radius (from impact analysis)
# - Direct callers (d=1 - WILL BREAK)
# - Indirect dependencies (d=2 - LIKELY AFFECTED)

# Follow safety rules:
# - Warn user if HIGH/CRITICAL risk
# - Update all d=1 dependents
# - Test affected areas
```

**For New Features:**

```bash
# Create files
# Implement functionality
# Add tests
# Update documentation
# Create Storybook story
```

### 3. After Task Completion

```bash
# Verify changes
/changes staged --repo rnui

# Check affected scope
# - Modified symbols
# - Affected execution flows
# - Files changed

# Ensure only expected changes
```

### 4. Before Commit

```bash
# Final verification
/changes staged --repo rnui

# Run tests
bun test

# Run build
bun run build

# Check diagnostics
# (Kiro will auto-check)
```

### 5. After Commit

```bash
# Update GitNexus index
npx gitnexus analyze

# Mark task complete in TASK_PLAN.md
# Update progress tracking
```

## 📊 Task Priority System

| Priority | Label    | Action                              |
| -------- | -------- | ----------------------------------- |
| 🔴 P0    | CRITICAL | Do immediately, blocks everything   |
| 🟡 P1    | HIGH     | Do this week, important for release |
| 🟢 P2    | MEDIUM   | Do next week, nice to have          |
| ⚪ P3    | LOW      | Do later, future enhancement        |

## 🎯 Task Phases

### Phase 1: Critical (P0) - Week 1, Days 1-2

**Goal:** Enable NPM publishing and fix CI

Tasks: 1-4

- Fix CI branch config
- Setup NPM publishing
- Create changeset
- Publish v0.1.0

**Success Criteria:**

```bash
npm install @truongdq01/ui  # Should work!
```

### Phase 2: Documentation (P1) - Week 1, Days 3-4

**Goal:** Complete documentation coverage

Tasks: 5-9

- Document 5 missing components

**Success Criteria:**

- All 62 components documented
- Docs site updated

### Phase 3: Component Tokens (P1) - Week 1, Day 5

**Goal:** Improve token coverage

Tasks: 10-14

- Add tokens for 5 priority components

**Success Criteria:**

- 18/62 components have tokens (up from 13)

### Phase 4: Critical Hooks (P1) - Week 2, Days 1-3

**Goal:** Implement missing headless hooks

Tasks: 15-18

- useAccordion, useModal, useDrawer, useStepper

**Success Criteria:**

- 23/62 components have hooks (up from 19)

### Phase 5: Test Coverage (P1) - Week 2-3

**Goal:** Add component tests

Tasks: 19-22

- Test Button, Input, Select, Modal

**Success Criteria:**

- Test coverage: 20% (up from 15%)

### Phase 6: Polish (P2) - Week 3, Days 3-5

**Goal:** Complete Storybook and landing page

Tasks: 23-24

- Storybook coverage
- Landing page

**Success Criteria:**

- 100% Storybook coverage
- Landing page live

## 🔍 GitNexus Commands Reference

### Impact Analysis (REQUIRED before editing)

```bash
/impact <symbolName> --repo rnui
```

Returns:

- Risk level (LOW/MEDIUM/HIGH/CRITICAL)
- Direct callers (d=1) - WILL BREAK
- Indirect deps (d=2) - LIKELY AFFECTED
- Transitive (d=3) - MAY NEED TESTING

### Context Understanding

```bash
/context <symbolName> --repo rnui
```

Returns:

- 360-degree view
- All callers
- All callees
- Execution flows
- File location

### Code Exploration

```bash
/explore <concept> --repo rnui
```

Returns:

- Execution flows
- Related symbols
- Process groups

### Change Verification

```bash
/changes staged --repo rnui
/changes all --repo rnui
```

Returns:

- Modified symbols
- Affected flows
- Files changed

### Safe Renaming

```bash
/rename <oldName> <newName> --repo rnui
```

Preview → Confirm → Execute

## ⚠️ Safety Rules

### MUST DO

1. Run `/impact` before editing any symbol
2. Warn user if risk is HIGH/CRITICAL
3. Run `/changes` before committing
4. Update all d=1 (WILL BREAK) dependents

### NEVER DO

1. Edit without impact analysis
2. Ignore HIGH/CRITICAL warnings
3. Use find-and-replace for renaming
4. Commit without change verification

## 📝 Task Completion Checklist

For each task in TASK_PLAN.md:

- [ ] Read task description
- [ ] Run GitNexus impact analysis
- [ ] Implement changes
- [ ] Write tests (if applicable)
- [ ] Update documentation
- [ ] Create/update Storybook story
- [ ] Run build: `bun run build`
- [ ] Run tests: `bun test`
- [ ] Verify changes: `/changes staged`
- [ ] Commit with descriptive message
- [ ] Update GitNexus index: `npx gitnexus analyze`
- [ ] Mark task complete in TASK_PLAN.md
- [ ] Update progress tracking

## 🎯 Daily Workflow

### Morning

1. Review TASK_PLAN.md
2. Pick next task based on priority
3. Read task details
4. Run GitNexus analysis

### During Work

1. Implement with safety rules
2. Test continuously
3. Document as you go

### End of Day

1. Verify all changes
2. Commit work
3. Update task status
4. Update progress tracking

## 📈 Progress Tracking

Update TASK_PLAN.md daily:

```markdown
| Day | Phase | Tasks | Status         |
| --- | ----- | ----- | -------------- |
| Mon | P0    | 1-4   | ✅ Complete    |
| Tue | P0    | 1-4   | 🚧 In Progress |
| Wed | P1    | 5-7   | ⬜ Not Started |
```

Status indicators:

- ⬜ Not Started
- 🚧 In Progress
- ✅ Complete
- ❌ Blocked

## 🚨 Escalation

If blocked:

1. Document blocker in TASK_PLAN.md
2. Try alternative approach
3. Ask for help
4. Move to next task if possible

## 📚 Resources

- **Task Plan:** `TASK_PLAN.md`
- **Status Report:** `STATUS_REPORT.md`
- **Bug Tracking:** `BUGS.md`
- **Gap Analysis:** `GAPS.md`
- **GitNexus Guide:** `AGENTS.md`

---

_Follow this workflow for all 24 tasks in TASK_PLAN.md_
