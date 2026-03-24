---
title: "AI Edge Case Investigation, Design System Ownership, and the Silent Killer: BE/FE Validation Drift"
date: 2026-03-24
type: "day"
summary: "Three hard-won lessons: let AI deep-investigate edge cases early, own your design system before it owns you, and never let BE and FE validation rules drift apart."
tags: ["AI", "Edge Cases", "Design System", "Validation", "Regex", "Architecture", "Frontend", "Backend"]
---

Today was one of those days where the lessons aren't from books—they're from scars.

## What I Learned

### 1. 🤖 Let AI Deep-Investigate Edge Cases Early

One shift in how I work with AI that changed everything: **don't just ask AI to build—ask it to break.**

Before shipping any feature, I now explicitly prompt the AI to do a deep investigation of edge cases. Not just "happy path" validation, but:

- What happens when the input is empty, null, or undefined?
- What if two async operations race each other?
- What if the user does something we never anticipated?
- What are the boundary conditions for every rule in this feature?

The reason this matters so much: **edge cases discovered late are expensive**. An edge case caught in the design phase costs almost nothing. The same edge case found in production after it's caused data corruption, a crashed session, or a broken payment flow? That's a full-day incident, a postmortem, and a trust problem with users.

AI is genuinely good at this when prompted correctly. It can systematically enumerate scenarios a human might gloss over because we pattern-match to the "normal" case too quickly.

**Key takeaways:**
- Prompt AI explicitly: *"Find all edge cases and failure modes for this logic"*
- Do this before writing code, not after
- Treat AI edge case reports like a checklist — go through every item, don't just skim
- The earlier you catch it, the cheaper it is to fix

---

### 2. 🎨 Build and Investigate Your Own Design System

I've been relying on off-the-shelf component libraries and adapting them project by project. It works — until it doesn't.

Today I realized: **building your own design system isn't about reinventing the wheel, it's about knowing every part of the wheel you're riding.**

The process I want to commit to:

1. **Build a base design system** — tokens (colors, spacing, typography, radius), core components (Button, Input, Card, Modal), and interaction patterns
2. **Then investigate it against the project** — does this component handle loading states? Does this input work on mobile keyboards? Does this color contrast pass WCAG? Does the spacing hold up at every breakpoint?

The key word is *investigate*. You can't just build and ship. You have to deliberately stress-test your own system against the real use cases of the project. What looks clean in Storybook often breaks in the wild.

**Key takeaways:**
- A design system you built yourself is one you can actually debug
- After building, run a structured investigation: accessibility, responsiveness, edge states (empty, loading, error, overflow)
- Document every decision — future-you will thank you
- A custom design system that fits your project perfectly beats a generic one 80% of the way

---

### 3. ⚠️ The Silent Killer: Unsynchronized Validation Between BE and FE

This one has burned me before and today it became crystal clear: **regex and validation rules that live separately on the frontend and backend are a ticking time bomb.**

The scenario:
- Frontend validates a phone number with one regex pattern
- Backend validates the same field with a slightly different pattern
- A user enters a perfectly valid number that passes FE validation
- The API rejects it
- Nobody knows why
- The user gives up

Or worse — the backend accepts something the frontend marked as invalid, creating a path to corrupted or unexpected data.

The root cause is always the same: **the rules were written independently, at different times, by different people, without a shared source of truth.**

The fix isn't just "sync the regex" — it's a process change:

1. **Define validation rules in one place** — a shared spec document, a shared validation library, or a contract that both sides reference
2. **Document every usecase and edge case when writing a rule** — what does "valid" actually mean? What formats are allowed? What characters? What length limits? What about international formats?
3. **Write the regex once, test it together** — if BE is Node.js and FE is React, you can literally share the same validation package
4. **Test cross-platform explicitly** — write integration tests that submit values from the FE validation boundary and assert the BE accepts them

The discipline is: **never write a regex or a validation rule without documenting the full list of cases it must handle and the cases it must reject.**

**Key takeaways:**
- Treat validation rules as a shared contract, not an implementation detail
- Document: what is valid, what is invalid, what are the edge formats, what are the cultural/regional variants
- If you can share the actual validation code between BE and FE — do it
- Add integration tests specifically for validation boundary cases
- When a validation rule changes on one side, it's a breaking change — treat it like one

---

## How I Will Apply This

Starting from the next feature I build: before writing any code, I'll ask AI to enumerate edge cases and validation scenarios first. That output becomes the test spec.

For design systems: I'll start small — a token file and three components — and run a structured investigation before expanding. Own the foundation before building floors on top.

For validation: every field with a rule gets a comment block listing every case. If the rule exists on both BE and FE, they reference the same source. No exceptions.

## Questions I Still Have

- What's the best pattern for sharing validation logic across a monorepo with separate FE (React Native) and BE (NestJS) packages?
- When AI investigates edge cases, how do I know its list is *complete* vs. just *plausible*?
- How do you maintain a custom design system without it becoming a second full-time job?

---
"The edge case you didn't investigate is the bug that will define your production incident."
