import { mock } from "bun:test";
import React from "react";

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
mock.module("react-native-reanimated", () => {
  const animatedValue = { value: 0 };
  const createAnimatedComponent = (name: string) => {
    const Component = ({ children, ...props }: any) => 
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };
  const AnimatedComponent = createAnimatedComponent("Reanimated.View");
  
  return {
    // Hooks
    useSharedValue: (v: any) => ({ value: v }),
    useDerivedValue: (fn: any) => ({ value: fn() }),
    useAnimatedStyle: (fn: any) => fn(),
    useAnimatedProps: (fn: any) => fn(),
    useAnimatedReaction: () => {},
    useAnimatedScrollHandler: () => () => {},
    useAnimatedGestureHandler: () => () => {},
    useAnimatedRef: () => ({ current: null }),
    useWorkletCallback: (fn: any) => fn,
    useFrameCallback: () => {},
    useAnimatedKeyboard: () => ({ height: animatedValue, state: animatedValue }),
    useAnimatedSensor: () => ({ sensor: animatedValue }),
    useScrollViewOffset: () => animatedValue,
    
    // Animations
    withTiming: (v: any) => v,
    withSpring: (v: any) => v,
    withDecay: (v: any) => v,
    withDelay: (delay: any, v: any) => v,
    withRepeat: (v: any) => v,
    withSequence: (...v: any[]) => v[v.length - 1],
    cancelAnimation: () => {},
    
    // Worklets
    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
    makeMutable: (v: any) => ({ value: v }),
    makeShareable: (v: any) => v,
    
    // Components
    createAnimatedComponent: (c: any) => c,
    View: createAnimatedComponent("Reanimated.View"),
    Text: createAnimatedComponent("Reanimated.Text"),
    ScrollView: createAnimatedComponent("Reanimated.ScrollView"),
    Image: createAnimatedComponent("Reanimated.Image"),
    FlatList: createAnimatedComponent("Reanimated.FlatList"),
    
    // Interpolation
    interpolate: (v: any, input: any, output: any) => output[0],
    interpolateColor: (v: any, input: any, output: any) => output[0],
    Extrapolation: { 
      CLAMP: "clamp", 
      EXTEND: "extend", 
      IDENTITY: "identity" 
    },
    Extrapolate: { 
      CLAMP: "clamp", 
      EXTEND: "extend", 
      IDENTITY: "identity" 
    },
    
    // Easing
    Easing: {
      linear: (t: any) => t,
      ease: (t: any) => t,
      quad: (t: any) => t,
      cubic: (t: any) => t,
      poly: (n: any) => (t: any) => t,
      sin: (t: any) => t,
      circle: (t: any) => t,
      exp: (t: any) => t,
      elastic: (bounciness: any) => (t: any) => t,
      back: (s: any) => (t: any) => t,
      bounce: (t: any) => t,
      bezier: () => (t: any) => t,
      in: (f: any) => f,
      out: (f: any) => f,
      inOut: (f: any) => f,
    },
    
    // Layout Animations
    Layout: {
      springify: () => {
        const chain = {
          damping: () => chain,
          stiffness: () => chain,
          mass: () => chain,
          overshootClamping: () => chain,
          restDisplacementThreshold: () => chain,
          restSpeedThreshold: () => chain,
        };
        return chain;
      },
      duration: () => ({}),
      delay: () => ({}),
      randomDelay: () => ({}),
      withInitialValues: () => ({}),
      withCallback: () => ({}),
    },
    FadeIn: {},
    FadeInDown: {},
    FadeInUp: {},
    FadeInLeft: {},
    FadeInRight: {},
    FadeOut: {},
    FadeOutDown: {},
    FadeOutUp: {},
    FadeOutLeft: {},
    FadeOutRight: {},
    SlideInDown: {},
    SlideInUp: {},
    SlideInLeft: {},
    SlideInRight: {},
    SlideOutDown: {},
    SlideOutUp: {},
    SlideOutLeft: {},
    SlideOutRight: {},
    ZoomIn: {},
    ZoomInDown: {},
    ZoomInUp: {},
    ZoomInLeft: {},
    ZoomInRight: {},
    ZoomInRotate: {},
    ZoomInEasyUp: {},
    ZoomInEasyDown: {},
    ZoomOut: {},
    ZoomOutDown: {},
    ZoomOutUp: {},
    ZoomOutLeft: {},
    ZoomOutRight: {},
    ZoomOutRotate: {},
    ZoomOutEasyUp: {},
    ZoomOutEasyDown: {},
    BounceIn: {},
    BounceInDown: {},
    BounceInUp: {},
    BounceInLeft: {},
    BounceInRight: {},
    BounceOut: {},
    BounceOutDown: {},
    BounceOutUp: {},
    BounceOutLeft: {},
    BounceOutRight: {},
    FlipInXUp: {},
    FlipInXDown: {},
    FlipInYLeft: {},
    FlipInYRight: {},
    FlipInEasyX: {},
    FlipInEasyY: {},
    FlipOutXUp: {},
    FlipOutXDown: {},
    FlipOutYLeft: {},
    FlipOutYRight: {},
    FlipOutEasyX: {},
    FlipOutEasyY: {},
    StretchInX: {},
    StretchInY: {},
    StretchOutX: {},
    StretchOutY: {},
    RotateInDownLeft: {},
    RotateInDownRight: {},
    RotateInUpLeft: {},
    RotateInUpRight: {},
    RotateOutDownLeft: {},
    RotateOutDownRight: {},
    RotateOutUpLeft: {},
    RotateOutUpRight: {},
    LightSpeedInRight: {},
    LightSpeedInLeft: {},
    LightSpeedOutRight: {},
    LightSpeedOutLeft: {},
    PinwheelIn: {},
    PinwheelOut: {},
    RollInLeft: {},
    RollInRight: {},
    RollOutLeft: {},
    RollOutRight: {},
    
    // Layout Transitions
    LinearTransition: {},
    SequencedTransition: {},
    FadingTransition: {},
    JumpingTransition: {},
    CurvedTransition: {},
    EntryExitTransition: {},
    
    // Shared Transition
    SharedTransition: {},
    SharedValue: class {
      constructor(public value: any) {}
    },
    
    // Measure
    measure: () => null,
    scrollTo: () => {},
    
    // Keyboard
    KeyboardState: {
      UNKNOWN: 0,
      OPENING: 1,
      OPEN: 2,
      CLOSING: 3,
      CLOSED: 4,
    },
    
    // Sensor
    SensorType: {
      ACCELEROMETER: 1,
      GYROSCOPE: 2,
      GRAVITY: 3,
      MAGNETIC_FIELD: 4,
      ROTATION: 5,
    },
    
    // Default export
    default: {
      View: createAnimatedComponent("Reanimated.View"),
      Text: createAnimatedComponent("Reanimated.Text"),
      ScrollView: createAnimatedComponent("Reanimated.ScrollView"),
      Image: createAnimatedComponent("Reanimated.Image"),
      FlatList: createAnimatedComponent("Reanimated.FlatList"),
      createAnimatedComponent: (c: any) => c,
    },
  };
});

// Mock React Native Gesture Handler
mock.module("react-native-gesture-handler", () => {
  const createMockComponent = (name: string) => {
    const Component = ({ children, ...props }: any) => 
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };
  
  // Create chainable gesture builder
  const createGestureBuilder = () => {
    const chain = {
      enabled: () => chain,
      onBegin: () => chain,
      onStart: () => chain,
      onUpdate: () => chain,
      onEnd: () => chain,
      onFinalize: () => chain,
      activeOffsetX: () => chain,
      activeOffsetY: () => chain,
      failOffsetX: () => chain,
      failOffsetY: () => chain,
      minDuration: () => chain,
      hitSlop: () => chain,
      direction: () => chain,
      numberOfTaps: () => chain,
      maxDuration: () => chain,
      minPointers: () => chain,
      maxPointers: () => chain,
      minDistance: () => chain,
      shouldCancelWhenOutside: () => chain,
      withTestId: () => chain,
    };
    return chain;
  };
  
  // GestureDetector that forwards children without wrapping
  const GestureDetector = ({ children }: any) => children;
  
  return {
    GestureDetector,
    GestureHandlerRootView: createMockComponent("GestureHandlerRootView"),
    Gesture: {
      Tap: createGestureBuilder,
      Pan: createGestureBuilder,
      LongPress: createGestureBuilder,
      Fling: createGestureBuilder,
      Pinch: createGestureBuilder,
      Rotation: createGestureBuilder,
      Hover: createGestureBuilder,
      Native: createGestureBuilder,
      Manual: createGestureBuilder,
      Simultaneous: (...g: any[]) => g,
      Race: (...g: any[]) => g,
      Exclusive: (...g: any[]) => g,
    },
    GestureStateManager: {},
    State: {
      UNDETERMINED: 0,
      FAILED: 1,
      BEGAN: 2,
      CANCELLED: 3,
      ACTIVE: 4,
      END: 5,
    },
    Directions: {
      RIGHT: 1,
      LEFT: 2,
      UP: 4,
      DOWN: 8,
    },
  };
});

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
mock.module("@shopify/flash-list", () => {
  const FlashList = ({ data, renderItem, ...props }: any) => {
    // Render items like FlatList does
    const children = data?.map((item: any, index: number) => {
      const element = renderItem({ item, index });
      return React.createElement(React.Fragment, { key: item.key || item.id || index }, element);
    });
    return React.createElement("FlashList", props, children);
  };
  FlashList.displayName = "FlashList";
  
  return {
    FlashList,
  };
});

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
