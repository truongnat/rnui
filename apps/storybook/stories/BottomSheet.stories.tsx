import type { StoryObj } from '@storybook/react-native';
import {
  BottomSheet,
  type BottomSheetRef,
  Button,
  ThemeProvider,
} from '@truongdq01/ui';
import type React from 'react';
import { useRef } from 'react';
import { Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ flex: 1, padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  render: () => {
    const sheetRef = useRef<BottomSheetRef>(null);
    const BottomSheetComponent = BottomSheet as any;
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Button
          label="Open Bottom Sheet"
          onPress={() => sheetRef.current?.open()}
        />
        <BottomSheetComponent ref={sheetRef} snapPoints={['25%', '50%', '90%']}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Bottom Sheet Content
            </Text>
            <Text style={{ color: '#666' }}>
              This is a bottom sheet component using forwardRef.
            </Text>
          </View>
        </BottomSheetComponent>
      </View>
    );
  },
};
