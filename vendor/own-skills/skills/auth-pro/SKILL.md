---
name: auth-pro
description: |
  Professional authentication and authorization guidance across web/mobile/API systems: identity flows, credential and token lifecycle, session/JWT/OAuth/OIDC/API-key patterns, and policy enforcement models (RBAC/ABAC/ReBAC).

  Use this skill when the user asks to design or review auth architecture, compare auth methods, implement secure login/session/token flows, enforce authorization boundaries, or troubleshoot access-control failures and token misuse.

  Use **with** **`security-pro`** for broader threat modeling and hardening, **`nestjs-pro`** / **`nextjs-pro`** for framework wiring, **`postgresql-pro`** for data-layer policy/RLS boundaries, and **`testing-pro`** for auth regression and abuse-case tests.

  Triggers: "authentication", "authorization", "auth", "login", "session", "JWT", "OAuth", "OIDC", "SAML", "API key", "mTLS", "RBAC", "ABAC", "ReBAC", "MFA", "refresh token", "SSO", "access control".

metadata:
  short-description: Auth - authentication, authorization, token/session lifecycle
---

# Authentication and authorization (professional)

Use standards and vendor docs as authority for protocol details: [OAuth 2.0 (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749), [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html), and [JWT (RFC 7519)](https://datatracker.ietf.org/doc/html/rfc7519); this skill encodes **method-selection discipline**, **least-privilege authorization design**, and **token/session lifecycle safety**. Confirm **trust boundaries**, **client types** (web/mobile/machine), **threat model**, and **compliance constraints** before proposing a solution.

## Related skills (this repo)

| Skill | When to combine with `auth-pro` |
|-------|---------------------------------|
| **`security-pro`** | Threat modeling, abuse scenarios, defense-in-depth controls |
| **`nestjs-pro`** / **`nextjs-pro`** | Guards/middleware/session wiring and framework APIs |
| **`postgresql-pro`** | RLS and data ownership constraints for authz enforcement |
| **`testing-pro`** | Auth flow tests, permission regression, token/session abuse tests |

**Boundary:** **`auth-pro`** focuses on authn/authz methods and policy architecture; framework and platform skills own implementation-specific APIs and deployment details.

## When to use

- Choosing among session, JWT, OAuth/OIDC, API key, SAML, or mTLS by context.
- Designing user auth, service-to-service auth, and delegated authorization.
- Building role/attribute/relationship-based access control models.
- Hardening token/session lifecycle (issue, rotate, revoke, expire, recover).
- Reviewing or debugging broken permissions, stale sessions, and auth bypass risks.
- Trigger keywords: `authentication`, `authorization`, `JWT`, `OAuth`, `OIDC`, `RBAC`, `ABAC`, `MFA`, `SSO`

## Workflow

1. Confirm actors, trust boundaries, client types, data sensitivity, and required assurance level.
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep method choice and authz policy boundaries explicit.
3. Respond using **Suggested response format**; note risks around token leakage, privilege escalation, and revocation gaps.

### Operating principles

1. **Identity proofing before access** - authn strength must match risk level.
2. **Authz is server-side truth** - never trust client role claims without verification.
3. **Least privilege by default** - deny-first policy and scoped permissions.
4. **Short-lived credentials** - minimize token/session lifetime and rotate secrets.
5. **Explicit lifecycle controls** - issuance, refresh, revocation, and auditability are mandatory.
6. **Method follows context** - choose protocols by actor, trust, and operational constraints.

### Authentication methods and selection (summary)

- Compare password/session, JWT, OAuth/OIDC, SAML, API key, and mTLS for user/app/service scenarios.

Details: [references/authentication-methods-and-selection.md](references/authentication-methods-and-selection.md)

### Authorization models and policy design (summary)

- Define RBAC/ABAC/ReBAC boundaries, resource ownership, and enforcement points.

Details: [references/authorization-models-and-policy.md](references/authorization-models-and-policy.md)

### Token/session lifecycle and hardening (summary)

- Design secure issuance, storage, rotation, revocation, and anomaly detection.

Details: [references/token-session-lifecycle.md](references/token-session-lifecycle.md)

### Tips and tricks (summary)

- Use practical defaults for secure cookies, refresh strategy, MFA, and key rotation.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle clock skew, cross-device logout, partial revocation, and multi-tenant privilege drift.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Auth problem, actors, and required assurance.
2. **Recommendation** - Selected method/model with rationale and trade-offs.
3. **Code** - Flow diagram steps, policy matrix, config checklist, or pseudocode - still labeled **Code**.
4. **Residual risks** - Revocation gaps, session fixation, privilege escalation, and monitoring blind spots.

## Resources in this skill

- `references/` - deep guidance for method selection, policy design, and lifecycle hardening.

| Topic | File |
|-------|------|
| Authentication methods and selection | [references/authentication-methods-and-selection.md](references/authentication-methods-and-selection.md) |
| Authorization models and policy | [references/authorization-models-and-policy.md](references/authorization-models-and-policy.md) |
| Token/session lifecycle | [references/token-session-lifecycle.md](references/token-session-lifecycle.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Need full auth for web + mobile + API partners. Which methods should we use?"  
**Expected output:** Method matrix (session/JWT/OAuth/API key), authz model (RBAC+ABAC), token/session lifecycle controls, and prioritized rollout with testing and residual risks.

## Checklist before calling the skill done

- [ ] Actors and trust boundaries are explicitly defined.
- [ ] Authn method choice matches client types and risk profile.
- [ ] Authz model and server-side enforcement points are clear.
- [ ] Token/session lifecycle controls are complete (issue/rotate/revoke/expire).
- [ ] Residual risks and verification strategy are documented.
