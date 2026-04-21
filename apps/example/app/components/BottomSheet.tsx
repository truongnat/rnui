import React, { useRef } from 'react';
import { View } from 'react-native';
import { BottomSheet, type BottomSheetRef, Button, ListItem, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

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
      description="A versatile surface that slides up from the edge of the screen, perfect for supplementary content, menus, or complex task-based views."
      floatingContent={
        <>
          <BottomSheet ref={basicSheetRef}>
            <View style={{ padding: 24, gap: 16 }}>
              <Typography variant="h3" fontWeight="700">Quick Action</Typography>
              <Typography variant="body1" color="secondary">
                Standard bottom sheets allow users to perform actions without leaving the current context.
              </Typography>
              <Button label="Close" variant="outline" onPress={() => basicSheetRef.current?.close()} />
            </View>
          </BottomSheet>

          <BottomSheet ref={snapSheetRef} snapPoints={['50%', '90%']}>
            <View style={{ padding: 24, gap: 16 }}>
              <Typography variant="h3">Snap Points</Typography>
              <Typography variant="body1">
                You can define multiple snap points for the sheet to stop at.
              </Typography>
              <View 
                style={{ 
                    height: 300, 
                    backgroundColor: tokens.color.surface.raised, 
                    borderRadius: 12, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
              >
                <Typography variant="caption" color="secondary">Extended Content Area</Typography>
              </View>
              <Button label="Done" onPress={() => snapSheetRef.current?.close()} />
            </View>
          </BottomSheet>

          <BottomSheet ref={scrollSheetRef}>
            <View style={{ paddingBottom: 32 }}>
              <Typography variant="h3" style={{ padding: 24 }}>Share With</Typography>
              <ListItem label="Message" onPress={() => scrollSheetRef.current?.close()} />
              <ListItem label="Email" onPress={() => scrollSheetRef.current?.close()} />
              <ListItem label="Copy Link" onPress={() => scrollSheetRef.current?.close()} />
              <ListItem label="More Options" onPress={() => scrollSheetRef.current?.close()} />
            </View>
          </BottomSheet>
        </>
      }
    >
      <DemoSection title="Basic Sheet">
        <Typography variant="body2" gutterBottom>
          The most common usage of bottom sheets for simple confirmations or actions.
        </Typography>
        <Button label="Open Basic Sheet" onPress={handleOpenBasic} />
      </DemoSection>

      <DemoSection title="Snap Points">
        <Typography variant="body2" gutterBottom>
          Define multiple heights for the sheet to snap comfortably.
        </Typography>
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

      <DemoSection title="List Content">
        <Typography variant="body2" gutterBottom>
          Using ListItems within a bottom sheet for selection menus.
        </Typography>
        <Button label="Open List Sheet" variant="ghost" onPress={() => scrollSheetRef.current?.open()} />
      </DemoSection>
    </DemoPage>
  );
}

