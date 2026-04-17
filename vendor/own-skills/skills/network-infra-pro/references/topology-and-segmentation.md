# Topology and segmentation

- Split by trust zones: public edge, private app, and restricted data layers.
- Keep environments separated (`dev`, `staging`, `prod`) to limit accidental lateral movement.
- Use subnet boundaries to isolate workloads with different blast radius and compliance needs.
- Prefer private service discovery and internal load balancing for east-west traffic.
- Define ownership for each subnet/route/security group to avoid drift.
