import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { TabBar, TabBarItem } from '../TabBar';

test('TabBar renders with children', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <TabBar>
        <TabBarItem value="home" label="Home" icon={null} />
        <TabBarItem value="settings" label="Settings" icon={null} />
      </TabBar>
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
