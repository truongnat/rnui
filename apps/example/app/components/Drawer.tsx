import { useCallback, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import {
  Drawer,
  DrawerHeader,
  DrawerFooter,
  Button,
  List,
  ListItem,
  ListItemContent,
  ListItemLeading,
} from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import {
  Bell,
  Eye,
  HelpCircle,
  Lock,
  Palette,
  User,
  X,
} from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const NAV_ICON_SIZE = 22;

export default function DrawerScreen() {
  const [open, setOpen] = useState(false);
  const { tokens } = useTheme();

  const close = useCallback(() => setOpen(false), []);
  const iconColor = tokens.color.text.secondary;

  return (
    <DemoPage
      title="Drawer"
      description="Side panels for navigation or focused secondary tasks."
    >
      <DemoSection
        title="Navigation Drawer"
        description="Slides in from the edge with grouped list items and actions."
      >
        <Button label="Open Navigation Drawer" onPress={() => setOpen(true)} />

        <Drawer open={open} onClose={close}>
          <DrawerHeader
            title="Settings"
            trailing={
              <Pressable
                onPress={close}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close drawer"
              >
                <X size={NAV_ICON_SIZE} color={iconColor} />
              </Pressable>
            }
          />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: tokens.spacing[2] }}
            showsVerticalScrollIndicator={false}
          >
            <List subheader="Account">
              <ListItem onPress={close}>
                <ListItemLeading>
                  <User size={NAV_ICON_SIZE} color={iconColor} />
                </ListItemLeading>
                <ListItemContent primary="Profile" />
              </ListItem>
              <ListItem onPress={close}>
                <ListItemLeading>
                  <Lock size={NAV_ICON_SIZE} color={iconColor} />
                </ListItemLeading>
                <ListItemContent primary="Account Security" />
              </ListItem>
              <ListItem onPress={close}>
                <ListItemLeading>
                  <Eye size={NAV_ICON_SIZE} color={iconColor} />
                </ListItemLeading>
                <ListItemContent primary="Privacy & Data" />
              </ListItem>
            </List>

            <List subheader="Preferences">
              <ListItem onPress={close}>
                <ListItemLeading>
                  <Palette size={NAV_ICON_SIZE} color={iconColor} />
                </ListItemLeading>
                <ListItemContent primary="App Appearance" />
              </ListItem>
              <ListItem onPress={close}>
                <ListItemLeading>
                  <Bell size={NAV_ICON_SIZE} color={iconColor} />
                </ListItemLeading>
                <ListItemContent primary="Notifications" />
              </ListItem>
              <ListItem onPress={close}>
                <ListItemLeading>
                  <HelpCircle size={NAV_ICON_SIZE} color={iconColor} />
                </ListItemLeading>
                <ListItemContent primary="Help & Support" />
              </ListItem>
            </List>
          </ScrollView>

          <DrawerFooter>
            <Button
              label="Log Out"
              variant="outline"
              color="error"
              fullWidth
              onPress={close}
            />
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
