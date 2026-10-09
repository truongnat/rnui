import { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import {
  Bell,
  Eye,
  HelpCircle,
  Lock,
  Palette,
  User,
  X,
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ListItem, ListSectionTitle } from '@/components/ui/list-item';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

const NAV_ICON_SIZE = 22;

export default function DrawerScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const iconColor = useIconColor('muted');

  return (
    <DemoPage
      title="Drawer"
      description="Side panels for navigation or focused secondary tasks."
    >
      <DemoSection
        title="Navigation Drawer"
        description="Slides in from the left edge with grouped list items and actions."
      >
        <Button className="self-start" onPress={() => setLeftOpen(true)}>
          Open Navigation Drawer
        </Button>

        <Drawer open={leftOpen} onOpenChange={setLeftOpen}>
          <DrawerHeader className="flex-row items-center justify-between">
            <DrawerTitle>Settings</DrawerTitle>
            <Pressable
              onPress={() => setLeftOpen(false)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Close drawer"
            >
              <X size={NAV_ICON_SIZE} color={iconColor} />
            </Pressable>
          </DrawerHeader>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 8 }}
            showsVerticalScrollIndicator={false}
          >
            <ListSectionTitle>Account</ListSectionTitle>
            <ListItem
              title="Profile"
              leading={<User size={NAV_ICON_SIZE} color={iconColor} />}
              chevron={false}
              onPress={() => setLeftOpen(false)}
            />
            <ListItem
              title="Account Security"
              leading={<Lock size={NAV_ICON_SIZE} color={iconColor} />}
              chevron={false}
              onPress={() => setLeftOpen(false)}
            />
            <ListItem
              title="Privacy & Data"
              leading={<Eye size={NAV_ICON_SIZE} color={iconColor} />}
              chevron={false}
              onPress={() => setLeftOpen(false)}
            />

            <ListSectionTitle>Preferences</ListSectionTitle>
            <ListItem
              title="App Appearance"
              leading={<Palette size={NAV_ICON_SIZE} color={iconColor} />}
              chevron={false}
              onPress={() => setLeftOpen(false)}
            />
            <ListItem
              title="Notifications"
              leading={<Bell size={NAV_ICON_SIZE} color={iconColor} />}
              chevron={false}
              onPress={() => setLeftOpen(false)}
            />
            <ListItem
              title="Help & Support"
              leading={<HelpCircle size={NAV_ICON_SIZE} color={iconColor} />}
              chevron={false}
              onPress={() => setLeftOpen(false)}
            />
          </ScrollView>

          <DrawerFooter>
            <Button
              variant="outline"
              labelClassName="text-destructive"
              className="w-full"
              onPress={() => setLeftOpen(false)}
            >
              Log Out
            </Button>
          </DrawerFooter>
        </Drawer>
      </DemoSection>

      <DemoSection
        title="Right Side"
        description="side='right' slides a focused panel in from the opposite edge."
      >
        <Button
          className="self-start"
          variant="outline"
          onPress={() => setRightOpen(true)}
        >
          Open Right Drawer
        </Button>

        <Drawer open={rightOpen} onOpenChange={setRightOpen} side="right">
          <DrawerHeader>
            <DrawerTitle>Details</DrawerTitle>
            <DrawerDescription>
              Secondary content panel anchored to the right.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerContent>
            <Text variant="muted">
              Use the right drawer for filters, inspectors, or detail tools that
              complement the main content.
            </Text>
          </DrawerContent>
          <DrawerFooter>
            <Button className="w-full" onPress={() => setRightOpen(false)}>
              Done
            </Button>
          </DrawerFooter>
        </Drawer>
      </DemoSection>

      <DemoSection
        title="When to Use"
        description="Main navigation when top-level sections do not fit in a tab bar."
      />
    </DemoPage>
  );
}
