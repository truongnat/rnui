# Authentication methods and selection

- **Session-based auth**: strong fit for first-party web apps with secure cookies and server state.
- **JWT bearer tokens**: useful for stateless APIs; require strict expiry and audience/issuer checks.
- **OAuth 2.0 / OIDC**: preferred for delegated auth and SSO with external identity providers.
- **SAML**: common in enterprise SSO ecosystems with legacy federation requirements.
- **API key / mTLS**: suitable for machine-to-machine access with scoped permissions and rotation.

Selection rule:

1. Start from actor and trust boundary.
2. Choose protocol minimizing credential exposure and operational complexity.
3. Add MFA or step-up auth for high-risk operations.
