import { validateComponentProps } from './src/validators';

const iterations = 100000;
const props = {
  variant: 'solid',
  size: 'md',
  colorScheme: 'primary',
  disabled: false,
  fullWidth: true,
};

const start = performance.now();
for (let i = 0; i < iterations; i++) {
  validateComponentProps('Button', props);
}
const end = performance.now();

console.log(`Duration for ${iterations} calls: ${end - start} ms`);
