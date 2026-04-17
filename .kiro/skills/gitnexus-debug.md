---
name: Debug Flow
command: /debug
description: Debug issues using execution flow analysis
---

# Debug Flow Skill

Debug issues by tracing execution flows and analyzing symbol relationships.

## Usage

```
/debug <error or symptom>
```

## What It Does

1. Runs `gitnexus_query({query: "error or symptom"})`
2. Identifies relevant execution flows
3. Uses `gitnexus_context` on suspect functions
4. Traces the full execution path
5. Suggests potential root causes

## Example

```
/debug button not responding to press
```

Workflow:

1. Find flows related to "button press"
2. Get context on Button component
3. Check all callers and event handlers
4. Trace execution: onPress → handler → state update
5. Identify broken link in the chain

## When to Use

- Investigating bugs
- Understanding error propagation
- Tracing state changes
- Finding missing handlers
- Regression analysis

## For Regressions

```
gitnexus_detect_changes({scope: "compare", base_ref: "main"})
```

Shows what changed between branches.
