import { render } from "@testing-library/react-native";
import { ThemeProvider } from "@truongdq01/headless";
import { Link } from "../../Link";
import { Breadcrumbs } from "..";

test("Breadcrumbs renders links and separators", () => {
	const { getByText } = render(
		<ThemeProvider>
			<Breadcrumbs>
				<Link href="/">Home</Link>
				<Link href="/docs">Docs</Link>
			</Breadcrumbs>
		</ThemeProvider>,
	);
	expect(getByText("Home")).toBeTruthy();
	expect(getByText("Docs")).toBeTruthy();
});
