import { render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "@truongdq01/headless";
import type React from "react";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { BottomSheet } from "../BottomSheet";
import type { BottomSheetRef } from "../types";

/** Opens the sheet after mount so `Modal` + `onShow` run (matches ref.open() usage). */
function BottomSheetOpenOnMount(
	props: Omit<React.ComponentProps<typeof BottomSheet>, "ref">,
) {
	const ref = useRef<BottomSheetRef>(null);
	useEffect(() => {
		ref.current?.open();
	}, []);
	return <BottomSheet ref={ref} {...props} />;
}

describe("BottomSheet", () => {
	it("renders children when open", async () => {
		const { findByText } = render(
			<ThemeProvider>
				<BottomSheetOpenOnMount snapPoints={["100%"]}>
					<Text>Sheet Content</Text>
				</BottomSheetOpenOnMount>
			</ThemeProvider>,
		);
		expect(await findByText("Sheet Content")).toBeTruthy();
	});

	describe("Accessibility", () => {
		it("has accessibilityViewIsModal on sheet container", async () => {
			const { UNSAFE_root } = render(
				<ThemeProvider>
					<BottomSheetOpenOnMount snapPoints={["100%"]}>
						<Text>Content</Text>
					</BottomSheetOpenOnMount>
				</ThemeProvider>,
			);
			await waitFor(() => {
				const container = UNSAFE_root.findAllByProps({
					accessibilityLabel: "Bottom sheet",
				}).find((n) => n.props.accessibilityViewIsModal === true);
				expect(container).toBeTruthy();
			});
		});

		it("uses default accessibilityLabel values", async () => {
			const { UNSAFE_root } = render(
				<ThemeProvider>
					<BottomSheetOpenOnMount snapPoints={["100%"]}>
						<Text>Content</Text>
					</BottomSheetOpenOnMount>
				</ThemeProvider>,
			);
			await waitFor(() => {
				expect(
					UNSAFE_root.findByProps({ accessibilityLabel: "Bottom sheet" }),
				).toBeTruthy();
				expect(
					UNSAFE_root.findByProps({
						accessibilityLabel: "Dismiss bottom sheet",
					}),
				).toBeTruthy();
			});
		});

		it("applies custom accessibilityLabel", async () => {
			const { UNSAFE_root } = render(
				<ThemeProvider>
					<BottomSheetOpenOnMount
						snapPoints={["100%"]}
						accessibilityLabel="Filter options"
						backdropAccessibilityLabel="Close filters"
					>
						<Text>Content</Text>
					</BottomSheetOpenOnMount>
				</ThemeProvider>,
			);
			await waitFor(() => {
				expect(
					UNSAFE_root.findByProps({ accessibilityLabel: "Filter options" }),
				).toBeTruthy();
				expect(
					UNSAFE_root.findByProps({ accessibilityLabel: "Close filters" }),
				).toBeTruthy();
			});
		});

		it("backdrop has button role and hint", async () => {
			const { UNSAFE_root } = render(
				<ThemeProvider>
					<BottomSheetOpenOnMount snapPoints={["100%"]}>
						<Text>Content</Text>
					</BottomSheetOpenOnMount>
				</ThemeProvider>,
			);
			await waitFor(() => {
				const backdrop = UNSAFE_root.findAllByProps({
					accessibilityLabel: "Dismiss bottom sheet",
				}).find((node) => node.props.accessibilityRole === "button");
				expect(backdrop).toBeTruthy();
				expect(backdrop?.props.accessibilityHint).toBe(
					"Closes the bottom sheet",
				);
			});
		});

		it("drag handle has adjustable role", async () => {
			const { UNSAFE_root } = render(
				<ThemeProvider>
					<BottomSheetOpenOnMount snapPoints={["100%"]}>
						<Text>Content</Text>
					</BottomSheetOpenOnMount>
				</ThemeProvider>,
			);
			await waitFor(() => {
				const handle = UNSAFE_root.findByProps({
					accessibilityLabel: "Drag handle",
				});
				expect(handle.props.accessibilityRole).toBe("adjustable");
			});
		});
	});
});
