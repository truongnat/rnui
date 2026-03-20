import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider, Carousel } from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider override={{}}>
        <View style={{ padding: 0, gap: 12 }}>
            {children}
        </View>
    </ThemeProvider>
);

const meta = {
    title: "Components/Carousel",
    component: Carousel,
    decorators: [(Story: any) => <Wrap><Story /></Wrap>],
};

export default meta;

export const Default: StoryObj<typeof Carousel> = {
    render: () => (
        <View style={{ height: 250 }}>
            <Carousel
                data={["#f87171", "#34d399", "#60a5fa", "#fbbf24"]}
                renderItem={(item: any, index: number) => (
                    <View style={{ flex: 1, backgroundColor: item, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Slide {index + 1}</Text>
                    </View>
                )}
            />
        </View>
    ),
};

export const Loop: StoryObj<typeof Carousel> = {
    render: () => (
        <View style={{ height: 250 }}>
            <Carousel
                loop={true}
                data={["#f87171", "#34d399", "#60a5fa", "#fbbf24"]}
                renderItem={(item: any, index: number) => (
                    <View style={{ flex: 1, backgroundColor: item, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Looped Slide {index + 1}</Text>
                        <Text style={{ color: "white", fontSize: 14 }}>Swipe past end to wrap around</Text>
                    </View>
                )}
            />
        </View>
    ),
};
