---
name: stream-rtc-pro
description: |
  Professional realtime streaming and RTC guidance for designing low-latency media systems with reliable signaling, adaptive quality, and secure operation.

  Use this skill when building or reviewing WebRTC/RTC streaming architecture, call/session lifecycle, media transport behavior, and production scaling strategy.

  Triggers: "webrtc", "rtc", "streaming", "rtp", "sfu", "turn", "stun", "signaling", "jitter", "packet loss", "media edge case".

  Combine with `websocket-pro` for signaling channels and `performance-tuning-pro` for realtime quality/latency optimization.
metadata:
  short-description: Stream/RTC — signaling, media transport, QoS, scale, security, edge cases
---

# Stream and RTC (professional)

Use official [WebRTC specification](https://w3c.github.io/webrtc-pc/), [IETF RTP/RTCP RFCs](https://datatracker.ietf.org/wg/avtcore/documents/), and [MDN WebRTC docs](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) for standards truth; this skill encodes **production-grade realtime media defaults**, **network-aware session design**, and **operational safety for low-latency streaming**. Confirm **topology** (P2P/SFU/MCU), **latency targets**, and **device/network profile** from the project.

## Related skills (this repo)

| Skill | When to combine |
|-------|------------------|
| `websocket-pro` | Build robust signaling/reconnect flow for offers/answers/ICE updates. |
| `performance-tuning-pro` | Tune end-to-end media quality, latency, and resource usage. |

## When to use

- Designing realtime audio/video architecture for conferencing, live rooms, or interactive streaming.
- Reviewing signaling flow, ICE negotiation, reconnect, and media session lifecycle.
- Improving quality under packet loss, jitter, bandwidth fluctuation, and device variability.
- Scaling SFU-based systems while preserving stability and user experience.
- Trigger keywords: `webrtc`, `rtc`, `streaming`, `rtp`, `sfu`, `turn`, `stun`, `signaling`, `jitter`, `packet loss`, `media edge case`

## Workflow

1. **Confirm** versions / environment / stack (browser/device matrix, NAT profile, topology, codec policy, latency and quality SLO).
2. **Apply the principles and topic summaries below; open `references/` when you need depth.**
3. **Respond using **Suggested response format**;** note the main risks (ICE failure, degraded QoE, signaling race, media security/privacy issues).

### Operating principles

1. **Signaling and media are separate concerns** - keep negotiation/state transitions explicit and recoverable.
2. **Assume hostile networks** - design for NAT traversal failure, jitter, loss, and bandwidth collapse.
3. **Adapt quality continuously** - bitrate, resolution, and layer strategy should react to runtime conditions.
4. **Lifecycle rigor is critical** - session start/reconnect/end states must be deterministic.
5. **Security and privacy are first-class** - authenticated signaling and protected media paths are mandatory.

### Stream/RTC tips and tricks (summary)

- Use clear session state machine for join, negotiate, connected, reconnecting, and teardown.
- Prefer SFU for multi-party scale; avoid pure mesh beyond small rooms.
- Tune congestion control and simulcast/SVC policies per participant/network class.
- Capture QoE metrics (join time, freeze ratio, packet loss, RTT, bitrate) for feedback loops.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Stream/RTC edge cases (summary)

- ICE candidate timing races can cause stuck connections during reconnect.
- TURN-only fallback can increase cost/latency and saturate relays under load.
- Mobile background/foreground transitions can desync signaling and media states.
- Device codec/capability mismatch can silently degrade quality or fail negotiation.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - define media/realtime reliability or quality objective.
2. **Recommendation** - propose topology, signaling, and adaptation decisions with rationale.
3. **Code** - provide signaling flow, session state, QoS policy, or infra checklist.
4. **Residual risks** - list operational, network, and compatibility risks.

## Resources in this skill

Use these files for deeper detail when concise guidance in this file is not enough.

| Topic | File |
|-------|------|
| Practical stream/RTC patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Realtime media failure modes and edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Design scalable WebRTC architecture for 50k concurrent viewers with low-latency interactive audio."  
**Expected output:** Topology + signaling + adaptation strategy with concrete reliability/security controls and rollout risks.

## Checklist before calling the skill done

- [ ] Topology and session lifecycle are explicitly defined.
- [ ] NAT traversal/reconnect strategy and fallback behavior are documented.
- [ ] At least one QoE degradation edge case and one security edge case are addressed.
- [ ] Code section includes concrete signaling/media policy actions.
- [ ] Residual risks include scaling and multi-device compatibility concerns.
