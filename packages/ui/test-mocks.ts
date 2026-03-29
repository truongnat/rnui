import React from "react";

export const createMockComponent = (name: string) => {
  const Component = ({ children, ...props }: any) =>
    React.createElement(name, props, children);
  Component.displayName = name;
  return Component;
};

export const createReanimatedMock = () => {
  const animatedValue = { value: 0 };
  const createAnimatedComponent = (name: string) => {
    const Component = ({ children, ...props }: any) =>
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };

  const layoutChain = {
    damping: () => layoutChain,
    stiffness: () => layoutChain,
    mass: () => layoutChain,
    overshootClamping: () => layoutChain,
    restDisplacementThreshold: () => layoutChain,
    restSpeedThreshold: () => layoutChain,
  };

  const mockApi = {
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
    withDelay: (_delay: any, v: any) => v,
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
    interpolate: (_v: any, _input: any, output: any) => output[0],
    interpolateColor: (_v: any, _input: any, output: any) => output[0],
    Extrapolation: {
      CLAMP: "clamp",
      EXTEND: "extend",
      IDENTITY: "identity",
    },
    Extrapolate: {
      CLAMP: "clamp",
      EXTEND: "extend",
      IDENTITY: "identity",
    },

    // Easing
    Easing: {
      linear: (t: any) => t,
      ease: (t: any) => t,
      quad: (t: any) => t,
      cubic: (t: any) => t,
      poly: (_n: any) => (t: any) => t,
      sin: (t: any) => t,
      circle: (t: any) => t,
      exp: (t: any) => t,
      elastic: (_bounciness: any) => (t: any) => t,
      back: (_s: any) => (t: any) => t,
      bounce: (t: any) => t,
      bezier: () => (t: any) => t,
      in: (f: any) => f,
      out: (f: any) => f,
      inOut: (f: any) => f,
    },

    // Layout Animations
    Layout: {
      springify: () => layoutChain,
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
  };

  const defaultExport = {
    View: createAnimatedComponent("Reanimated.View"),
    Text: createAnimatedComponent("Reanimated.Text"),
    ScrollView: createAnimatedComponent("Reanimated.ScrollView"),
    Image: createAnimatedComponent("Reanimated.Image"),
    FlatList: createAnimatedComponent("Reanimated.FlatList"),
    createAnimatedComponent: (c: any) => c,
  };

  return { __esModule: true, ...mockApi, default: defaultExport };
};

export const createGestureHandlerMock = () => {
  const createGestureBuilder = () => {
    const chain = {
      enabled: () => chain,
      onBegin: () => chain,
      onStart: () => chain,
      onUpdate: () => chain,
      onEnd: () => chain,
      onFinalize: () => chain,
      onTouchesMove: () => chain,
      onTouchesDown: () => chain,
      onTouchesUp: () => chain,
      onTouchesCancelled: () => chain,
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

  const GestureDetector = ({ children }: any) => children;

  return {
    GestureDetector,
    GestureHandlerRootView: createMockComponent("GestureHandlerRootView"),
    PanGestureHandler: createMockComponent("PanGestureHandler"),
    TapGestureHandler: createMockComponent("TapGestureHandler"),
    LongPressGestureHandler: createMockComponent("LongPressGestureHandler"),
    FlingGestureHandler: createMockComponent("FlingGestureHandler"),
    PinchGestureHandler: createMockComponent("PinchGestureHandler"),
    RotationGestureHandler: createMockComponent("RotationGestureHandler"),
    NativeViewGestureHandler: createMockComponent("NativeViewGestureHandler"),
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
};

export const createFlashListMock = () => {
  const FlashList = ({ data = [], renderItem, keyExtractor, ...props }: any) => {
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
};
