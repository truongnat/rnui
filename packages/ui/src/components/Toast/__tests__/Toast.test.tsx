import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { ToastContainer } from '../ToastContainer';

test('ToastContainer renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ToastContainer />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
