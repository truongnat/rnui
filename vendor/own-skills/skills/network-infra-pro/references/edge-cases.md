# Edge cases

- **Asymmetric routing**: return path differs from forward path, causing intermittent drops.
- **MTU mismatch**: hidden fragmentation creates sporadic timeout behavior.
- **DNS propagation lag**: mixed old/new records during rollout can split traffic unexpectedly.
- **Certificate chain issues**: cert appears valid locally but fails on specific clients/proxies.
- **Partial region outage**: health checks pass in one zone while dependent services fail elsewhere.
- **Implicit dependency drift**: forgotten allow-list entries break egress after policy tightening.
