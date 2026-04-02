# Deployment methods and environments

Orientation map — pick **one primary model** per workload; hybrid is common at org scale.

## By hosting shape

| Method | Typical use | Tradeoffs |
|--------|-------------|-----------|
| **Static / CDN** | SPAs, static sites, assets | Simple, fast edge; no server session unless paired with APIs |
| **PaaS** (Heroku-style, Railway, Render, Fly.io) | Apps with minimal ops | Fast to ship; vendor limits, cost at scale |
| **Containers** (Docker + orchestrator) | Services needing repeatable runtime | K8s/Nomad complexity; image supply chain |
| **Serverless** (functions + managed HTTP) | Event-driven, spiky load | Cold start, timeouts, vendor IAM; great for glue |
| **VM / IaaS** | Full control, legacy, Windows workloads | You patch OS; slower iteration than PaaS |
| **Bare metal** | Performance, compliance, GPU | Highest ops burden |
| **Edge** (Workers, Lambda@Edge, CDN compute) | Latency-sensitive, auth at edge | Limited runtime; distributed state is hard |

## Kubernetes (when it appears)

- **Workload types**: Deployment vs StatefulSet vs Job; **Ingress** vs service mesh.
- **Helm / Kustomize** — chart versioning; **values** per env (dev/stage/prod).
- **Resources**: requests/limits; **HPA** for scale; **PDB** for voluntary disruption.

## Serverless (generic)

- **Invocation** limits (payload, duration, memory); **concurrency** controls.
- **VPC** attachment for private DB — adds cold-start and networking complexity.
- **IaC**: SAM, Serverless Framework, Terraform modules — keep env parity.

## Mobile / desktop

- **Stores** (App Store, Play) — review pipelines, phased rollout, staged rollout %.
- **Electron / Tauri** — not “web deploy”; see **`electron-pro`** / **`tauri-pro`** for updater/signing.

## Data and state

- **Blue-green / canary** need **backward-compatible** DB migrations — coordinate with **`postgresql-pro`**.
- **Caches** and **feature flags** — invalidate or dual-write strategies during rollout.

## Official pointers (examples)

- [The Twelve-Factor App](https://12factor.net/) — config, logs, processes.
- Cloud provider well-architected / reliability pillars (AWS, GCP, Azure) for your chosen stack.
