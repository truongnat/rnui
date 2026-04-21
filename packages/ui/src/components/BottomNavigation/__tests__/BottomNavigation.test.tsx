import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "@truongdq01/headless";
import { BottomNavigation, BottomNavigationAction } from "../BottomNavigation";

test("BottomNavigation handles item selection", () => {
	const onChange = jest.fn();
	const { getByText } = render(
		<ThemeProvider>
			<BottomNavigation value="home" onChange={onChange} showLabels>
				<BottomNavigationAction value="home" label="Home" />
				<BottomNavigationAction value="search" label="Search" />
			</BottomNavigation>
		</ThemeProvider>,
	);

	fireEvent.press(getByText("Search"));
	expect(onChange).toHaveBeenCalledWith("search");
});

test("with showLabels, all tab labels are visible", () => {
	const { getByText } = render(
		<ThemeProvider>
			<BottomNavigation value="a" showLabels>
				<BottomNavigationAction value="a" label="A" />
				<BottomNavigationAction value="b" label="B" />
			</BottomNavigation>
		</ThemeProvider>,
	);

	expect(getByText("A")).toBeTruthy();
	expect(getByText("B")).toBeTruthy();
});

test("without showLabels, only the selected tab shows a label", () => {
	const { getByText, queryByText } = render(
		<ThemeProvider>
			<BottomNavigation value="home" showLabels={false}>
				<BottomNavigationAction value="home" label="Home" />
				<BottomNavigationAction value="likes" label="Likes" />
			</BottomNavigation>
		</ThemeProvider>,
	);

	expect(getByText("Home")).toBeTruthy();
	expect(queryByText("Likes")).toBeNull();
});

test("without showLabels, controlled value change updates which label is shown", () => {
	const { getByText, queryByText, rerender } = render(
		<ThemeProvider>
			<BottomNavigation value="home" showLabels={false}>
				<BottomNavigationAction value="home" label="Home" />
				<BottomNavigationAction value="likes" label="Likes" />
			</BottomNavigation>
		</ThemeProvider>,
	);

	expect(getByText("Home")).toBeTruthy();
	expect(queryByText("Likes")).toBeNull();

	rerender(
		<ThemeProvider>
			<BottomNavigation value="likes" showLabels={false}>
				<BottomNavigationAction value="home" label="Home" />
				<BottomNavigationAction value="likes" label="Likes" />
			</BottomNavigation>
		</ThemeProvider>,
	);

	expect(queryByText("Home")).toBeNull();
	expect(getByText("Likes")).toBeTruthy();
});
