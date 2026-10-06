import DateTimePicker from '@react-native-community/datetimepicker';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { beforeEach, describe, expect, it, mock, test } from 'bun:test';
import { DateInput } from '../DateInput';
import { DatePicker } from '../DatePicker';
import { DateRangeInput } from '../DateRangeInput';
import { DateTimeInput } from '../DateTimeInput';

mock.module('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: mock(() => null),
}));

const DateTimePickerMock = DateTimePicker as unknown as ReturnType<typeof mock>;

describe('DatePicker', () => {
  beforeEach(() => {
    DateTimePickerMock.mockClear();
  });

  test('renders with label', () => {
    const { getByText } = render(
      <ThemeProvider>
        <DatePicker label="Pick Date" date={new Date()} onChange={() => {}} />
      </ThemeProvider>
    );
    expect(getByText('Pick Date')).toBeTruthy();
  });

  test('forwards locale and timezone props to DateTimePicker', () => {
    const onChange = mock();
    const { getByText } = render(
      <ThemeProvider>
        <DatePicker
          date={null}
          onChange={onChange}
          placeholder="Pick date"
          presets={[]}
          pickerStyle="spinner"
          locale="vi-VN"
          timeZoneOffsetInMinutes={420}
          timeZoneOffsetInSeconds={3600}
          timeZoneName="Asia/Ho_Chi_Minh"
        />
      </ThemeProvider>
    );
    fireEvent.press(getByText('Pick date'));
    expect(DateTimePickerMock).toHaveBeenCalled();
    const lastCall =
      DateTimePickerMock.mock.calls[
        DateTimePickerMock.mock.calls.length - 1
      ][0];
    expect(lastCall.locale).toBe('vi-VN');
    expect(lastCall.timeZoneOffsetInMinutes).toBe(420);
    expect(lastCall.timeZoneOffsetInSeconds).toBe(3600);
    expect(lastCall.timeZoneName).toBe('Asia/Ho_Chi_Minh');
  });

  test('clear button calls onChange with null', () => {
    const onChange = mock();
    const { getByLabelText } = render(
      <ThemeProvider>
        <DatePicker date={new Date(2024, 5, 15)} onChange={onChange} />
      </ThemeProvider>
    );
    fireEvent.press(getByLabelText('Clear date'));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  test('DateInput renders helper text and clears value', () => {
    const onChange = mock();
    const { getByLabelText, getByText } = render(
      <ThemeProvider>
        <DateInput
          label="Due Date"
          value={new Date(2024, 5, 15)}
          onChange={onChange}
          helperText="Used for planning"
        />
      </ThemeProvider>
    );

    expect(getByText('Used for planning')).toBeTruthy();
    fireEvent.press(getByLabelText('Clear date'));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  test('DateTimeInput uses datetime formatting', () => {
    const { getByText } = render(
      <ThemeProvider>
        <DateTimeInput
          value={new Date(2024, 5, 15, 9, 30)}
          onChange={() => {}}
          locale="en-US"
        />
      </ThemeProvider>
    );

    expect(getByText(/9:30/)).toBeTruthy();
  });

  test('DateRangeInput presets and clear call onChange', () => {
    const onChange = mock();
    const { getByLabelText, getByText } = render(
      <ThemeProvider>
        <DateRangeInput
          label="Report Range"
          value={{ start: new Date(2024, 5, 1), end: new Date(2024, 5, 15) }}
          onChange={onChange}
          presets={['last7']}
        />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Last 7 days'));
    expect(onChange).toHaveBeenCalledWith({
      start: expect.any(Date),
      end: expect.any(Date),
    });

    fireEvent.press(getByLabelText('Clear date'));
    expect(onChange).toHaveBeenLastCalledWith({ start: null, end: null });
  });
});
