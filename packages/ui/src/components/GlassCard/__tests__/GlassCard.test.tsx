import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { GlassCard } from '../GlassCard';

test('GlassCard renders with children', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <GlassCard>Hello</GlassCard>
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
