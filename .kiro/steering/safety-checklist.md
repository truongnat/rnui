---
title: Code Safety Checklist
inclusion: auto
---

# Code Safety Checklist

Before completing any code modification task, verify:

## Pre-Edit Verification

- [ ] Understand what calls/imports the symbols being modified
- [ ] Risk level assessed — warn user if the change is high-risk
- [ ] Relevant files and dependencies reviewed

## During Edit

- [ ] Changes limited to intended scope
- [ ] Breaking changes documented
- [ ] Type safety maintained

## Post-Edit Verification

- [ ] `git diff` shows only expected files changed
- [ ] Tests pass (if applicable)

## Before Commit

- [ ] Commit message describes impact
- [ ] Breaking changes noted in commit
