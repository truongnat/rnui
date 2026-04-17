# Content analysis edge cases

## Unusable or partial input

- **Corrupt file** — State failure; ask for re-upload or alternative format.
- **Password-protected PDF** — Cannot analyze without unlock; do not ask for password in insecure channels.

## Legal and ethical

- **Illegal content** — Refuse analysis; suggest appropriate reporting channels per platform policy.
- **Minors / non-consensual** — Do not facilitate harm; follow safety policies.

## Ambiguity

- **Memes / satire** — Intent may not be literal; flag **context** unknown.
- **Deepfakes** — Visual authenticity not guaranteed; note **verification** limits.

## Multimodal mismatch

- **Alt text only** — If only description available, label analysis as **second-hand**.
- **Audio without video** — Transcript may miss emphasis, sarcasm, background noise.

## Privacy

- **Accidental PII in screenshot** — Offer to **redact** in summary; warn user to crop before sharing.

## Long outputs

- **Token limits** — Offer **continued** analysis in parts or **index** of sections for follow-up.
