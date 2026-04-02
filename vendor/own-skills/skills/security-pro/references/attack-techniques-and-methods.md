# Attack techniques and methods (defensive catalog)

**Use only on systems you own or have explicit written authorization to test.** This file catalogs **categories** of techniques so defenders can **recognize**, **prioritize**, and **test** controls — not a step-by-step exploitation manual.

## Why “hack methods” matter for builders

Understanding **attacker goals** (CIA triad, fraud, persistence) improves **threat modeling**, **test cases**, and **logging** (what to detect). Map work to [MITRE ATT&CK](https://attack.mitre.org/) (enterprise/cloud/mobile) and [OWASP](https://owasp.org/) (web/API/mobile).

## High-level phases (generic kill chain)

1. **Reconnaissance** — OSINT, DNS/subdomain enum, tech fingerprinting, social engineering prep.
2. **Initial access** — phishing, exposed admin, vuln exploit, credential stuffing, supply-chain.
3. **Execution / persistence** — malware, cron, web shells, compromised CI tokens.
4. **Privilege escalation** — kernel, container escape, overprivileged IAM, **BOLA** in APIs.
5. **Lateral movement** — pivot via RDP/SSH, service accounts, trust between hosts.
6. **Exfiltration / impact** — data theft, ransomware, defacement.

## Web / API / app (OWASP-aligned)

| Class | Examples (names only) | Defensive anchor |
|-------|----------------------|------------------|
| Injection | SQL, NoSQL, OS command, LDAP | Parameterized APIs, shell **avoidance**, input validation |
| Broken access control | IDOR, forced browsing, mass assignment | Server-side authz on **every** resource |
| Cryptographic failures | Weak TLS, bad KDF, keys in client | Standards, vault, no secrets in JS bundles |
| SSRF | Internal metadata, cloud APIs | Egress policy, URL allowlist, IMDS v2 |
| XSS | Stored/reflected/DOM | CSP, encode, sanitize by context |
| Deserialization | Pickle/YAML gadgets | Never trust pickled blobs; schema validation |

## Network-layer patterns (names)

- **MITM** on untrusted networks (ARP/DNS) — TLS + pinning tradeoffs; segment users from servers.
- **Scanning** — port/service discovery; reduce exposure, firewall default-deny.
- **Amplification** — reflector protocols; patch or filter at edge.

## Cloud / identity

- **Metadata** credential theft — IMDS hardening, short-lived roles, least privilege.
- **IAM** misconfigurations — `*` actions, trust policies too wide, cross-account assumptions.
- **Keys in repos** — pre-commit hooks, secret scanning.

## Mobile

- **Root/jailbreak** bypass assumptions — server-side truth; attestation where policy requires.
- **Insecure storage** — Keychain/Keystore patterns; minimize secrets on device.

## How to use this in reviews

- For each asset, ask: **which ATT&CK tactics** could apply?
- Turn gaps into **abuse-case tests** (see `testing-pro`) and **monitoring** use cases.

## Ethics and law

Unauthorized testing is **illegal** in most jurisdictions. Internal “hack yourself” programs belong in **`offensive-simulation-and-self-assessment.md`** (scope, ROE, staging).
