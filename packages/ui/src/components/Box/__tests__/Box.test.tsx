import { render } from "@testing-library/react-native";
import { ThemeProvider } from "@truongdq01/headless";
import { Text } from "react-native";
import { Box } from "..";

test("Box renders children correctly", () => {
	const { getByText } = render(
		<ThemeProvider>
			<Box>
				<Text>Inside Box</Text>
			</Box>
		</ThemeProvider>,
	);
	expect(getByText("Inside Box")).toBeTruthy();
});
