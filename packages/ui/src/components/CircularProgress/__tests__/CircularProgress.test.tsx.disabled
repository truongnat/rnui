import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { CircularProgress } from '../CircularProgress';

// TODO: Fix react-native-svg Touchable.Mixin error
// Error occurs because react-native-svg@15.15.4's internal code accesses actual react-native module before mocks take effect
// Possible fixes:
// 1. Downgrade react-native-svg to a version without this issue
// 2. Patch react-native-svg package
// 3. Switch to a different SVG library
// 4. Switch from Bun to npm/yarn for testing (might avoid hoisting issue)
test.skip('CircularProgress renders - react-native-svg Touchable.Mixin error cannot be fixed with mocking', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <CircularProgress value={50} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
