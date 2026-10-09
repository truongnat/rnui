import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { ListItem } from '@/components/ui/list-item';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { DemoPage, DemoGroup, DemoSection } from '@/demo/DemoPage';

export default function SheetScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [snapOpen, setSnapOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);
  const [listOpen, setListOpen] = useState(false);

  const openSnap = (index: number) => {
    setSnapIndex(index);
    setSnapOpen(true);
  };

  return (
    <DemoPage
      title="Sheet"
      description="Surfaces that slide up from the edge — menus, actions, and supplementary content."
      floatingContent={
        <>
          <Sheet open={basicOpen} onOpenChange={setBasicOpen}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Quick Action</SheetTitle>
                <SheetDescription>
                  Perform actions without leaving the current context.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button variant="outline" onPress={() => setBasicOpen(false)}>
                  Close
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet
            key={snapIndex}
            open={snapOpen}
            onOpenChange={setSnapOpen}
            snapPoints={['50%', '90%']}
            initialSnapIndex={snapIndex}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Snap Points</SheetTitle>
                <SheetDescription>
                  Define multiple heights for the sheet to stop at. Drag the
                  handle to move between detents.
                </SheetDescription>
              </SheetHeader>
              <View className="h-40 items-center justify-center rounded-lg bg-muted">
                <SheetDescription>Extended Content Area</SheetDescription>
              </View>
              <SheetFooter>
                <Button onPress={() => setSnapOpen(false)}>Done</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet open={listOpen} onOpenChange={setListOpen}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Share With</SheetTitle>
              </SheetHeader>
              <View className="-mx-6">
                <ListItem title="Message" onPress={() => setListOpen(false)} />
                <ListItem title="Email" onPress={() => setListOpen(false)} />
                <ListItem
                  title="Copy Link"
                  onPress={() => setListOpen(false)}
                />
                <ListItem
                  title="More Options"
                  onPress={() => setListOpen(false)}
                />
              </View>
            </SheetContent>
          </Sheet>
        </>
      }
    >
      <DemoSection
        title="Basic Sheet"
        description="Simple confirmations or quick actions."
      >
        <Button onPress={() => setBasicOpen(true)}>Open Basic Sheet</Button>
      </DemoSection>

      <DemoSection
        title="Snap Points"
        description="Multiple heights the sheet can snap to."
      >
        <DemoGroup direction="row">
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => openSnap(0)}
          >
            Half (50%)
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => openSnap(1)}
          >
            Full (90%)
          </Button>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="List Content"
        description="ListItems inside a sheet for selection menus."
      >
        <Button variant="ghost" onPress={() => setListOpen(true)}>
          Open List Sheet
        </Button>
      </DemoSection>
    </DemoPage>
  );
}
