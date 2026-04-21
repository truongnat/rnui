import "@testing-library/jest-native/extend-expect";
import { configure } from "@testing-library/react-native";

// Conditionally mock @shopify/flash-list only if the module can be resolved

configure({
	hostComponentNames: {
		text: "Text",
		textInput: "TextInput",
		image: "Image",
		switch: "Switch",
		scrollView: "ScrollView",
		modal: "Modal",
	},
});

const originalConsoleError = console.error;
const isReactTestRendererWarning = (message: unknown) =>
	typeof message === "string" &&
	message.includes("react-test-renderer is deprecated");
console.error = (...args: unknown[]) => {
	if (isReactTestRendererWarning(args[0])) {
		return;
	}
	originalConsoleError(...(args as Parameters<typeof originalConsoleError>));
};

// Mock TurboModuleRegistry at the react-native level
jest.mock("react-native/Libraries/TurboModule/TurboModuleRegistry", () => ({
	get: jest.fn(),
	getEnforcing: jest.fn(),
}));

// Mock react-native Touchable to prevent SVG touchable mixin error
jest.mock("react-native/Libraries/Components/Touchable/Touchable", () => ({
	Mixin: {},
}));

// Mock react-native module to include Touchable mixin
jest.mock("react-native", () => {
	const ReactNative = jest.requireActual("react-native");
	return {
		...ReactNative,
		Touchable: {
			Mixin: {},
		},
	};
});

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

jest.mock("react-native-svg", () => {
	const React = require("react");
	const Svg = ({ children, ...props }: any) =>
		React.createElement("Svg", props, children);
	const mockModule = {
		__esModule: true,
		default: Svg,
		Svg,
		Circle: Svg,
		Path: Svg,
		Rect: Svg,
		G: Svg,
		Line: Svg,
		Polygon: Svg,
		Polyline: Svg,
		Defs: Svg,
		LinearGradient: Svg,
		RadialGradient: Svg,
		Stop: Svg,
		ClipPath: Svg,
		Touchable: { Mixin: {} },
	};
	return mockModule;
});

jest.mock("lucide-react-native", () => {
	const React = require("react");
	return new Proxy(
		{},
		{
			get: () => (props: any) => React.createElement("Icon", props, null),
		},
	);
});

global.IS_REACT_ACT_ENVIRONMENT = true;
