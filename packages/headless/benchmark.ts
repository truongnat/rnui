import { performance } from 'perf_hooks';

type SelectOption = { value: string; label: string };
type Selected = string | string[] | null | undefined;

function currentLabelApproach(
  selected: Selected,
  options: SelectOption[],
  placeholder: string
): string {
  if (!selected || (Array.isArray(selected) && selected.length === 0))
    return placeholder;
  if (Array.isArray(selected)) {
    const optionsMap = new Map<string, string>();
    for (let i = 0; i < options.length; i++) {
      const o = options[i]!;
      optionsMap.set(o.value, o.label);
    }
    const labels = selected
      .map((v) => optionsMap.get(v))
      .filter((x): x is string => Boolean(x));
    return labels.join(', ');
  }
  return options.find((o) => o.value === selected)?.label ?? placeholder;
}

function optimizedLabelApproach(
  selected: Selected,
  optionsMap: Map<string, string>,
  options: SelectOption[],
  placeholder: string
): string {
  if (!selected || (Array.isArray(selected) && selected.length === 0))
    return placeholder;
  if (Array.isArray(selected)) {
    const labels = selected
      .map((v) => optionsMap.get(v))
      .filter((x): x is string => Boolean(x));
    return labels.join(', ');
  }
  return optionsMap.get(selected as string) ?? placeholder;
}

function currentIsSelected(val: string, selected: Selected) {
  if (!selected) return false;
  if (Array.isArray(selected)) return selected.includes(val);
  return selected === val;
}

function optimizedIsSelected(val: string, selected: Selected, selectedSet: Set<string>) {
  if (!selected) return false;
  if (Array.isArray(selected)) return selectedSet.has(val);
  return selected === val;
}


const optionsCount = 10_000;
const selectedCount = 1_000;

const options = Array.from({ length: optionsCount }, (_, i) => ({
  value: `val_${i}`,
  label: `Label ${i}`,
}));
const selected = Array.from(
  { length: selectedCount },
  (_, i) => `val_${Math.floor(Math.random() * optionsCount)}`
);

const optionsMap = new Map<string, string>();
for (let i = 0; i < options.length; i++) {
  optionsMap.set(options[i]!.value, options[i]!.label);
}

const selectedSet = new Set(selected);


console.log('--- label lookups ---');
// Warm up
for (let i = 0; i < 10; i++) {
  currentLabelApproach(selected, options, 'Placeholder');
  optimizedLabelApproach(selected, optionsMap, options, 'Placeholder');
}

let start = performance.now();
for (let i = 0; i < 100; i++) {
  currentLabelApproach(selected, options, 'Placeholder');
}
const currentLabelTime = performance.now() - start;

start = performance.now();
for (let i = 0; i < 100; i++) {
  optimizedLabelApproach(selected, optionsMap, options, 'Placeholder');
}
const optimizedLabelTime = performance.now() - start;

console.log(`Current approach: ${currentLabelTime.toFixed(2)}ms`);
console.log(`Optimized approach: ${optimizedLabelTime.toFixed(2)}ms`);
console.log(
  `Improvement: ${(((currentLabelTime - optimizedLabelTime) / currentLabelTime) * 100).toFixed(2)}%`
);

console.log('\n--- membership checks ---');
// Warm up
for (let i = 0; i < 1000; i++) {
  currentIsSelected('val_5000', selected);
  optimizedIsSelected('val_5000', selected, selectedSet);
}

start = performance.now();
for (let i = 0; i < 10000; i++) {
  currentIsSelected('val_5000', selected);
}
const currentMembershipTime = performance.now() - start;

start = performance.now();
for (let i = 0; i < 10000; i++) {
  optimizedIsSelected('val_5000', selected, selectedSet);
}
const optimizedMembershipTime = performance.now() - start;

console.log(`Current approach: ${currentMembershipTime.toFixed(2)}ms`);
console.log(`Optimized approach: ${optimizedMembershipTime.toFixed(2)}ms`);
console.log(
  `Improvement: ${(((currentMembershipTime - optimizedMembershipTime) / currentMembershipTime) * 100).toFixed(2)}%`
);
