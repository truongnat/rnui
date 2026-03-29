import React from "react";
export interface CarouselProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemWidth?: number;
    gap?: number;
    height?: number;
    showPagination?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}
export declare function Carousel<T>({ data, renderItem, itemWidth, gap, height, showPagination, loop, autoPlay, autoPlayInterval, }: CarouselProps<T>): React.JSX.Element;
//# sourceMappingURL=Carousel.d.ts.map