# JavaScript edge cases

## Execution order and scheduling

- Microtasks (`Promise.then`, `queueMicrotask`) run before macrotasks (`setTimeout`), which can reorder expected side effects.
- `await` yields control even for already-resolved values, potentially exposing race conditions in shared mutable state.

## `this`, closures, and scope

- `this` depends on how a function is called; method extraction (`const fn = obj.method`) loses receiver binding.
- Arrow functions do not have their own `this`, `arguments`, or `new.target`.
- Loop variable capture can be wrong with `var`; use `let` for per-iteration binding.

## Type coercion and equality

- `==` performs coercion and can hide bugs (`'' == 0`, `false == 0`); prefer `===` unless coercion is intentional.
- `NaN !== NaN`; use `Number.isNaN(value)` when validating numeric results.
- Floating-point math is imprecise; compare with tolerance for money/scientific calculations.

## Objects, prototypes, and keys

- `for...in` iterates enumerable inherited keys too; guard with own-property checks.
- `__proto__` and prototype mutation can introduce security and correctness issues (prototype pollution vectors).
- JSON serialization drops `undefined`, functions, symbols, and loses `Date` object identity.

## Modules and runtime compatibility

- ESM and CommonJS interop can produce different default/named import behavior.
- Top-level await changes module initialization timing and may create startup deadlocks in dependency cycles.
- Platform differences (browser vs Node.js) affect globals (`window`, `process`, `Buffer`, `fetch` availability/version).
