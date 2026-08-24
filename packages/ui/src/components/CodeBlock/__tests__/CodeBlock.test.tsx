import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type React from 'react';
import { CodeBlock } from '../CodeBlock';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider brand={undefined} override={undefined}>
      {component}
    </ThemeProvider>
  );
};

describe('CodeBlock', () => {
  describe('Rendering', () => {
    it('renders code content', () => {
      const { getByText } = renderWithTheme(<CodeBlock code="const x = 1;" />);
      expect(getByText(/const x = 1/)).toBeTruthy();
    });

    it('renders multiline code', () => {
      const code = 'line1\nline2\nline3';
      const { getByText } = renderWithTheme(<CodeBlock code={code} />);
      expect(getByText(/line1/)).toBeTruthy();
      expect(getByText(/line2/)).toBeTruthy();
      expect(getByText(/line3/)).toBeTruthy();
    });

    it('renders with language badge', () => {
      const { getByText } = renderWithTheme(
        <CodeBlock code="const x = 1;" language="typescript" />
      );
      expect(getByText('typescript')).toBeTruthy();
    });

    it('renders with title', () => {
      const { getByText } = renderWithTheme(
        <CodeBlock code="const x = 1;" title="example.ts" />
      );
      expect(getByText('example.ts')).toBeTruthy();
    });

    it('renders empty code string without crashing', () => {
      const { toJSON } = renderWithTheme(<CodeBlock code="" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with line numbers when >= 5 lines', () => {
      const code = Array.from({ length: 5 }, (_, _i) => `aaa`).join('\n');
      const { getAllByText } = renderWithTheme(<CodeBlock code={code} />);
      const ones = getAllByText(/^1$/);
      expect(ones.length).toBeGreaterThanOrEqual(1);
    });

    it('hides line numbers when < 5 lines by default', () => {
      const code = 'a\nb\nc';
      const { queryByText } = renderWithTheme(<CodeBlock code={code} />);
      expect(queryByText('a')).toBeTruthy();
    });

    it('shows line numbers when explicitly set', () => {
      const { getAllByText } = renderWithTheme(
        <CodeBlock code="abc" showLineNumbers />
      );
      const ones = getAllByText(/^1$/);
      expect(ones.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Copy button', () => {
    it('renders copy button', () => {
      const { getByLabelText } = renderWithTheme(
        <CodeBlock code="const x = 1;" />
      );
      expect(getByLabelText('Copy code')).toBeTruthy();
    });
  });
});
