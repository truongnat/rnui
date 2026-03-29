---
name: Code Explorer
command: /explore
description: Find and understand code by concept
---

# Code Explorer Skill

Search for code by concept and understand execution flows.

## Usage

```
/explore <concept or feature>
```

**IMPORTANT:** When multiple repositories are indexed, you MUST specify the repo:

```
/explore <concept> --repo rnui
```

## What It Does

1. Runs `gitnexus_query({query: "concept", repo: "rnui"})`
2. Returns execution flows grouped by process
3. Shows relevance-ranked results
4. Provides file locations and context

## Example

```
/explore authentication flow --repo rnui
```

Output:
- Process: UserAuthenticationFlow
  - Step 1: validateCredentials (auth/validator.ts)
  - Step 2: generateToken (auth/token.ts)
  - Step 3: storeSession (auth/session.ts)

## Multi-Repo Support

If GitNexus has multiple repos indexed, you'll see an error like:
```
Error: Multiple repositories indexed. Specify which one with the "repo" parameter.
Available: lachonglvn, lachonglvn-be, emplus, rnui
```

Always add `--repo <name>` to your command.

## When to Use

- Understanding unfamiliar code areas
- Finding where a feature is implemented
- Tracing execution flows
- Discovering related components
- Deep repository scanning for gaps and issues
