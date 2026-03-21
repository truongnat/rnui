import React, { useState } from "react";
import { Image as RNImage, ImageProps as RNImageProps, View, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from "react-native-reanimated";
import { useComponentTokens } from "@rnui/headless";

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

export interface RnImageProps extends RNImageProps {
    /**
     * If true, shows a skeleton loading effect while the image is fetching.
     * Defaults to true.
     */
    showPlaceholder?: boolean;
}

export function RnImage({ showPlaceholder = true, style, onLoad, ...props }: RnImageProps) {
    const { image } = useComponentTokens();
    const [isLoaded, setIsLoaded] = useState(false);
    const opacity = useSharedValue(0);

    const handleLoad = (e: any) => {
        setIsLoaded(true);
        opacity.value = withTiming(1, { duration: 300 });
        onLoad?.(e);
    };

    const imageStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View style={[styles.container, style, { backgroundColor: showPlaceholder && !isLoaded ? image.placeholder.backgroundColor : "transparent" }]}>
            <AnimatedImage
                {...props}
                onLoad={handleLoad}
                style={[StyleSheet.absoluteFill, imageStyle, style]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        position: "relative",
    },
});
