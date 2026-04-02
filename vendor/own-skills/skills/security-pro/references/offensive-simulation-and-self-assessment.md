# Offensive simulation and self-assessment (“hack your own system”)

Structured way to **find bugs before attackers**: authorized testing, safe environments, and clear reporting. This is **not** a substitute for external pen-test or compliance audit when those are required.

## Principles

1. **Written authorization** — scope, targets, windows, contacts, stop conditions (even for internal “red on blue”).
2. **Never test production without explicit approval** — use **staging**, **ephemeral envs**, or **read-only** probes when policy allows.
3. **Separate duties** — person who deploys fixes should not be sole approver of destructive tests in sensitive systems.
4. **Document findings** like production defects — repro, severity, impact, fix, retest.

## Models (pick what fits the org)

| Model | What it is | Good for |
|-------|------------|----------|
| **Vulnerability assessment** | Automated + manual checklist | Baseline, CI gates |
| **Penetration test** | Simulated attacker, time-boxed | Realistic exploit paths |
| **Red team** | Goal-oriented adversary simulation | Detect response/detection gaps |
| **Purple team** | Red + blue collaborate | Tune detections and controls faster |
| **Bug bounty** | External researchers, scoped | Continuous, diverse perspectives |

## “Simulator” stack (tool categories — not endorsements)

- **SAST** — static analysis in CI (`testing-pro` alignment).
- **DAST** — dynamic scanning against running app (staging).
- **Dependency** — SCA for known CVEs in libraries/containers.
- **IaC** — policy-as-code for cloud misconfigs.
- **Fuzzing** — inputs at API/file boundaries for crashes/logic bugs.

Run tools in **CI** on schedule + on PR for changed paths; tune **noise** so teams trust alerts.

## Safe lab patterns

- **Isolated VPC/account** — no routes to prod data; synthetic or anonymized data only.
- **Secrets** — separate from prod; rotate after demos.
- **Reset** — automation to rebuild lab from IaC after destructive tests.

## Reporting (internal “bug report”)

Minimum useful fields:

- **Title** — one line, component + flaw type.
- **Severity** — use a simple matrix (e.g. impact × likelihood) aligned with org.
- **Steps to reproduce** — ordered, minimal, no prod URLs unless authorized.
- **Evidence** — screenshots/redacted HTTP **without** live tokens.
- **Remediation** — concrete control; link to **`security-pro`** + stack skill for implementation.
- **Retest criteria** — how to close the ticket.

## Metrics that matter

- **Time to fix** by severity; **recurrence** rate; **coverage** of critical paths in test scope.

## Relationship to `testing-pro`

- Abuse-case and **security regression** tests belong in automation where possible.
- Full exploit chains often stay **manual** or **annual pen-test** — still feed learnings into CI checks.
