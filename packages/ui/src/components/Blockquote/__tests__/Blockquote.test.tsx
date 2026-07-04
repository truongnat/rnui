import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type React from 'react';
import { Blockquote } from '../Blockquote';

const renderWithTheme = (component: React.ReactElement) =>
  render(
    <ThemeProvider brand={undefined} override={undefined}>
      {component}
    </ThemeProvider>
  );

describe('Blockquote', () => {
  it('renders quote text', () => {
    const { getByText } = renderWithTheme(
      <Blockquote>Quoted content</Blockquote>
    );
    expect(getByText('Quoted content')).toBeTruthy();
  });

  it('renders cite attribution when provided', () => {
    const { getByText } = renderWithTheme(
      <Blockquote cite="— Author Name">Quoted content</Blockquote>
    );
    expect(getByText('Quoted content')).toBeTruthy();
    expect(getByText('— Author Name')).toBeTruthy();
  });

  it('omits cite when not provided', () => {
    const { queryByText } = renderWithTheme(
      <Blockquote>Only the quote</Blockquote>
    );
    expect(queryByText('— Author Name')).toBeNull();
  });

  it('applies left border from tokens', () => {
    const { toJSON } = renderWithTheme(
      <Blockquote>Border check</Blockquote>
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"borderLeftWidth":2');
  });
});
