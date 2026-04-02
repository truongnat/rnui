---
name: websocket-pro
description: |
  Professional WebSocket guidance for designing reliable, secure, and scalable realtime communication in production systems.

  Use this skill when implementing or reviewing WebSocket architecture, message contracts, connection lifecycle, reconnection behavior, and realtime operational reliability.

  Triggers: "websocket", "realtime", "ws", "connection lifecycle", "heartbeat", "reconnect", "backpressure", "pubsub", "socket auth", "delivery guarantee", "edge case".

  Combine with `security-pro` for hardening realtime channels and `performance-tuning-pro` for throughput/latency optimization.
metadata:
  short-description: WebSocket — protocol, reliability, scaling, security, edge cases
---

# WebSocket (professional)

Use official [RFC 6455 WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455), [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket), and [WHATWG WebSockets](https://websockets.spec.whatwg.org/) for standards truth; this skill encodes **production reliability defaults**, **message-contract discipline**, and **secure realtime operations**. Confirm **deployment topology** (single node vs cluster), **client behavior**, and **delivery/latency requirements** from the project.

## Related skills (this repo)

| Skill | When to combine |
|-------|------------------|
| `security-pro` | Validate channel auth, token/session handling, and abuse controls. |
| `performance-tuning-pro` | Tune fan-out, throughput, and latency under load. |

## When to use

- Designing realtime features with persistent client-server socket connections.
- Reviewing WebSocket reliability (heartbeat, reconnect, ordering, duplicate handling).
- Scaling pub/sub fan-out across instances and regions.
- Hardening WebSocket endpoints against abuse, leaks, and operational instability.
- Trigger keywords: `websocket`, `realtime`, `ws`, `connection lifecycle`, `heartbeat`, `reconnect`, `backpressure`, `pubsub`, `socket auth`, `delivery guarantee`, `edge case`

## Workflow

1. **Confirm** versions / environment / stack (runtime, gateway/proxy behavior, load balancer policy, connection scale target, reliability guarantees).
2. **Apply the principles and topic summaries below; open `references/` when you need depth.**
3. **Respond using **Suggested response format**;** note the main risks (message loss/duplication, unauthorized access, reconnect storms, resource exhaustion).

### Operating principles

1. **Define message contracts early** - stable event names, payload schema, and error semantics.
2. **Treat network as unreliable** - design reconnect, retry, idempotency, and ordering strategy explicitly.
3. **Control lifecycle and resources** - heartbeat, timeout, cleanup, and connection limits are mandatory.
4. **Scale with backpressure awareness** - protect server and downstream systems from burst fan-out.
5. **Secure every channel** - authenticate handshake, authorize events, and limit abuse vectors.

### WebSocket tips and tricks (summary)

- Use explicit message envelope (`type`, `id`, `timestamp`, `payload`, optional `traceId`) for observability and evolution.
- Implement ping/pong heartbeat and idle timeout to detect dead peers quickly.
- Use exponential backoff with jitter for reconnect to avoid thundering-herd recovery.
- Separate command vs event channels semantically to simplify permissions and monitoring.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### WebSocket edge cases (summary)

- Reconnect race conditions can reorder messages or duplicate side effects.
- Proxy/load balancer idle timeout can silently drop sockets without app-level awareness.
- Slow consumer clients can create memory pressure and queue growth on server.
- Sticky-session assumptions break in multi-instance deployments without shared state/pubsub.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - define realtime reliability/security/performance target.
2. **Recommendation** - propose architecture and protocol behavior with rationale.
3. **Code** - provide event contract, lifecycle flow, retry/backpressure, or infra checklist.
4. **Residual risks** - list remaining operational/security trade-offs and follow-up.

## Resources in this skill

Use these files for deeper detail when concise guidance in this file is not enough.

| Topic | File |
|-------|------|
| Practical WebSocket patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Realtime failure modes and edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Design websocket architecture for realtime notifications at 100k concurrent connections."  
**Expected output:** Contract + lifecycle + scaling/security decisions with concrete retry/backpressure and operational safeguards.

## Checklist before calling the skill done

- [ ] Message contract and lifecycle states are explicitly defined.
- [ ] Reconnect/retry/ordering/idempotency strategy is documented.
- [ ] At least one scaling edge case and one security edge case are addressed.
- [ ] Code section includes concrete protocol/infra actions.
- [ ] Residual risks include operational monitoring and incident fallback.
