# Authorization models and policy

- **RBAC**: role-based permissions; simple and auditable for stable org structures.
- **ABAC**: attribute-based policy for dynamic context (tenant, region, time, sensitivity).
- **ReBAC**: relationship-based controls for sharing/collaboration domains.
- Enforce authz at server entry points and resource ownership boundaries.
- Keep permissions scoped by action and resource, not broad role labels only.

Policy guardrails:

1. Deny by default.
2. Separate admin and operational privileges.
3. Log authz decisions for forensic traceability.
