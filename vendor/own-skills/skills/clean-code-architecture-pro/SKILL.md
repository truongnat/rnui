---
name: clean-code-architecture-pro
description: |
  Professional guidance for writing clean, maintainable code and designing boundaries with clean architecture principles.

  Use this skill when implementing or reviewing features that need clear module boundaries, low coupling, high cohesion, and long-term maintainability.

  Triggers: "clean code", "clean architecture", "refactor", "separation of concerns", "dependency inversion", "layering", "module boundary", "maintainability", "tech debt".

  Combine with `testing-pro` for architecture-safe tests and `git-operations-pro` for safe incremental refactors.
metadata:
  short-description: Clean code/architecture — boundaries, coupling, maintainability, refactoring
---

# Clean code and clean architecture (professional)

Use official [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html), [Martin Fowler refactoring catalog](https://refactoring.com/catalog/), and [Thoughtworks technology radar](https://www.thoughtworks.com/radar) for conceptual truth; this skill encodes **practical maintainability defaults**, **boundary-first design**, and **safe refactoring heuristics**. Confirm **current architecture style** (layered/modular/hexagonal), **team conventions**, and **change constraints** from the project.

## Related skills (this repo)

| Skill | When to combine |
|-------|------------------|
| `testing-pro` | Convert architectural decisions into tests and protect refactors from regressions. |
| `git-operations-pro` | Split risky refactors into safe, reviewable commits and branches. |

## When to use

- Designing or refactoring modules/services with unclear responsibilities.
- Reducing coupling, cyclic dependencies, and business logic leakage into frameworks/adapters.
- Reviewing PRs for readability, maintainability, and long-term changeability.
- Applying incremental architecture improvements without full rewrites.
- Trigger keywords: `clean code`, `clean architecture`, `refactor`, `separation of concerns`, `dependency inversion`, `layering`, `module boundary`, `maintainability`, `tech debt`

## Workflow

1. **Confirm** versions / environment / stack (architecture style, project layering conventions, constraints, release risk).
2. **Apply the principles and topic summaries below; open `references/` when you need depth.**
3. **Respond using **Suggested response format**;** note the main risks (over-engineering, boundary breakage, migration regressions, hidden coupling).

### Operating principles

1. **Depend on abstractions inward** - core business logic must not depend on UI, frameworks, or infrastructure details.
2. **One reason to change per module** - keep responsibilities cohesive and explicit.
3. **Prefer clear boundaries over clever shortcuts** - optimize for understandability and safe evolution.
4. **Refactor in small verified steps** - preserve behavior first, improve structure second.
5. **Make architecture visible** - names, folder structure, and interfaces should reveal intent.

### Clean code tips and tricks (summary)

- Keep functions short and intention-revealing; extract pure helpers before adding abstractions.
- Use domain language in names (`calculateInvoiceTotal`, `authorizeRefund`) instead of technical placeholders.
- Minimize boolean flags and multi-mode methods; prefer explicit separate paths.
- Move side effects to edges and keep business rules deterministic when possible.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Clean architecture edge cases (summary)

- Over-layering can slow delivery if boundaries are added before real complexity appears.
- "Shared utils" can become hidden coupling hubs if not governed.
- Framework-driven shortcuts often leak transport/persistence concerns into domain logic.
- Big-bang rewrites increase risk; strangler/incremental migration is usually safer.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - define maintainability/architecture problem and desired target.
2. **Recommendation** - prioritize the smallest high-impact structural changes.
3. **Code** - provide concrete module/interface/refactor snippets or checklist.
4. **Residual risks** - list migration, dependency, and rollout risks.

## Resources in this skill

Use these files for deeper detail when concise guidance in this file is not enough.

| Topic | File |
|-------|------|
| Practical clean code patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Architectural failure modes and edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Refactor this service to clean architecture without breaking behavior."  
**Expected output:** Boundary-first proposal with incremental steps, concrete code changes, and regression risk controls.

## Checklist before calling the skill done

- [ ] Module boundaries and dependency direction are explicitly defined.
- [ ] Recommendation favors incremental refactor over risky rewrite.
- [ ] At least one clean-code improvement and one architecture risk are addressed.
- [ ] Code section includes concrete changes (interfaces/modules/tests/checklist).
- [ ] Residual risks and follow-up verification are clearly stated.
