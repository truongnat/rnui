# Reliability and observability

Core signals:

- End-to-end latency (`p50`, `p95`, `p99`) per critical path.
- Error rates by layer (DNS resolution, TLS handshake, LB, proxy, app).
- Saturation metrics (connection count, queue depth, bandwidth, packet drops).
- Availability by zone/region and failover transition success.
- Change correlation: network config deploys vs incident timeline.

Operational checks:

1. Enable flow logs and edge access logs for triage.
2. Alert on sudden timeout spikes and cross-zone traffic anomalies.
3. Correlate dependency health with route/proxy changes.
4. Keep runbooks for common failure classes (DNS, cert, route, LB target health).
