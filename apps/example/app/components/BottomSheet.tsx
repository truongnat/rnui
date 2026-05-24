import { useRef } from 'react';
import { View } from 'react-native';
import {
  BottomSheet,
  type BottomSheetRef,
  Button,
  ListItem,
  Typography,
} from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup } from '@/demo/DemoPage';

export default function BottomSheetScreen() {
  const basicSheetRef = useRef<BottomSheetRef>(null);
  const snapSheetRef = useRef<BottomSheetRef>(null);
  const scrollSheetRef = useRef<BottomSheetRef>(null);

  const { tokens } = useTheme();

  const handleOpenBasic = () => basicSheetRef.current?.open();
  const handleOpenSnap = (index: number) => snapSheetRef.current?.open(index);

  return (
    <DemoPage
      title="Bottom Sheet"
      description="Surfaces that slide up from the edge — menus, actions, and supplementary content."
      floatingContent={
        <>
          <BottomSheet ref={basicSheetRef}>
            <View style={{ padding: tokens.spacing[6], gap: tokens.spacing[4] }}>
              <Typography variant="h3" fontWeight="700">
                Quick Action
              </Typography>
              <Typography variant="body1" color="secondary">
                Perform actions without leaving the current context.
              </Typography>
              <Button
                label="Close"
                variant="outline"
                onPress={() => basicSheetRef.current?.close()}
              />
            </View>
          </BottomSheet>

          <BottomSheet ref={snapSheetRef} snapPoints={['50%', '90%']}>
            <View style={{ padding: tokens.spacing[6], gap: tokens.spacing[4] }}>
              <Typography variant="h3">Snap Points</Typography>
              <Typography variant="body1">
                Define multiple heights for the sheet to stop at.
              </Typography>
              <View
                style={{
                  height: tokens.spacing[20] * 3 + tokens.spacing[5],
                  backgroundColor: tokens.color.surface.raised,
                  borderRadius: tokens.radius.lg,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" color="secondary">
                  Extended Content Area
                </Typography>
              </View>
              <Button
                label="Done"
                onPress={() => snapSheetRef.current?.close()}
              />
            </View>
          </BottomSheet>

          <BottomSheet ref={scrollSheetRef}>
            <View style={{ paddingBottom: tokens.spacing[8] }}>
              <Typography variant="h3" style={{ padding: tokens.spacing[6] }}>
                Share With
              </Typography>
              <ListItem
                label="Message"
                onPress={() => scrollSheetRef.current?.close()}
              />
              <ListItem
                label="Email"
                onPress={() => scrollSheetRef.current?.close()}
              />
              <ListItem
                label="Copy Link"
                onPress={() => scrollSheetRef.current?.close()}
              />
              <ListItem
                label="More Options"
                onPress={() => scrollSheetRef.current?.close()}
              />
            </View>
          </BottomSheet>
        </>
      }
    >
      <DemoSection
        title="Basic Sheet"
        description="Simple confirmations or quick actions."
      >
        <Button label="Open Basic Sheet" onPress={handleOpenBasic} />
      </DemoSection>

      <DemoSection
        title="Snap Points"
        description="Multiple heights the sheet can snap to."
      >
        <DemoGroup direction="row">
          <Button
            label="Half (50%)"
            variant="outline"
            onPress={() => handleOpenSnap(0)}
            style={{ flex: 1 }}
          />
          <Button
            label="Full (90%)"
            variant="outline"
            onPress={() => handleOpenSnap(1)}
            style={{ flex: 1 }}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="List Content"
        description="ListItems inside a sheet for selection menus."
      >
        <Button
          label="Open List Sheet"
          variant="ghost"
          onPress={() => scrollSheetRef.current?.open()}
        />
      </DemoSection>
    </DemoPage>
  );
}
