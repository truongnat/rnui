---
title: Code Safety Checklist
inclusion: auto
---

# Code Safety Checklist

Before completing any code modification task, verify:

## Pre-Edit Verification

- [ ] Impact analysis run for all modified symbols
- [ ] Risk level assessed (LOW/MEDIUM/HIGH/CRITICAL)
- [ ] User warned if HIGH or CRITICAL risk detected
- [ ] Symbol context reviewed (callers, callees, flows)

## During Edit

- [ ] Changes limited to intended scope
- [ ] All d=1 (WILL BREAK) dependents identified
- [ ] Breaking changes documented
- [ ] Type safety maintained

## Post-Edit Verification

- [ ] `gitnexus_detect_changes()` confirms expected scope
- [ ] No unexpected files modified
- [ ] All d=1 dependents updated if needed
- [ ] Tests pass (if applicable)

## Before Commit

- [ ] Changes verified with `/changes staged`
- [ ] Commit message describes impact
- [ ] Breaking changes noted in commit
- [ ] Plan to refresh index after commit

## Risk-Based Actions

### HIGH Risk Changes
- Warn user explicitly
- List all direct callers (d=1)
- Verify each caller still works
- Consider feature flag or gradual rollout

### CRITICAL Risk Changes
- Require explicit user approval
- Comprehensive testing plan
- Rollback strategy documented
- Consider breaking into smaller changes

## Never Skip

1. Impact analysis before editing
2. Change detection before committing
3. User warning for high-risk changes
4. Index refresh after committing
