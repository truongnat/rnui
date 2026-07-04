import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import type React from 'react';
import { Calendar } from '../Calendar';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

describe('Calendar', () => {
  it('calls onChange in single selection mode', () => {
    const onChange = jest.fn();
    const selectedDate = new Date(2024, 0, 10);

    const { getByLabelText } = renderWithTheme(
      <Calendar initialMonth={selectedDate} onChange={onChange} />
    );

    fireEvent.press(getByLabelText(selectedDate.toDateString()));
    expect(onChange).toHaveBeenCalledWith(selectedDate);
  });

  it('builds a range across two taps', () => {
    const onRangeChange = jest.fn();
    const start = new Date(2024, 0, 10);
    const end = new Date(2024, 0, 15);

    const { getByLabelText, rerender } = renderWithTheme(
      <Calendar
        selectionMode="range"
        initialMonth={start}
        range={{ start: null, end: null }}
        onRangeChange={onRangeChange}
      />
    );

    fireEvent.press(getByLabelText(start.toDateString()));
    expect(onRangeChange).toHaveBeenCalledWith({ start, end: null });

    rerender(
      <ThemeProvider>
        <Calendar
          selectionMode="range"
          initialMonth={start}
          range={{ start, end: null }}
          onRangeChange={onRangeChange}
        />
      </ThemeProvider>
    );

    fireEvent.press(getByLabelText(end.toDateString()));
    expect(onRangeChange).toHaveBeenLastCalledWith({ start, end });
  });

  it('notifies when an unavailable date is pressed', () => {
    const unavailableDate = new Date(2024, 0, 13);
    const onUnavailableDatePress = jest.fn();

    const { getByLabelText } = renderWithTheme(
      <Calendar
        initialMonth={unavailableDate}
        dateConstraints={(date) =>
          date.getDay() === 6
            ? { disabled: true, reason: 'Weekends are unavailable' }
            : false
        }
        onUnavailableDatePress={onUnavailableDatePress}
      />
    );

    fireEvent.press(getByLabelText(unavailableDate.toDateString()));
    expect(onUnavailableDatePress).toHaveBeenCalledWith(
      unavailableDate,
      'Weekends are unavailable'
    );
  });
});
