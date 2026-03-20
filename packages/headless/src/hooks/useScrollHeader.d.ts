export interface UseScrollHeaderOptions {
    /** Maximum height of the header when fully expanded */
    headerMaxHeight: number;
    /** Minimum height of the header when fully collapsed (usually navbar height like 60 or insets.top + 44) */
    headerMinHeight: number;
}
export declare function useScrollHeader({ headerMaxHeight, headerMinHeight }: UseScrollHeaderOptions): {
    scrollY: import("node_modules/react-native-reanimated/lib/typescript").SharedValue<number>;
    scrollHandler: import("node_modules/react-native-reanimated/lib/typescript").ScrollHandlerProcessed<Record<string, unknown>>;
    headerStyle: {
        height: number;
    };
    imageStyle: {
        transform: any;
    };
    titleStyle: {
        opacity: number;
        transform: {
            translateY: number;
        }[];
    };
    headerBgStyle: {
        opacity: number;
    };
};
//# sourceMappingURL=useScrollHeader.d.ts.map