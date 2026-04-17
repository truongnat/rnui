# Design system edge cases

## Accessibility

- **Color-only status** — Don’t rely on red/green alone; add icon, text, or pattern.
- **Custom selects** — Often break SR/keyboard unless built to **WAI-ARIA** patterns.
- **Infinite scroll** — “Skip to end,” **bookmark**, and **screen reader** announcements rarely handled well.

## Internationalization

- **Text expansion** — German/Russian longer than English; **truncate** rules and **wrapping** in buttons.
- **RTL** — Mirroring layout; **icons** that imply direction (back arrows).
- **Locales** — Date/number/currency formats; don’t hardcode in UI strings.

## Data edge cases

- **Very large numbers** — Abbreviate (`1.2M`) with **tooltip** full value or configurable precision.
- **Missing data** — `—` vs `N/A` vs hide series; be consistent.
- **Time zones** — Always show **user-relative** or explicit **TZ** in global tools.

## Themes

- **Images on dark** — Logos and illustrations with **light** backgrounds may need **dark** variants.
- **Elevation on dark** — Shadows less visible; use **borders** or **surface tints**.

## Desktop vs web

- **Shortcut conflicts** — Browser vs OS vs app shortcuts; document overrides.
- **High DPI** — Blurry icons if raster assets wrong resolution; **SVG** or 2×/3× where needed.

## Governance edge cases

- **“Just this once”** — Document **exception** with expiry or risk acceptance; else debt accumulates.
- **Third-party embeds** — Charts, maps, chat widgets — style clashes; **isolate** or theme-wrapper.
