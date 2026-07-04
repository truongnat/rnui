import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Gradient } from '../Gradient';

test('Gradient renders with children', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Gradient>Content</Gradient>
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
