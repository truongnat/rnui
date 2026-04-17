# Token/session lifecycle

- Issue credentials with explicit audience, scope, and short expiry.
- Rotate refresh tokens and signing keys on defined cadence.
- Support revocation for compromised devices/users and high-risk events.
- Store tokens securely (httpOnly + secure cookies, platform secure storage).
- Validate signature, issuer, audience, nonce/state (when applicable), and clock tolerance.

Operational controls:

1. Detect anomalous sign-in/session patterns.
2. Invalidate sessions on password reset or role downgrade.
3. Maintain audit logs for login, refresh, revoke, and failed authorization checks.
