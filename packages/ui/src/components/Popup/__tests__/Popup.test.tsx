import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Popup } from '../Popup';

test('Popup renders with required props', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Popup open={false} message="Hello" />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
