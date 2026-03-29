import React from "react";
import { ImageProps as RNImageProps } from "react-native";
export interface RnImageProps extends RNImageProps {
    /**
     * If true, shows a skeleton loading effect while the image is fetching.
     * Defaults to true.
     */
    showPlaceholder?: boolean;
}
export declare function RnImage({ showPlaceholder, style, onLoad, ...props }: RnImageProps): React.JSX.Element;
//# sourceMappingURL=Image.d.ts.map