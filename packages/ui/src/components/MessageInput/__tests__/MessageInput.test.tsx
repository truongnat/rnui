import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { MessageInput } from '../MessageInput';

test('MessageInput renders with default props', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <MessageInput />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
