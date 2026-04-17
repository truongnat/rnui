# Bug discovery edge cases

## Stale graph

- Index from **yesterday** + **large refactor** today → **`impact`** may be wrong; **re-index** or verify manually.

## Name collisions

- **`context`** on a common name — **disambiguate** with `file_path` or `uid` from prior results.

## Dynamic code

- **Reflection**, stringly `require()`, **eval** — graph may be **incomplete**; not a GitNexus bug.

## Monorepos

- **Wrong `repo`** — Cross-package bugs need correct **repo** parameter or `list_repos`.

## False positives from shape_check

- **Consumer** fetches **multiple** routes — attribution may be **approximate**; read consumer code.

## “Found nothing”

- Symptom in **native** code, **browser** only, or **infra** — graph may not cover; expand scope.

## Security

- Do not paste **secrets** into queries; use **redacted** logs.
