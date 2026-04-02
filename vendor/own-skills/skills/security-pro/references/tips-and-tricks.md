# Tips and tricks

Platform-agnostic practices; stack-specific wiring (Nest guards, Next middleware) belongs in **`nestjs-pro`** / **`nextjs-pro`** etc.

## Authentication and sessions

- Prefer **standard** protocols (OAuth2/OIDC) over custom crypto; short-lived tokens.
- **HttpOnly** `Secure` cookies for session where applicable; avoid localStorage for sensitive tokens.
- **Rotate** refresh tokens; detect reuse; rate-limit login and MFA enrollment.

## Authorization

- **Every** sensitive action checks authorization on the **server** — never trust client-only checks.
- **Resource-scoped** checks: `can(user, action, resourceId)` not only role names.
- **Idempotency** keys for sensitive mutations (payments) to avoid double-spend.

## Input and output

- **Validate** schema at boundaries (DTO, OpenAPI); reject unknown fields (`whitelist`).
- **Encode** output for context (HTML vs JSON vs shell); avoid string concat for SQL — use parameterized queries.
- **File uploads**: type/size limits, scan, store outside web root, random names.

## Secrets and configuration

- **No secrets** in git; use vaults / CI secrets / env injection; separate dev/staging/prod.
- **Rotate** on incident; audit who accessed production secrets.

## APIs

- **Rate limiting** and **request size** limits; correlation IDs for tracing.
- **CORS** minimal allowlist; no `*` with credentials in production.

## Infrastructure

- **TLS** everywhere in transit; **HSTS** for web; disable weak ciphers.
- **Network segmentation**; private subnets for DB; no public DB ports.

## Dependencies

- Lockfiles; **SCA** (Dependabot, Snyk); review transitive upgrades for supply-chain risk.
