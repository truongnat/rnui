# Edge cases

- **Clock skew**: token appears expired/not-yet-valid across distributed systems.
- **Session fixation**: attacker reuses predictable session identifiers.
- **Partial revocation**: user removed from role but cached tokens still grant access.
- **Cross-device inconsistency**: logout from one device does not invalidate others.
- **Tenant boundary drift**: authz checks miss tenant scope under complex joins/caches.
- **IdP outage fallback**: external identity provider failure impacts login availability.
