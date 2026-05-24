import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { resolveComponentTokens, semanticTokens } from '@truongdq01/tokens';
import { Snackbar } from '../Snackbar';

describe('Snackbar tokens regression', () => {
  it('uses elevated surface and primary text', () => {
    const { snackbar } = resolveComponentTokens(semanticTokens.light);
    expect(snackbar.container.backgroundColor).toBe('#FDFCFF');
    expect(snackbar.container.borderWidth).toBe(1);
    expect(snackbar.text.color).toBe(semanticTokens.light.color.text.primary);
    expect(snackbar.action.color).toBe(semanticTokens.light.color.brand.text);
  });
});

test('Snackbar renders message', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Snackbar open={true} message="Saved successfully" />
    </ThemeProvider>
  );
  expect(getByText('Saved successfully')).toBeTruthy();
});
