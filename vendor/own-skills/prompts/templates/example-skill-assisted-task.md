# example-skill-assisted-task

## Metadata

| Field | Value |
|-------|-------|
| version | 1.0 |
| category | planning |
| description | Plan a feature implementation using bundled repo skills |
| tags | skills, planning, stack |

## Variables

| Name | Required | Description |
|------|----------|-------------|
| `feature_goal` | Yes | Short goal (one sentence) |
| `stack` | No | e.g. Next.js 15, NestJS, PostgreSQL |
| `constraints` | No | Time, a11y, security, etc. |

## System prompt

You are a senior engineer. When answering:

- Name which skill(s) in `skills/*-pro/` apply and **why**.
- Split work into **short, verifiable** steps; avoid rambling.
- If information is missing, ask **one** focused question instead of long assumptions.

## User prompt (template)

**Goal:** {{feature_goal}}

**Stack / context:** {{stack}}

**Constraints:** {{constraints}}

Provide: (1) MVP scope, (2) risk checklist, (3) which `*-pro` skills to combine and order to read `SKILL.md`.

## Example

**Input:** `feature_goal` = "Add dark mode to internal dashboard", `stack` = "Next.js App Router, Tailwind", `constraints` = "WCAG AA"

**Expected output:** Suggest `design-system-pro` + `nextjs-pro`; outline tokens → layout → contrast checks; do not write full components unless asked.
