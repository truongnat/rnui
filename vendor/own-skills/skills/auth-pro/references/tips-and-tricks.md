# Tips and tricks

- Use PKCE for public OAuth clients (mobile/SPA).
- Prefer httpOnly secure cookies over localStorage for sensitive web tokens.
- Keep access tokens short-lived and refresh tokens rotating.
- Scope API keys minimally and rotate automatically.
- Add clear permission naming conventions (`resource:action`) for maintainability.
