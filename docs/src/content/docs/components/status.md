---
title: Component status
description: Maturity and notes for selected RNUI components.
---

# Component status

This table reflects current documentation and test coverage. Status is conservative: **stable** means documented, tested in CI, and used in the example app unless noted.

| Component | Category | Status | Notes |
| --------- | -------- | ------ | ----- |
| Button | Input / action | stable | Core primitive; unit tests |
| Input | Forms | stable | Includes label, error, floating label |
| Card | Layout | stable | Optional pressable mode |
| Badge | Data display | stable | Dot and label variants |
| Checkbox | Forms | stable | Works with form patterns |
| Switch | Forms | stable | Animated toggle |
| Select | Forms | beta | Optional `@shopify/flash-list` for lists |
| List | Data display | beta | Compound list API |
| BottomSheet | Overlay | beta | Gesture + snap points |
| Modal | Overlay | stable | Native modal wrapper |
| Toast | Feedback | beta | Toast host pattern |
| Box | Layout | stable | Token-based layout primitive |
| Stack | Layout | stable | Flex stack helper |
| Grid | Layout | beta | Responsive grid helper |
| Tabs | Navigation | stable | Compound tabs |
| AppBar | Navigation | stable | Header bar |
| Typography | Data display | stable | Text variants |
| GlassCard | Layout | beta | Optional `expo-blur`; translucent fallback |
| Gradient | Layout | beta | Optional `expo-linear-gradient` |
| Rating | Forms | stable | Accessibility and animation tested |

## Status definitions

| Status | Meaning |
| ------ | ------- |
| **stable** | Documented, covered by tests where applicable, suitable for typical app use |
| **beta** | Usable but API or native integration may still evolve; review optional deps |
| **experimental** | Early or limited coverage; use with caution |

For the full component list, see the [Components](/components/button/) sidebar or [`packages/ui/src/index.ts`](https://github.com/truongnat/rnui/blob/develop/packages/ui/src/index.ts).

## Optional native modules

| Module | Components affected |
| ------ | ------------------- |
| `@shopify/flash-list` | Select (performance) |
| `expo-blur` | GlassCard |
| `expo-linear-gradient` | Gradient |
| `react-native-svg` | Icon, CircularProgress |
| `lucide-react-native` | Icon |

Install peers in your **app** directory so autolinking works in monorepos.
