# Navigation and platform patterns (iOS vs Android)

Design-level orientation — implementation lives in **`react-native-pro`** / **`flutter-pro`**.

## Mental model

| Topic | iOS (HIG) | Android (Material 3) |
|-------|-----------|----------------------|
| **Back** | Swipe-from-edge, top-left chevron in nested flows | **Predictive back** gesture, system back; **FAB** less central to “up” |
| **Primary nav** | Tab bar at **bottom** (common) | **Navigation bar** + **bottom** nav or **rail** on tablets |
| **Actions** | **Toolbar** trailing; **share** in top actions | **Overflow** menu (three dots), **FAB** for primary create |
| **Sheets** | **Modal** sheets slide up; drag indicator | **Bottom sheets** (standard vs full); **side nav** drawer |

**Rule:** Don’t ship **iOS clone** on Android or vice versa — users expect **platform conventions** unless you have a strong unified brand system (still document exceptions).

## Patterns

- **Tabs** — Limited count (often 3–5); **badges** for counts; avoid nested tabs that confuse hierarchy.
- **Stack depth** — Deep hierarchies tire users; **hub-and-spoke** or **search** for large IA.
- **Gestures** — **Swipe actions** on list rows (reveal affordance); **discoverability** — not only gesture with no hint.
- **Modals** — Use sparingly; **full-screen** vs **sheet** vs **dialog** by content weight.

## System UI integration

- **Status bar** — Light/dark content style vs background contrast.
- **Pull to refresh** — Standard expectation on lists; pair with **empty** and **error** states.

## Tablets and foldables

- **Master-detail** — List + detail side-by-side when width allows; **avoid** stretched single-column phone layouts on large screens.

## Wear / automotive / TV

Out of default scope — treat as separate form factors if the product expands.
