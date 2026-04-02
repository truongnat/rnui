---
name: network-infra-pro
description: |
  Professional network and infrastructure guidance for application delivery: VPC/subnet design, DNS and TLS, ingress/egress controls, load balancing, connectivity patterns, and production observability.

  Use this skill when the user asks to design or review cloud/on-prem network topology, diagnose connectivity issues, harden service-to-service traffic, configure reverse proxy/load balancer behavior, or plan infrastructure rollout safety.

  Use **with** **`deployment-pro`** for rollout/rollback strategy, **`security-pro`** for threat modeling and hardening controls, and **`nestjs-pro`** / **`nextjs-pro`** when infrastructure decisions depend on framework runtime behavior.

  Triggers: "network", "infra", "VPC", "subnet", "NAT", "load balancer", "reverse proxy", "ingress", "egress", "DNS", "TLS", "service mesh", "connectivity", "latency", "firewall".

metadata:
  short-description: Network infra - topology, traffic, reliability, observability
---

# Network and infrastructure (professional)

Use official [AWS VPC docs](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html), [Kubernetes networking docs](https://kubernetes.io/docs/concepts/cluster-administration/networking/), and [Cloudflare DNS docs](https://developers.cloudflare.com/dns/) for API/platform truth; this skill encodes **least-privilege network design**, **reliability-first traffic architecture**, and **operable diagnostics**. Confirm **environment**, **cloud/platform**, **traffic profile**, and **availability/security requirements** from the project before proposing changes.

## Related skills (this repo)

| Skill | When to combine with `network-infra-pro` |
|-------|------------------------------------------|
| **`deployment-pro`** | Progressive rollout, canary, and rollback for infra/network changes |
| **`security-pro`** | Threat model, authentication boundaries, and hardening policy |
| **`nextjs-pro`** | Edge/runtime behavior and caching/CDN implications |
| **`nestjs-pro`** | API gateway/reverse proxy behavior and service communication |

**Boundary:** **`network-infra-pro`** owns topology, routing, connectivity, and reliability trade-offs; paired skills own app/deployment/security implementation depth.

## When to use

- Designing VPC/VNet, subnet segmentation, NAT, and private/public service boundaries.
- Defining ingress/egress policy, firewall/SG rules, and service-to-service communication paths.
- Configuring DNS, TLS termination, reverse proxy, and load balancer routing behavior.
- Troubleshooting timeout, packet loss, cross-region latency, and intermittent connectivity failures.
- Reviewing network changes for blast radius, failover behavior, and observability readiness.
- Trigger keywords: `network`, `infra`, `VPC`, `subnet`, `NAT`, `DNS`, `TLS`, `load balancer`, `ingress`, `egress`

## Workflow

1. Confirm environment and constraints: platform, topology scope, security requirements, latency SLO, and failure tolerance.
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep blast radius and rollback path explicit.
3. Respond using **Suggested response format**; note main risks around outages, misconfiguration, and security exposure.

### Operating principles

1. **Default deny, then open intentionally** - minimize exposed paths and ports.
2. **Prefer private-by-default topology** - public entry points should be explicit and minimal.
3. **Separate control/data traffic where possible** - reduce noisy-neighbor and failure coupling.
4. **Design for failure and rollback** - assume DNS/LB/route changes can fail partially.
5. **Observe every layer** - DNS, LB, proxy, app, and dependency metrics must correlate.
6. **Document traffic contracts** - source, destination, protocol, and ownership are explicit.

### Topology and segmentation (summary)

- Organize network boundaries by trust zone, environment, and workload criticality; keep east-west traffic scoped.

Details: [references/topology-and-segmentation.md](references/topology-and-segmentation.md)

### Traffic management and edge (summary)

- Define DNS, TLS, load balancer, reverse proxy, and health-check strategy with clear failover behavior.

Details: [references/traffic-management-and-edge.md](references/traffic-management-and-edge.md)

### Reliability and observability (summary)

- Track end-to-end latency, error rates, saturation, and path-level failure signals for rapid triage.

Details: [references/reliability-and-observability.md](references/reliability-and-observability.md)

### Tips and tricks (summary)

- Use practical conventions for naming, network diagrams, change windows, and staged rollout.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle asymmetric routing, MTU mismatch, DNS propagation delay, and partial region outages.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Connectivity/reliability/security target and impacted scope.
2. **Recommendation** - Proposed topology/routing/policy changes and rationale.
3. **Code** - Config snippets, policy matrix, rollout checklist, or architecture pseudocode - still labeled **Code**.
4. **Residual risks** - Blast radius, rollback complexity, security gaps, and monitoring blind spots.

## Resources in this skill

- `references/` - detailed guidance for topology, edge traffic, observability, and tricky failure modes.

| Topic | File |
|-------|------|
| Topology and segmentation | [references/topology-and-segmentation.md](references/topology-and-segmentation.md) |
| Traffic management and edge | [references/traffic-management-and-edge.md](references/traffic-management-and-edge.md) |
| Reliability and observability | [references/reliability-and-observability.md](references/reliability-and-observability.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Our API in private subnets intermittently times out after adding a new NAT route. How should we fix and roll out safely?"  
**Expected output:** Diagnose route/NAT dependency path, propose safer subnet/egress policy, add LB and flow-log checks, then provide staged rollout and rollback checkpoints.

## Checklist before calling the skill done

- [ ] Scope and trust boundaries are explicit (public/private/internal).
- [ ] Traffic path and control points (DNS/LB/proxy/firewall) are documented.
- [ ] Failover and rollback path is defined before change execution.
- [ ] Security exposure and least-privilege policy are reviewed.
- [ ] Observability signals and alert thresholds are included.
