---
name: security-pro
description: |
  Professional application and platform security: threat modeling, secure design, authn/authz, secrets, crypto hygiene, API and client hardening, and operational security signals — cross-stack (web, mobile, API, backend, cloud).

  Use this skill when the user asks about security review, OWASP-style risks, XSS, CSRF, SSRF, injection, IDOR/BOLA, JWT/session hardening, TLS, headers (CSP, HSTS), secrets management, rate limiting, audit logging, dependency/supply-chain risk, mobile secure storage, or hardening CI/CD pipelines.

  Use this skill for **network-aware security**: OSI / TCP–IP mapping, DNS/TLS/segmentation concepts, and how attacks relate to layers. Use it for **attack-method literacy** (MITRE ATT&CK, OWASP testing mindset, kill-chain phases) from a **defender** perspective. Use it for **authorized** offensive simulation: internal pen-test style workflows, staging/lab self-assessment, purple-team exercises, and structured bug reporting — **never** for unauthorized testing.

  Use **with** stack skills for implementation wiring: **`nestjs-pro`** (Guards, ValidationPipe, HTTP errors), **`nextjs-pro`** (middleware, Server Actions, env boundaries), **`postgresql-pro`** (RLS, least-privilege roles), **`react-pro`** / **`flutter-pro`** / **`react-native-pro`** (XSS-safe UI, WebView, deep links), **`testing-pro`** (security-focused tests, SAST/DAST hooks in CI). This skill (`security-pro`) owns **cross-platform security principles and threat framing**; framework skills own **framework-specific APIs**.

  Triggers: "security", "secure", "OWASP", "XSS", "CSRF", "SSRF", "injection", "SQL injection", "IDOR", "BOLA", "auth", "authorization", "JWT", "session", "cookie", "CSP", "HSTS", "TLS", "secrets", "vault", "rate limit", "penetration", "threat model", "STRIDE", "CWE", "ASVS", "SAST", "DAST", "Dependabot", "supply chain", "encryption", "PII", "audit log", "hardening", "OSI", "TCP/IP", "network security", "MITRE", "ATT&CK", "kill chain", "red team", "purple team", "bug bounty", "pentest", "self-assessment", "attack simulation".

metadata:
  short-description: Security — AppSec, networking (OSI), attack methods (defensive), offensive simulation
---

# Security (professional)

Use [OWASP](https://owasp.org/) materials (Top 10, ASVS, cheat sheets) and your org’s security policy for authoritative guidance; this skill encodes **defense-in-depth habits**, **threat-aware design**, **network-layer context** (OSI/TCP–IP as a mental model), and **platform-agnostic** controls. Confirm **deployment model** (internet-facing, internal, mobile, multi-tenant), **regulatory** constraints, and **stack** when combining with repo `*-pro` skills. Any **simulated attack** or **pentest-style** activity must stay **in scope and authorized** (see `references/offensive-simulation-and-self-assessment.md`).

## Related skills (this repo)

| Skill | When to combine with `security-pro` |
|-------|--------------------------------------|
| **`nestjs-pro`** | Guards, pipes, DTO validation, exception filters, OpenAPI |
| **`nextjs-pro`** | Middleware, RSC vs client secrets, `NEXT_PUBLIC_` boundaries |
| **`postgresql-pro`** | RLS, roles, `BYPASSRLS`, migration safety |
| **`react-pro`** | XSS-safe patterns, CSP implications for client bundles |
| **`flutter-pro`** / **`react-native-pro`** | Secure storage, platform channels, deep links |
| **`testing-pro`** | Security test strategy, abuse-case tests in CI |

Do **not** duplicate framework-specific wiring; state **what** to enforce here and **where** to implement in the sibling skill.

## When to use

- **Threat modeling** or security review of a feature, API, or architecture.
- Hardening **authn/authz**, **sessions**, or **tokens** across web/mobile/API.
- **Secrets**, **TLS**, **headers**, **CORS**, **rate limiting**, **logging** (redaction).
- **Dependency** / supply-chain and **CI** security gates.
- **OSI / TCP–IP**, segmentation, DNS/TLS, and how **network** properties affect app threats (e.g. SSRF, MITM assumptions).
- **Attack-method** literacy: mapping controls to **MITRE ATT&CK** / OWASP-style classes; prioritizing detections and tests.
- **Authorized** self-assessment: staging/lab testing, purple-team collaboration, structured **findings** reports.
- Trigger keywords: `OWASP`, `XSS`, `JWT`, `RLS`, `secrets`, `CSP`, `threat model`, `IDOR`, `OSI`, `MITRE`, `pentest`, …

## Workflow

1. Confirm trust boundaries, sensitivity of data, deployment surface, and which **stack skills** apply.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer implementation details to **`nestjs-pro`** / **`nextjs-pro`** / **`postgresql-pro`** / … when applicable.
3. Respond using **Suggested response format**; note residual risks, verification (tests, pen-test), and compliance follow-ups when relevant.

### Operating principles

1. **Assume breach** — Layer controls; monitor and limit blast radius.
2. **Server-side truth** — Authorization and business rules enforced where attackers can’t bypass (API/server).
3. **Least privilege** — Users, services, DB roles, cloud IAM — minimum necessary.
4. **No secrets in code or logs** — Vault/CI secrets; structured redaction.
5. **Validate and encode** — Every boundary; context-appropriate encoding for output.
6. **Secure defaults** — Deny by default; explicit allow for dangerous operations.
7. **Authorized testing only** — No offensive simulation against systems or data outside **written scope** (even “your” prod may require approval).

### Fundamentals and threat modeling (summary)

- STRIDE-style thinking: **S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege — map to your system.
- Data classification drives controls (PII, payment, health).
- Document **trust boundaries** (browser, CDN, API gateway, DB).

Details: [references/fundamentals-and-threat-model.md](references/fundamentals-and-threat-model.md)

### OSI and networking (summary)

- Seven-layer **OSI** model as a map for **where** controls and failures appear; **TCP/IP** mapping for real stacks.
- **DNS**, **TLS**, **segmentation** (L2–L7) tied to common issues: SSRF, smuggling class bugs, lateral movement in flat networks.

Details: [references/osi-and-networking.md](references/osi-and-networking.md)

### Attack techniques and methods (summary)

- **Kill-chain** phases and **MITRE ATT&CK** / **OWASP** as catalogs — to design **detections**, **tests**, and **reviews**, not unauthorized exploitation.
- Web/API classes (injection, access control, SSRF, XSS) linked to **defensive** anchors.

Details: [references/attack-techniques-and-methods.md](references/attack-techniques-and-methods.md)

### Offensive simulation and self-assessment (summary)

- **Pen-test**, **red/purple** team, **bug bounty** — roles and when each fits.
- **Safe lab**: isolated env, synthetic data, CI-friendly **SAST/DAST/SCA**; **reporting** template for internal findings.

Details: [references/offensive-simulation-and-self-assessment.md](references/offensive-simulation-and-self-assessment.md)

### Tips and tricks (summary)

- Short-lived credentials; **rotate** on incident; **MFA** for privileged access.
- **Parameterized queries** / ORM correctly; never concatenate user input into SQL/shell.
- **Rate limit** auth and expensive endpoints; **size limits** on bodies and uploads.
- **Dependency** scanning and patch process; pin CI **third-party actions** to commit SHA when possible.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **JWT** misuse (long-lived, sensitive claims in client, algorithm `none`).
- **BOLA** / IDOR on every resource id exposed in APIs.
- **Multi-tenant** isolation failures (cache, logs, admin tools).
- **CI** secrets exposed to untrusted PR workflows.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Asset, threat, or compliance driver; which **Related skill** implements the fix.
2. **Recommendation** — Controls (prevent/detect/respond), priority, and stack touchpoints.
3. **Code** — Config snippet, pseudo-policy, checklist, or secure pattern — not a full framework tutorial duplicated from other skills.
4. **Residual risks** — Gaps for pen-test, monitoring, or process (patch cadence, IR).

## Resources in this skill

- `references/` — fundamentals, networking, attack catalogs, offensive simulation, tips, edge cases; keep long policy text out of `SKILL.md`.

| Topic | File |
|-------|------|
| Fundamentals & threat model | [references/fundamentals-and-threat-model.md](references/fundamentals-and-threat-model.md) |
| OSI & networking | [references/osi-and-networking.md](references/osi-and-networking.md) |
| Attack techniques (defensive catalog) | [references/attack-techniques-and-methods.md](references/attack-techniques-and-methods.md) |
| Offensive simulation & self-assessment | [references/offensive-simulation-and-self-assessment.md](references/offensive-simulation-and-self-assessment.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Public REST API returns 200 with another user’s order when `orderId` is guessed — possible IDOR.  
**Expected output:** Recommend server-side **authorization** check on every read; deny by default; cite **BOLA**; point to **`nestjs-pro`** for Guard placement; add integration test per **`testing-pro`**.

**Input:** Team wants a “hack ourselves” Friday on **staging** with a findings report.  
**Expected output:** Scope + **ROE** checklist from [references/offensive-simulation-and-self-assessment.md](references/offensive-simulation-and-self-assessment.md); tool categories (SAST/DAST/SCA); severity matrix; **no** prod testing without approval; link **`testing-pro`** for regression tests.

## Checklist before calling the skill done

- [ ] Trust boundaries and data sensitivity stated; authz enforced **server-side**.
- [ ] Secrets not in repo/logs; TLS and header basics considered for web exposure.
- [ ] Input validation and safe output encoding considered at boundaries.
- [ ] Framework-specific steps delegated to the right **`nestjs-pro`** / **`nextjs-pro`** / **`postgresql-pro`** / … skill.
- [ ] Residual risks and **verification** path (tests, review, pen-test) noted.
- [ ] If offensive simulation is discussed: **authorization**, **environment** (staging/lab), and **reporting** path are explicit.
