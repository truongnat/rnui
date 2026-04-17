# Stream/RTC tips and tricks

## 1) Topology selection by use case

- Use mesh only for very small rooms.
- Use SFU for most multi-party realtime apps.
- Use CDN/HLS fallback for large one-to-many broadcast where interactivity is limited.

## 2) Signaling robustness

- Keep signaling transport reliable and stateful with explicit session/version IDs.
- Handle renegotiation and ICE restarts as first-class flows, not exceptional paths.
- Add reconnect backoff + jitter and stale-session cleanup.

## 3) Media adaptation strategy

- Enable simulcast/SVC when available for heterogeneous network conditions.
- Adjust bitrate/resolution/framerate based on packet loss, RTT, and client CPU.
- Prioritize audio continuity over video quality under severe congestion.

## 4) NAT traversal and relay planning

- Provide multiple STUN/TURN endpoints across regions.
- Monitor TURN usage ratio and relay bandwidth to control cost and risk.
- Plan strict fallback paths when direct P2P fails.

## 5) QoE and observability

- Track join success rate/time, reconnect success, freeze ratio, and mean opinion proxies.
- Correlate signaling events with RTP stats for root-cause analysis.
- Alert on ICE failure spikes, TURN saturation, and regional degradation.

## 6) Security and privacy basics

- Authenticate signaling, authorize room access, and rotate session credentials.
- Encrypt media end-to-end where product/security model requires.
- Limit metadata exposure in logs and analytics pipelines.
