const options = Array.from({ length: 10000 }).map((_, i) => ({
  label: `Option ${i}`,
  value: `${i}`,
}));

const query = '999';

console.log('=== Baseline ===');
const startBaseline = performance.now();
for (let i = 0; i < 100; i++) {
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;
}
const endBaseline = performance.now();
console.log(
  `Baseline time for 100 iterations: ${(endBaseline - startBaseline).toFixed(2)} ms`
);

console.log('=== Optimized ===');
const startOptimized = performance.now();
for (let i = 0; i < 100; i++) {
  const filtered = query
    ? (() => {
        const lowerQuery = query.toLowerCase();
        return options.filter((o) =>
          o.label.toLowerCase().includes(lowerQuery)
        );
      })()
    : options;
}
const endOptimized = performance.now();
console.log(
  `Optimized time for 100 iterations: ${(endOptimized - startOptimized).toFixed(2)} ms`
);

console.log('=== Optimized + memo (simulated) ===');
const startMemo = performance.now();
let memoizedResult;
for (let i = 0; i < 100; i++) {
  if (!memoizedResult) {
    memoizedResult = query
      ? (() => {
          const lowerQuery = query.toLowerCase();
          return options.filter((o) =>
            o.label.toLowerCase().includes(lowerQuery)
          );
        })()
      : options;
  }
}
const endMemo = performance.now();
console.log(
  `Optimized + memo time for 100 iterations: ${(endMemo - startMemo).toFixed(2)} ms`
);
