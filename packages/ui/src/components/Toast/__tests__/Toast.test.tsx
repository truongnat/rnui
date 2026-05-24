import { render } from '@testing-library/react-native';
import {
  dismissAllToasts,
  showToast,
  ThemeProvider,
} from '@truongdq01/headless';
import { resolveComponentTokens, semanticTokens } from '@truongdq01/tokens';
import { ToastContainer } from '../ToastContainer';

describe('Toast tokens regression', () => {
  it('defines action label color from brand.text', () => {
    const { toast } = resolveComponentTokens(semanticTokens.light);
    expect(toast.action.color).toBe(semanticTokens.light.color.brand.text);
  });
});

describe('ToastContainer', () => {
  beforeEach(() => {
    dismissAllToasts();
  });

  test('renders empty container', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <ToastContainer />
      </ThemeProvider>
    );
    expect(toJSON()).toBeTruthy();
  });

  test('renders toast action label', () => {
    showToast({
      message: 'Item archived',
      persistent: true,
      action: { label: 'Undo', onPress: () => {} },
    });

    const { getByText } = render(
      <ThemeProvider>
        <ToastContainer />
      </ThemeProvider>
    );
    expect(getByText('Undo')).toBeTruthy();
    expect(getByText('Item archived')).toBeTruthy();
  });
});
