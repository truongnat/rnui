import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { ThemeProvider, SegmentedControl } from "@truongdq01/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider override={{}}>
        <View style={{ padding: 24, gap: 12 }}>
            {children}
        </View>
    </ThemeProvider>
);

const meta = {
    title: "Components/SegmentedControl",
    component: SegmentedControl,
    decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

export const Default: StoryObj<typeof SegmentedControl> = {
    render: () => {
        const [index, setIndex] = useState(0);
        return (
            <View style={{ gap: 20 }}>
                <SegmentedControl
                    options={["Map", "Transit", "Satellite"]}
                    selectedIndex={index}
                    onChange={setIndex}
                />
                <SegmentedControl
                    options={["Small", "Medium", "Large"]}
                    selectedIndex={1}
                    onChange={() => { }}
                    disabled
                />
            </View>
        );
    },
};
