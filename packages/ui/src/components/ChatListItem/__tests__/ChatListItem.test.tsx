import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { ChatListItem } from '../ChatListItem';

test('ChatListItem renders with required props', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ChatListItem name="John Doe" />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
