import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { CircularProgress } from '../CircularProgress';

test('CircularProgress renders successfully', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <CircularProgress value={50} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
