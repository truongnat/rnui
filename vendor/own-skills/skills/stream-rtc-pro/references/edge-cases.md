# Stream/RTC edge cases

## Signaling and negotiation races

- Offer/answer collisions can cause negotiation loops without glare handling.
- ICE candidate arrival before remote description setup may lead to dropped candidates.

## Network volatility

- Mobile network handover (Wi-Fi to LTE) can break media flow while signaling remains alive.
- High jitter with low packet loss can still create severe user-visible freezes.

## Device and codec variability

- Hardware encoder limitations can cap quality unexpectedly on low-end devices.
- Codec/profile mismatch across browsers can fail session setup or force poor fallback.

## TURN and infrastructure stress

- TURN relay overload increases latency and causes cascading session failures.
- Regional TURN outage can reduce join success if fallback routing is weak.

## Lifecycle inconsistencies

- Backgrounded mobile apps may pause media tracks but keep stale presence.
- Ghost participants occur when disconnect cleanup fails after abrupt client termination.

## Security and abuse risks

- Unauthorized room join via weak signaling auth leaks media streams.
- Replay or forged signaling messages can disrupt session state if integrity checks are missing.
