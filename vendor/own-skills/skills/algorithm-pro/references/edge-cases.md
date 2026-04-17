# Edge cases

- **Overflow/underflow**: intermediate values exceed integer bounds.
- **Degenerate input**: empty arrays, single node, disconnected graph components.
- **Pathological distribution**: all values equal, strictly increasing/decreasing, repeated duplicates.
- **Negative cycles/weights**: invalidates shortest-path assumptions for some algorithms.
- **Recursion depth**: deep trees/graphs can crash stack in DFS recursion.
- **Precision drift**: floating-point accumulation errors in geometric/probabilistic routines.
