# Mobile design edge cases

## Accessibility

- **Screen readers** — Order matches visual order; **headings** for structure; **labels** on every icon-only control.
- **Reduce motion** — Replace parallax with static; don’t tie **essential** info to motion only.
- **Color** — Sunlight glare and **night** mode; contrast in **both**; status not color-only.

## Internationalization

- **RTL** — Mirrored **back** chevrons, **FAB** position conventions; test **mixed** LTR numbers in RTL UI.
- **Text expansion** — Buttons **grow** or **wrap**; German strings overflow English mocks.

## Hardware and OS

- **Split screen / multi-window** — Resize; state survives **narrow** width.
- **Foldables** — **Hinge** area: don’t put primary actions under crease; **continuity** across folded states.
- **Low memory** — Background kill; **restore** form state and scroll position.

## Network

- **Intermittent** — Optimistic UI with **revert** on failure; **idempotent** actions where possible.
- **Captive portal / airplane** — Dedicated **offline** screen with **what works** vs not.

## Input

- **External keyboard** — **Tab** order on tablets; don’t assume **touch only**.
- **Stylus** — Smaller targets possible but don’t require stylus for core flows.

## Platform review risk

- **Payments, subscriptions** — Use **IAP** where required; web-only pay flows can violate store rules (**product/legal**, not only design).

## Deep links

- **Cold start** — User lands mid-flow; **graceful** join or **reset** with explanation.
