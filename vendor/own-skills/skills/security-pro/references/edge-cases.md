# Edge cases

Cross-cutting security pitfalls that appear on **multiple** platforms.

## Auth and access

- **JWT in client** — theft via XSS; prefer short TTL + refresh + rotation; CSP to reduce XSS.
- **Subdomain** or **path** confusion — cookie scope, CSRF when sessions cross origins.
- **Admin** and **user** flows in same app — separate roles, strict route guards, audit logs for admin actions.
- **BOLA** (broken object-level authorization) — attacker changes UUID in URL; always verify ownership server-side.

## Crypto and time

- **Compare secrets** in **constant time**; avoid leaking validity via timing.
- **Clock skew** — JWT `nbf`/`exp` edge cases across regions.
- **Randomness** — use OS CSPRNG; **never** `Math.random()` for tokens or IDs.

## Mobile and desktop

- **Certificate pinning** — tradeoffs (updates, breakage); document operational cost.
- **Local storage** on device — assume device compromise; minimize sensitive data at rest.
- **Deep links** — validate intent; no open redirects to arbitrary URLs.

## Cloud and serverless

- **IAM** over-permissioned roles; **Lambda** env exposure; **metadata** endpoints in cloud — restrict network.
- **Multi-tenant** — strict tenant id in every query and policy; **no** cross-tenant leakage in caches or logs.

## Supply chain and CI

- **Poisoned** npm/pypi packages; pin hashes where possible; pin GitHub Actions to SHA.
- **Fork PRs** — do not run untrusted CI with secrets; use `pull_request_target` carefully.

## Logging and privacy

- **PII** and **tokens** in logs — redact; structured logging with allowlists.
- **Error messages** — no stack traces or internal paths to end users in production.
