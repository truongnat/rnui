# OSI model and networking (security lens)

Reference for **where** controls and failures sit on the path from wire to application. Use alongside threat modeling — not a substitute for stack-specific hardening in `nestjs-pro` / `nextjs-pro` / etc.

## OSI — seven layers (mnemonic: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way)

| Layer | Name | Typical artifacts | Security relevance (examples) |
|-------|------|-------------------|-------------------------------|
| **7** | Application | HTTP, DNS, SMTP, APIs | Authz bugs, injection, protocol misuse, weak TLS config at app |
| **6** | Presentation | TLS (often debated), encoding | **TLS** often implemented here + L4/L5 in practice; canonicalization |
| **5** | Session | Session protocols (rare pure OSI) | Session fixation, timeout, SSO flows |
| **4** | Transport | TCP, UDP | SYN flood, connection exhaustion, port scanning, QUIC/TLS 1.3 |
| **3** | Network | IP, ICMP, routing | IP spoofing, fragmentation attacks, route hijacking, **SSRF** touches L3–L7 |
| **2** | Data link | Ethernet, Wi‑Fi MAC, ARP | ARP spoofing / MITM on LAN, MAC flooding, VLAN misconfig |
| **1** | Physical | Cables, radio | Tap, jamming, evil twin AP, physical access to racks |

**Note:** Real stacks follow **TCP/IP** more than pure OSI; TLS spans multiple layers. Mapping attacks to “layers” is **pedagogical** — prioritize **trust boundaries** and **data flows** in your system.

## TCP/IP vs OSI (rough mapping)

| TCP/IP | Maps to OSI (approx.) | Security focus |
|--------|-------------------------|----------------|
| **Link** | L1–L2 | Segment VLANs; 802.1X; Wi‑Fi WPA3 |
| **Internet** | L3 | Firewalls, routing filters, anti-spoofing |
| **Transport** | L4 | Stateful firewall, rate limits, TLS termination |
| **Application** | L5–L7 | WAF, API gateway, app authz, CSP |

## Deep networking topics (defender-oriented)

- **DNS** — cache poisoning, dangling records, **DNS rebinding** (browser → internal services), DoH/DoT policy.
- **TLS** — version/cipher suites, cert validation, **mTLS** for service-to-service, HSTS.
- **HTTP semantics** — smuggling (where front/back disagree), hop-by-hop headers, chunked encoding edge cases.
- **IP** — fragmentation overlap (historical), **source routing** disabled, bogon filters.
- **L2/L3 segmentation** — east-west controls in cloud (security groups, NSGs), “flat network” risk.

## How this ties to AppSec

- **SSRF** is often “make the **server** request an internal L3/L7 target” — fix with **deny-by-default** egress, URL allowlists, metadata hardening.
- **XSS/CSRF** are **L7** application/session issues — not fixed at firewall alone.
- **DDoS** spans **L3–L7** — volumetric vs application-layer; different mitigations (CDN, scrubbing, rate limits).

## Further reading

- [RFC 1122](https://datatracker.ietf.org/doc/html/rfc1122) — host requirements (TCP/IP).
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — transport and app controls.
- NIST / vendor guides on **network segmentation** and **zero trust** (conceptual complement to OSI).
