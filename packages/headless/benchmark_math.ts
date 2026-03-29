const iterations = 10_000_000;
const snapPoints = [100, 200, 300, 400, 500];

console.log(`Running benchmark with ${iterations} iterations...`);

// Baseline: Math.max with array spread
const startSpread = performance.now();
let resultSpread = 0;
for (let i = 0; i < iterations; i++) {
  resultSpread = Math.max(...snapPoints);
}
const endSpread = performance.now();
const timeSpread = endSpread - startSpread;

// Optimized: using a cached value
const maxHeight = Math.max(...snapPoints);
const startCached = performance.now();
let resultCached = 0;
for (let i = 0; i < iterations; i++) {
  resultCached = maxHeight;
}
const endCached = performance.now();
const timeCached = endCached - startCached;

console.log(`Math.max(...snapPoints): ${timeSpread.toFixed(2)}ms`);
console.log(`Cached value: ${timeCached.toFixed(2)}ms`);
console.log(`Improvement: ${((timeSpread - timeCached) / timeSpread * 100).toFixed(2)}%`);
