import { performance } from 'perf_hooks';

function currentApproach(selected: any[], options: any[], placeholder: string) {
  if (!selected || (Array.isArray(selected) && selected.length === 0))
    return placeholder;
  if (Array.isArray(selected)) {
    const labels = selected
      .map((v) => options.find((o) => o.value === v)?.label)
      .filter(Boolean);
    return labels.join(', ');
  }
  return options.find((o) => o.value === selected)?.label ?? placeholder;
}

function optimizedApproach(
  selected: any[],
  options: any[],
  placeholder: string
) {
  if (!selected || (Array.isArray(selected) && selected.length === 0))
    return placeholder;
  if (Array.isArray(selected)) {
    const optionsMap = new Map();
    for (let i = 0; i < options.length; i++) {
      optionsMap.set(options[i].value, options[i].label);
    }
    const labels = selected.map((v) => optionsMap.get(v)).filter(Boolean);
    return labels.join(', ');
  }
  return options.find((o) => o.value === selected)?.label ?? placeholder;
}

const optionsCount = 10000;
const selectedCount = 1000;

const options = Array.from({ length: optionsCount }, (_, i) => ({
  value: `val_${i}`,
  label: `Label ${i}`,
}));
const selected = Array.from(
  { length: selectedCount },
  (_, i) => `val_${Math.floor(Math.random() * optionsCount)}`
);

// Warm up
for (let i = 0; i < 10; i++) {
  currentApproach(selected, options, 'Placeholder');
  optimizedApproach(selected, options, 'Placeholder');
}

let start = performance.now();
for (let i = 0; i < 100; i++) {
  currentApproach(selected, options, 'Placeholder');
}
const currentAges = performance.now() - start;

start = performance.now();
for (let i = 0; i < 100; i++) {
  optimizedApproach(selected, options, 'Placeholder');
}
const optimizedAges = performance.now() - start;

console.log(`Current approach: ${currentAges.toFixed(2)}ms`);
console.log(`Optimized approach: ${optimizedAges.toFixed(2)}ms`);
console.log(
  `Improvement: ${(((currentAges - optimizedAges) / currentAges) * 100).toFixed(2)}%`
);
