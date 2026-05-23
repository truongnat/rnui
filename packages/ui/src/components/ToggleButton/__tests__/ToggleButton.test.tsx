import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { ToggleButton, ToggleButtonGroup } from '../ToggleButton';

test('ToggleButton renders children', () => {
  const { getByText } = render(
    <ThemeProvider>
      <ToggleButtonGroup value={['bold']}>
        <ToggleButton value="bold">B</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
  expect(getByText('B')).toBeTruthy();
});
