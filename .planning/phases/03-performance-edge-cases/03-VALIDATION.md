---
phase: 3
slug: performance-edge-cases
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-02
---

# Phase 3 — Validation Strategy

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Bun test + Jest (packages/ui, packages/headless) |
| **Quick run** | `cd packages/headless && bun test src/hooks/__tests__/useCarousel.test.tsx` |
| **UI quick** | `cd packages/ui && bun test src/components/Carousel/__tests__/Carousel.test.tsx src/components/Skeleton/__tests__/Skeleton.test.tsx` |

## Per-Task Map

| Task | REQ | Command |
|------|-----|-----------|
| useCarousel guards | PERF-01 | `bun test useCarousel.test.tsx` |
| Carousel UI | PERF-01 | `bun test Carousel.test.tsx` |
| Skeleton | PERF-02 | `bun test Skeleton.test.tsx` |
| Switch | stretch | `bun test Switch.test.tsx` (if exists) |

## Manual

- Rotate device once for carousel width — optional.

## Sign-Off

**Approval:** pending
