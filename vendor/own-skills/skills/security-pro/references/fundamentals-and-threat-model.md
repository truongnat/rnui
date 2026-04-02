# Fundamentals and threat modeling

Cross-platform application security: web, mobile, API, and backend services.

## Core ideas

- **Confidentiality, integrity, availability** — design controls for each asset.
- **Threat modeling** — identify actors, entry points, data flows, trust boundaries (STRIDE or simple abuse cases).
- **Least privilege** — humans, services, and DB roles get minimum access; separate admin from app role.
- **Defense in depth** — no single control; combine network, auth, validation, and monitoring.

## Common attack classes (orientation)

| Area | Examples |
|------|----------|
| Injection | SQL, command, LDAP, template injection |
| Broken access control | IDOR, missing authz on APIs, path traversal |
| Cryptography | Weak algorithms, missing TLS, bad key storage |
| Secrets | Hardcoded keys, env leaks in logs, CI logs |
| Client | XSS, CSRF (where relevant), insecure storage on mobile |

## Compliance and standards (pointers)

- **OWASP** Top 10, ASVS (application verification), **CWE** for root-cause classification.
- Align organizational policy (data residency, retention, PII) with technical controls.

## Secure SDLC (short)

- Security requirements in design; **review** auth and data flows before implementation.
- **Dependency** and **container** scanning in CI; patch cadence.
- **Incident response** playbook: who to page, how to rotate secrets.
