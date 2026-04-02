# WebSocket edge cases

## Reconnect and ordering hazards

- In-flight messages during disconnect can be lost or delivered out of order.
- Client reconnect before server cleanup can create duplicate session state.

## Network and infrastructure surprises

- Reverse proxies may terminate idle sockets sooner than app expectations.
- TLS termination and proxy headers can break origin/auth assumptions.

## Backpressure and slow consumers

- Slow clients can cause per-connection queue growth and memory pressure.
- Broadcast fan-out can overwhelm upstream services without throttling.

## Multi-instance consistency

- Missing shared presence/state causes "ghost online" or stale room membership.
- Non-sticky routing can break per-node in-memory subscriptions.

## Security pitfalls

- Missing per-event authorization allows privilege bypass after handshake.
- Unbounded payloads and high-frequency frames can be used for DoS.
- Token expiry during long-lived sockets can leave stale authorization context.

## Operational reliability traps

- Deploy restarts can drop all connections and trigger reconnect storms.
- Clock skew between nodes can affect event ordering and expiry logic.
