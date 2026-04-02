# Traffic management and edge

- Treat DNS and TLS as first-class production dependencies, not setup-only tasks.
- Use explicit ingress paths: CDN/WAF -> load balancer -> reverse proxy -> service.
- Define health checks that reflect real readiness, not only process liveness.
- Keep timeout/retry budgets aligned across client, proxy, and service layers.
- Minimize egress and document all outbound destinations by purpose.
