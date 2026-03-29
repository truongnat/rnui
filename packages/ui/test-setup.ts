import { mock } from "bun:test";
import React from "react";
import { createFlashListMock, createGestureHandlerMock, createReanimatedMock } from "./test-mocks";

// Mock React Native BEFORE it gets imported to avoid Flow type errors
mock.module("react-native", () => {
  // Create mock components that return React elements
  const createMockComponent = (name: string) => {
    const Component = ({ children, ...props }: any) => 
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };

  return {
    // Core Components
    View: createMockComponent("View"),
    Text: createMockComponent("Text"),
    Image: createMockComponent("Image"),
    ScrollView: createMockComponent("ScrollView"),
    FlatList: createMockComponent("FlatList"),
    SectionList: createMockComponent("SectionList"),
    TextInput: createMockComponent("TextInput"),
    TouchableOpacity: createMockComponent("TouchableOpacity"),
    TouchableHighlight: createMockComponent("TouchableHighlight"),
    TouchableWithoutFeedback: createMockComponent("TouchableWithoutFeedback"),
    Pressable: createMockComponent("Pressable"),
    Modal: createMockComponent("Modal"),
    ActivityIndicator: createMockComponent("ActivityIndicator"),
    Switch: createMockComponent("Switch"),
  
  // StyleSheet
  StyleSheet: {
    create: (styles: any) => styles,
    flatten: (style: any) => style,
    compose: (a: any, b: any) => [a, b],
  },
  
  // Platform
  Platform: {
    OS: "ios",
    Version: "17.0",
    select: (obj: any) => obj.ios || obj.default,
  },
  
  // Dimensions
  Dimensions: {
    get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
    addEventListener: () => ({ remove: () => {} }),
  },
  
  // Animated
  Animated: {
    View: createMockComponent("Animated.View"),
    Text: createMockComponent("Animated.Text"),
    Image: createMockComponent("Animated.Image"),
    ScrollView: createMockComponent("Animated.ScrollView"),
    FlatList: createMockComponent("Animated.FlatList"),
    Value: class {
      constructor(public value: number) {}
      setValue(v: number) { this.value = v; }
      interpolate() { return this; }
    },
    timing: () => ({ start: (cb?: any) => cb?.() }),
    spring: () => ({ start: (cb?: any) => cb?.() }),
    decay: () => ({ start: (cb?: any) => cb?.() }),
    sequence: () => ({ start: (cb?: any) => cb?.() }),
    parallel: () => ({ start: (cb?: any) => cb?.() }),
    stagger: () => ({ start: (cb?: any) => cb?.() }),
    loop: () => ({ start: (cb?: any) => cb?.() }),
    event: () => () => {},
    createAnimatedComponent: (c: any) => c,
  },
  
  // Pressable with onPress support
  Pressable: ({ onPress, children, ...props }: any) => {
    const Component = createMockComponent("Pressable");
    return React.createElement(Component, { ...props, onPress }, children);
  },
  
  // Linking
  Linking: {
    openURL: async () => true,
    canOpenURL: async () => true,
    getInitialURL: async () => null,
    addEventListener: () => ({ remove: () => {} }),
  },
  
  // Alert
  Alert: {
    alert: () => {},
  },
  
  // Keyboard
  Keyboard: {
    dismiss: () => {},
    addListener: () => ({ remove: () => {} }),
  },
  
  // Appearance
  Appearance: {
    getColorScheme: () => "light",
    addChangeListener: () => ({ remove: () => {} }),
  },
  
  // useColorScheme hook
  useColorScheme: () => "light",
  
  // useWindowDimensions hook
  useWindowDimensions: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
  
  // PixelRatio
  PixelRatio: {
    get: () => 2,
    getFontScale: () => 1,
    getPixelSizeForLayoutSize: (size: number) => size * 2,
    roundToNearestPixel: (size: number) => Math.round(size * 2) / 2,
  },
  
  // AccessibilityInfo
  AccessibilityInfo: {
    isScreenReaderEnabled: async () => false,
    addEventListener: () => ({ remove: () => {} }),
  },
};
});

// Mock React Native Reanimated
mock.module("react-native-reanimated", () => createReanimatedMock());

// Mock React Native Gesture Handler
mock.module("react-native-gesture-handler", () => createGestureHandlerMock());

// Mock React Native Worklets
mock.module("react-native-worklets", () => ({
  Worklets: {
    createRunOnJS: (fn: any) => fn,
    createRunOnUI: (fn: any) => fn,
    createContext: () => ({}),
  },
  useSharedValue: (v: any) => ({ value: v }),
  useDerivedValue: (fn: any) => ({ value: fn() }),
  useWorkletCallback: (fn: any) => fn,
  createSerializable: (v: any) => v,
  scheduleOnRN: (fn: any) => fn(),
  scheduleOnUI: (fn: any) => fn(),
  runOnJS: (fn: any) => fn,
  runOnUI: (fn: any) => fn,
  makeShareable: (v: any) => v,
  isWorklet: () => false,
  isReanimated: () => false,
}));

// Mock React Native Safe Area Context
mock.module("react-native-safe-area-context", () => {
  const createMockComponent = (name: string) => {
    const Component = ({ children, ...props }: any) => 
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };
  
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaView: createMockComponent("SafeAreaView"),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 375, height: 812 }),
  };
});

// Mock @shopify/flash-list
mock.module("@shopify/flash-list", () => createFlashListMock());

// Mock @react-native-community/datetimepicker
mock.module("@react-native-community/datetimepicker", () => {
  const createMockComponent = (name: string) => {
    const Component = (props: any) => 
      React.createElement(name, props);
    Component.displayName = name;
    return Component;
  };
  
  return {
    default: createMockComponent("DateTimePicker"),
  };
});

// Mock lucide-react-native
mock.module("lucide-react-native", () => {
  const createMockComponent = (name: string) => {
    const Component = (props: any) => 
      React.createElement("Icon", { ...props, iconName: name });
    Component.displayName = name;
    return Component;
  };
  
  // Create explicit exports for all icons used in the codebase
  const iconNames = [
    "Star", "Heart", "Check", "Info", "AlertTriangle", "AlertCircle", "CheckCircle",
    "X", "XCircle", "Menu", "MoreVertical", "MoreHorizontal", "Search", "Settings",
    "Bell", "Home", "User", "Plus", "Minus", "Edit", "Trash", "Share", "Download",
    "Upload", "RefreshCw", "ExternalLink", "ChevronUp", "ChevronDown", "ChevronLeft",
    "ChevronRight", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Eye", "EyeOff",
    "Lock", "Unlock", "Calendar", "Clock", "MapPin", "Camera", "Image", "Video",
    "FileText", "Copy", "Layout", "Grid", "List", "Layers", "Box", "Package",
    "ShoppingCart", "CreditCard", "Mail", "Phone", "MessageSquare", "Send", "Zap",
    "Flame", "StarHalf", "ThumbsUp", "ThumbsDown", "Circle", "Radio"
  ];
  
  const exports: Record<string, any> = {};
  iconNames.forEach(name => {
    exports[name] = createMockComponent(name);
  });
  
  return exports;
});

// Set global test environment
global.IS_REACT_ACT_ENVIRONMENT = true;

// Add requestAnimationFrame for tests that need it
global.requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id: any) => clearTimeout(id);

const shouldSuppressTestWarning = (args: unknown[]) =>
  args.some(
    (arg) =>
      typeof arg === "string" &&
      (
        /react-test-renderer is deprecated/i.test(arg) ||
        /not wrapped in act/i.test(arg) ||
        /When testing, code that causes React state updates should be wrapped into act/i.test(arg) ||
        /This ensures that you're testing the behavior the user would see in the browser/i.test(arg)
      )
  );

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  if (shouldSuppressTestWarning(args)) return;
  originalConsoleError(...args);
};

const originalConsoleWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (shouldSuppressTestWarning(args)) return;
  originalConsoleWarn(...args);
};
