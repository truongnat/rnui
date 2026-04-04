# RNUI Gap Fix - Quick Start Guide

> **Start Here:** Complete guide to fixing all gaps in 3 weeks

---

## 📚 Key Documents

| Document           | Purpose                      | When to Use                     |
| ------------------ | ---------------------------- | ------------------------------- |
| `STATUS_REPORT.md` | Gap analysis & metrics       | Understanding what needs fixing |
| `TASK_PLAN.md`     | 24 tasks, 3-week plan        | Daily task execution            |
| `BUGS.md`          | Bug tracking (100% complete) | Reference for past fixes        |
| `GAPS.md`          | Original gap analysis        | Historical context              |
| `AGENTS.md`        | GitNexus integration         | Code intelligence workflow      |

---

## 🚀 Getting Started (5 minutes)

### 1. Read the Status Report

```bash
# Open and review
cat STATUS_REPORT.md

# Key sections:
# - Executive Summary (overall health)
# - Critical Gaps (P0) - DO FIRST
# - Major Gaps (P1) - DO NEXT
# - Action Plan (priorities)
```

### 2. Review the Task Plan

```bash
# Open and review
cat TASK_PLAN.md

# Structure:
# - 24 tasks organized in 6 phases
# - 3-week timeline
# - Detailed implementation steps
# - GitNexus commands for each task
```

### 3. Setup Your Environment

```bash
# Install dependencies
bun install

# Verify build works
bun run build

# Verify tests work
bun test

# Check GitNexus
npx gitnexus --version  # Should show v1.4.10
```

---

## 📋 Week 1: Critical & Documentation

### Days 1-2: Critical Issues (P0)

**Task 1: Fix CI Branch** (5 min)

```bash
# Edit .github/workflows/ci.yml
# Add 'master' to branches array
# Commit and verify CI runs
```

**Task 2: Setup NPM** (30 min)

```bash
# 1. Create NPM account at npmjs.com
# 2. Generate automation token
# 3. Add NPM_TOKEN to GitHub secrets
# 4. Test: npm publish --dry-run
```

**Task 3: Create Changeset** (15 min)

```bash
bun changeset
# Select all 4 packages
# Choose "minor" (0.1.0)
# Describe: "Initial release with 62 components"
git add .changeset/
git commit -m "chore: add changeset for v0.1.0"
```

**Task 4: Publish to NPM** (15 min)

```bash
# Merge to master to trigger release
git checkout master
git merge feature/initial-release
git push origin master

# Verify
npm view @truongdq01/ui
```

### Days 3-4: Documentation (P1)

**Tasks 5-9: Document 5 Components** (2 hours total)

For each component (AnimatedList, Carousel, DatePicker, OTPInput, SegmentedControl):

```bash
# 1. Understand the component
/context <ComponentName> --repo rnui

# 2. Create docs file
touch docs/docs/components/<component-name>.md

# 3. Use template from TASK_PLAN.md
# 4. Add usage examples
# 5. Document props
# 6. Add accessibility notes

# 7. Verify
bun run docs
```

### Day 5: Component Tokens (P1)

**Tasks 10-14: Add 5 Component Tokens** (4 hours total)

For each component (Tabs, Select, Rating, Pagination, Timeline):

```bash
# 1. Analyze component
/impact <ComponentName> --repo rnui
/context <ComponentName> --repo rnui

# 2. Add token function to packages/tokens/src/component.ts
# 3. Update component to use tokens
# 4. Update Storybook story
# 5. Build and test

bun run build
bun test

# 6. Verify changes
/changes staged --repo rnui
```

---

## 📋 Week 2: Hooks & Tests

### Days 1-3: Critical Hooks (P1)

**Tasks 15-18: Implement 4 Hooks** (16 hours total)

For each hook (useAccordion, useModal, useDrawer, useStepper):

```bash
# 1. Create hook file
touch packages/headless/src/hooks/use<HookName>.ts

# 2. Implement logic (see TASK_PLAN.md for API design)
# 3. Add TypeScript types
# 4. Write tests
# 5. Update component to use hook
# 6. Create Storybook story

# 7. Build and test
bun run build
bun test

# 8. Verify
/changes staged --repo rnui
```

### Days 4-5: Test Coverage (P1)

**Tasks 19-22: Test 4 Components** (16 hours total)

For each component (Button, Input, Select, Modal):

```bash
# 1. Create test file
touch packages/ui/src/components/<Component>/__tests__/<Component>.test.tsx

# 2. Write tests (see TASK_PLAN.md for template)
#    - Rendering
#    - Interactions
#    - Variants
#    - Sizes
#    - Accessibility

# 3. Run tests
bun test <Component>.test.tsx

# 4. Verify coverage
bun test --coverage
```

---

## 📋 Week 3: Tests & Polish

### Days 1-2: Continue Testing

**Tasks 19-22: Complete Component Tests**

Continue from Week 2, finish all 4 component test suites.

### Days 3-4: Storybook Coverage (P2)

**Task 23: Complete Storybook** (1 day)

```bash
# For each component without story:
# 1. Create story file
touch apps/storybook/stories/<Component>.stories.tsx

# 2. Use template from TASK_PLAN.md
# 3. Add variants
# 4. Add interactive controls

# 5. Verify
bun run storybook
```

### Day 5: Landing Page (P2)

**Task 24: Create Landing Page** (2 hours)

```bash
# 1. Create landing page structure
# 2. Add hero section
# 3. Add features section
# 4. Add quick start
# 5. Add component showcase
# 6. Deploy to rnui.dev
```

---

## 🎯 Daily Routine

### Every Morning (10 min)

```bash
# 1. Open TASK_PLAN.md
# 2. Find next task
# 3. Read task details
# 4. Run GitNexus analysis
/impact <symbol> --repo rnui
/context <symbol> --repo rnui
```

### During Work (continuous)

```bash
# 1. Implement with safety rules
# 2. Test continuously
# 3. Document as you go
# 4. Use GitNexus for understanding
```

### Every Evening (10 min)

```bash
# 1. Verify changes
/changes staged --repo rnui

# 2. Run tests
bun test

# 3. Commit work
git add .
git commit -m "feat: <description>"

# 4. Update GitNexus
npx gitnexus analyze

# 5. Update TASK_PLAN.md progress
# Change ⬜ to 🚧 or ✅
```

---

## 🔍 GitNexus Quick Reference

```bash
# Before editing (REQUIRED)
/impact <symbol> --repo rnui

# Understanding code
/context <symbol> --repo rnui
/explore <concept> --repo rnui

# After editing (REQUIRED)
/changes staged --repo rnui

# Safe renaming
/rename <old> <new> --repo rnui
```

---

## ⚠️ Safety Rules

### MUST DO ✅

- Run `/impact` before editing
- Warn if HIGH/CRITICAL risk
- Run `/changes` before commit
- Update all d=1 dependents

### NEVER DO ❌

- Edit without impact analysis
- Ignore HIGH/CRITICAL warnings
- Use find-and-replace for rename
- Commit without verification

---

## 📊 Progress Tracking

Update TASK_PLAN.md daily:

```markdown
### Week 1

| Day | Phase | Tasks | Status         |
| --- | ----- | ----- | -------------- |
| Mon | P0    | 1-4   | ✅ Complete    |
| Tue | P0    | 1-4   | 🚧 In Progress |
| Wed | P1    | 5-7   | ⬜ Not Started |
```

---

## 🎉 Success Criteria

### Week 1 Complete

- ✅ Packages published to npm
- ✅ CI runs on all branches
- ✅ All components documented
- ✅ 5 components have tokens

### Week 2 Complete

- ✅ 4 critical hooks implemented
- ✅ 4 components tested
- ✅ Test coverage: 20%

### Week 3 Complete

- ✅ Storybook: 100% coverage
- ✅ Landing page live
- ✅ All 24 tasks complete

---

## 🆘 Need Help?

1. **Stuck on a task?**
   - Read task details in TASK_PLAN.md
   - Use GitNexus to understand code
   - Try alternative approach

2. **Build failing?**

   ```bash
   bun run clean
   bun install
   bun run build
   ```

3. **Tests failing?**

   ```bash
   bun test --verbose
   # Check error messages
   # Fix issues
   # Re-run
   ```

4. **GitNexus issues?**
   ```bash
   npx gitnexus analyze
   # Rebuilds the index
   ```

---

## 📚 Additional Resources

- **GitNexus Docs:** `AGENTS.md`
- **Bug History:** `BUGS.md`
- **Gap Analysis:** `GAPS.md`
- **Kiro Skills:** `.kiro/skills/`
- **Kiro Steering:** `.kiro/steering/`

---

**Ready to start?** Open `TASK_PLAN.md` and begin with Task 1! 🚀
