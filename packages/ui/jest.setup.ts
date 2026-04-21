import "@testing-library/jest-native/extend-expect";

// Conditionally mock @shopify/flash-list only if the module can be resolved

const originalConsoleError = console.error;
const isReactTestRendererWarning = (message: unknown) =>
	typeof message === "string" &&
	message.includes("react-test-renderer is deprecated");
const isSvgTouchableMixinError = (message: unknown) =>
	typeof message === "string" &&
	message.includes("Cannot destructure property 'Mixin' from null or undefined value");
console.error = (...args: unknown[]) => {
	if (isReactTestRendererWarning(args[0]) || isSvgTouchableMixinError(args[0])) {
		return;
	}
	originalConsoleError(...(args as Parameters<typeof originalConsoleError>));
};

// Mock TurboModuleRegistry at the react-native level
jest.mock("react-native/Libraries/TurboModule/TurboModuleRegistry", () => ({
	get: jest.fn(),
	getEnforcing: jest.fn(),
}));

jest.mock("react-native-worklets", () => ({
	Worklets: {
		createRunOnJS: (fn: any) => fn,
		createRunOnUI: (fn: any) => fn,
		createContext: () => ({}),
	},
	useSharedValue: (v: any) => ({ value: v }),
	useDerivedValue: (v: any) => ({ value: v() }),
	useWorkletCallback: (fn: any) => fn,
	createSerializable: (v: any) => v,
}));

jest.mock("react-native-reanimated", () => {
	const { createReanimatedMock } = require("./test-mocks");
	return createReanimatedMock();
});

jest.mock("react-native-gesture-handler", () => {
	const { createGestureHandlerMock } = require("./test-mocks");
	return createGestureHandlerMock();
});

jest.mock("react-native-safe-area-context", () => ({
	useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("../src/components/BottomSheet/BottomSheet", () => {
	const React = require("react");
	const { useState, useImperativeHandle } = React;
	const BottomSheet = React.forwardRef(
		({ children, ...props }: any, ref: any) => {
			const [mounted, setMounted] = useState(true);

			useImperativeHandle(ref, () => ({
				open: () => setMounted(true),
				close: () => setMounted(false),
				snapTo: () => {},
			}));

			if (!mounted) return null;
			return React.createElement("View", { ref, ...props }, children);
		}
	);
	BottomSheet.displayName = "BottomSheet";
	return {
		__esModule: true,
		default: BottomSheet,
		BottomSheet,
	};
});

// Conditionally mock @shopify/flash-list only if the module can be resolved
// This prevents test failures when the optional dependency is not installed
try {
	require.resolve("@shopify/flash-list");
	jest.mock("@shopify/flash-list", () => {
		const React = require("react");
		const FlashList = ({
			data = [],
			renderItem,
			keyExtractor,
			...props
		}: any) => {
			if (typeof renderItem !== "function") {
				return React.createElement("FlashList", props);
			}

			const children = (data || []).map((item: any, index: number) => {
				const element = renderItem({ item, index });
				const key = keyExtractor ? keyExtractor(item, index) : index;
				return React.isValidElement(element)
					? React.cloneElement(element, { key })
					: element;
			});

			return React.createElement("FlashList", props, children);
		};
		FlashList.displayName = "FlashList";

		const MasonryFlashList = FlashList;

		return { FlashList, MasonryFlashList };
	});
} catch {
	// Module not available, skip mocking
}
jest.mock("@react-native-community/datetimepicker", () => {
	const React = require("react");
	return React.forwardRef(() => null);
});

jest.mock("expo-blur", () => ({
	BlurView: require("react").forwardRef(() => null),
}));

jest.mock("lucide-react-native", () => {
	const React = require("react");
	return new Proxy(
		{},
		{
			get: () => (props: any) => React.createElement("Icon", props, null),
		},
	);
});

declare global {
	var IS_REACT_ACT_ENVIRONMENT: boolean;
}

global.IS_REACT_ACT_ENVIRONMENT = true;
