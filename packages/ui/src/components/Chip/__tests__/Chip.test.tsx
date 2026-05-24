import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type { ComponentProps } from 'react';
import { Chip } from '../Chip';

const renderChip = (props: ComponentProps<typeof Chip>) =>
  render(
    <ThemeProvider>
      <Chip {...props} />
    </ThemeProvider>
  );

describe('Chip', () => {
  it('renders label', () => {
    const { getByText } = renderChip({ label: 'React Native' });
    expect(getByText('React Native')).toBeTruthy();
  });

  it('renders solid, outlined, and subtle variants', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Chip label="Solid" variant="solid" />
        <Chip label="Outlined" variant="outlined" />
        <Chip label="Subtle" variant="subtle" color="primary" />
      </ThemeProvider>
    );
    expect(getByText('Solid')).toBeTruthy();
    expect(getByText('Outlined')).toBeTruthy();
    expect(getByText('Subtle')).toBeTruthy();
  });

  it('renders status colors', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Chip label="Success" color="success" />
        <Chip label="Error" color="error" />
        <Chip label="Warning" color="warning" />
        <Chip label="Info" color="info" />
      </ThemeProvider>
    );
    expect(getByText('Success')).toBeTruthy();
    expect(getByText('Error')).toBeTruthy();
    expect(getByText('Warning')).toBeTruthy();
    expect(getByText('Info')).toBeTruthy();
  });

  it('applies reduced opacity when disabled', () => {
    const { getByText, toJSON } = renderChip({
      label: 'Disabled',
      disabled: true,
    });
    expect(getByText('Disabled')).toBeTruthy();
    const tree = JSON.stringify(toJSON());
    expect(tree).toMatch(/"opacity":/);
  });

  it('calls onClick when pressed', () => {
    const onClick = jest.fn();
    const { getByText } = renderChip({
      label: 'Tap me',
      onClick,
      clickable: true,
    });
    fireEvent.press(getByText('Tap me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
