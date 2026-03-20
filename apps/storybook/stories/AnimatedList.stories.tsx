import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";
import { ThemeProvider, AnimatedList, ListItem, Avatar } from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider override={{}}>
        <View style={{ padding: 24, gap: 12 }}>
            {children}
        </View>
    </ThemeProvider>
);

const meta = {
    title: "Components/AnimatedList",
    component: AnimatedList,
    decorators: [(Story: any) => <Wrap><Story /></Wrap>],
};

export default meta;

const CONTACTS = [
    { id: "1", name: "An Nguyen", role: "Designer", initials: "AN" },
    { id: "2", name: "Binh Tran", role: "Engineer", initials: "BT" },
    { id: "3", name: "Chi Le", role: "Product", initials: "CL" },
];

export const Default: StoryObj<typeof AnimatedList> = {
    render: () => {
        const AnyAnimatedList = AnimatedList as any;
        return (
            <View style={{ height: 300, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, overflow: "hidden" }}>
                <AnyAnimatedList
                    data={CONTACTS}
                    estimatedItemSize={60}
                    renderItem={({ item, index }: any) => (
                        <ListItem
                            title={item.name}
                            subtitle={item.role}
                            leading={
                                <Avatar
                                    initials={item.initials}
                                    size="sm"
                                    src={undefined}
                                    fallbackIcon={undefined}
                                    status={undefined}
                                    accessibilityLabel={undefined}
                                />
                            }
                            trailing={undefined}
                            onPress={undefined}
                            onLongPress={undefined}
                            showSeparator={index < CONTACTS.length - 1}
                        />
                    )}
                />
            </View>
        );
    }
};
