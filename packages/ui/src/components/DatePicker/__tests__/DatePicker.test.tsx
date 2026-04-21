import DateTimePicker from "@react-native-community/datetimepicker";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "@truongdq01/headless";
import { DatePicker } from "../DatePicker";

jest.mock("@react-native-community/datetimepicker", () => ({
	__esModule: true,
	default: jest.fn(() => null),
}));

const DateTimePickerMock = DateTimePicker as unknown as jest.Mock;

describe("DatePicker", () => {
	beforeEach(() => {
		DateTimePickerMock.mockClear();
	});

	test("renders with label", () => {
		const { getByText } = render(
			<ThemeProvider>
				<DatePicker label="Pick Date" date={new Date()} onChange={() => {}} />
			</ThemeProvider>,
		);
		expect(getByText("Pick Date")).toBeTruthy();
	});

	test("forwards locale and timezone props to DateTimePicker", () => {
		const onChange = jest.fn();
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
			</ThemeProvider>,
		);
		fireEvent.press(getByText("Pick date"));
		expect(DateTimePickerMock).toHaveBeenCalled();
		const lastCall =
			DateTimePickerMock.mock.calls[
				DateTimePickerMock.mock.calls.length - 1
			][0];
		expect(lastCall.locale).toBe("vi-VN");
		expect(lastCall.timeZoneOffsetInMinutes).toBe(420);
		expect(lastCall.timeZoneOffsetInSeconds).toBe(3600);
		expect(lastCall.timeZoneName).toBe("Asia/Ho_Chi_Minh");
	});

	test("clear button calls onChange with null", () => {
		const onChange = jest.fn();
		const { getByLabelText } = render(
			<ThemeProvider>
				<DatePicker date={new Date(2024, 5, 15)} onChange={onChange} />
			</ThemeProvider>,
		);
		fireEvent.press(getByLabelText("Clear date"));
		expect(onChange).toHaveBeenCalledWith(null);
	});
});
