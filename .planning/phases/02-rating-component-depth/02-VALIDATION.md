---
phase: 2
slug: rating-component-depth
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-02
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest + React Native Testing Library |
| **Config file** | `packages/ui/jest.config.js` |
| **Quick run command** | `cd packages/ui && npx jest --config jest.config.js src/components/Rating/__tests__/Rating.test.tsx` |
| **Full suite command** | `cd packages/ui && npx jest --config jest.config.js` |
| **Estimated runtime** | ~30–90 seconds (full UI package) |

---

## Sampling Rate

- **After every task commit:** Run quick Rating test + `bun tsc --noEmit` in `packages/ui`
- **After every plan wave:** `turbo typecheck` from repo root (or `bun run typecheck` if defined)
- **Before `/gsd-verify-work`:** Full `packages/ui` Jest suite green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-T1 | 02-01 | 1 | A11Y-02 | unit + grep | `jest Rating.test.tsx` + `rg accessibilityRole` | ✅ | ⬜ pending |
| 2-01-T2 | 02-01 | 1 | A11Y-02 | unit | `jest Rating.test.tsx` (announce mock) | ✅ | ⬜ pending |
| 2-01-T3 | 02-01 | 1 | A11Y-02, RATE-03 | tsc + jest | `tsc --noEmit` + `jest Rating.test.tsx` | ✅ | ⬜ pending |
| 2-01-T4 | 02-01 | 1 | RATE-03 | unit | `jest Rating.test.tsx` (compact/showValue/iconNames) | ✅ | ⬜ pending |

---

## Wave 0 Requirements

- [x] Existing Jest + `Rating.test.tsx` — extend, no new framework

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| VoiceOver / TalkBack adjustable | A11Y-02 | Simulator/device SR | Enable SR; focus rating; verify single summary + increment/decrement if implemented |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
