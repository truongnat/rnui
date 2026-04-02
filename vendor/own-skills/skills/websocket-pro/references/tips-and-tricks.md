# WebSocket tips and tricks

## 1) Message contract first

- Use a stable envelope: `type`, `id`, `timestamp`, `payload`, `traceId`.
- Version event payloads additively to keep old clients functioning.
- Define explicit ack/error semantics for critical operations.

## 2) Connection lifecycle management

- Track states clearly: connecting, authenticated, active, degraded, closed.
- Implement heartbeat (ping/pong) with strict timeout handling.
- Clean up subscriptions/resources immediately on disconnect.

## 3) Reconnect and delivery reliability

- Use reconnect backoff + jitter to prevent synchronized reconnect storms.
- Add client-generated operation IDs for idempotent command handling.
- Buffer outbound events with bounded queues and drop policy.

## 4) Scaling patterns

- Use pub/sub backbone (Redis, NATS, Kafka, etc.) for multi-instance fan-out.
- Keep room/channel membership in shared state when horizontal scaling.
- Design for stateless app nodes + distributed routing metadata.

## 5) Security defaults

- Authenticate during handshake and revalidate identity on sensitive operations.
- Authorize per channel/event, not only at connection establishment.
- Apply connection/message rate limits and payload size caps.

## 6) Observability and operations

- Log connection lifecycle and event errors with correlation IDs.
- Track active connections, send/receive rates, queue depth, and disconnect reasons.
- Add dashboards/alerts for reconnect spikes, heartbeat failures, and dropped messages.
