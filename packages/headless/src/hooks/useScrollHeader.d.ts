export interface UseScrollHeaderOptions {
    /** Maximum height of the header when fully expanded */
    headerMaxHeight: number;
    /** Minimum height of the header when fully collapsed (usually navbar height like 60 or insets.top + 44) */
    headerMinHeight: number;
}
export declare function useScrollHeader({ headerMaxHeight, headerMinHeight }: UseScrollHeaderOptions): {
    scrollY: import("react-native-reanimated").SharedValue<number>;
    scrollHandler: import("react-native-reanimated").ScrollHandlerProcessed<Record<string, unknown>>;
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