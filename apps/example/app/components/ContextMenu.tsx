import { useTokens } from '@truongdq01/headless';
import { Button, Card, ContextMenu, Icon } from '@truongdq01/ui';
import { useCallback, useMemo, useRef, useState, type RefObject } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type Anchor = { x: number; y: number; width: number; height: number };

export default function ContextMenuScreen() {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const cardRefA = useRef<View>(null);
  const cardRefB = useRef<View>(null);
  const buttonWrapRef = useRef<View>(null);

  const openMenu = useCallback((ref: RefObject<View | null>) => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  }, []);

  const contextItems = useMemo(
    () => [
      {
        id: 'edit',
        label: 'Edit Post',
        icon: <Icon name="edit" size={18} color={t.color.text.secondary} />,
      },
      {
        id: 'share',
        label: 'Share',
        icon: <Icon name="share" size={18} color={t.color.text.secondary} />,
      },
      {
        id: 'download',
        label: 'Download',
        icon: <Icon name="download" size={18} color={t.color.text.secondary} />,
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <Icon name="trash" size={18} color={t.color.status.error} />,
        destructive: true,
      },
    ],
    [t.color.text.secondary, t.color.status.error],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        grid: {
          flexDirection: 'row',
          gap: t.spacing[4],
        },
        pressable: {
          flex: 1,
        },
        itemCard: {
          padding: t.spacing[6],
          alignItems: 'center',
          justifyContent: 'center',
        },
        buttonWrap: {
          alignSelf: 'flex-start',
        },
      }),
    [t.spacing],
  );

  return (
    <DemoPage
      title="ContextMenu"
      description="Temporary menu for additional actions on an element."
    >
      <DemoSection title="Card Triggers" description="Tap cards to open a context menu.">
        <View style={styles.grid}>
          <Pressable
            ref={cardRefA}
            collapsable={false}
            onPress={() => openMenu(cardRefA)}
            style={({ pressed }) => [
              styles.pressable,
              pressed ? { opacity: 0.92 } : null,
            ]}
          >
            <Card style={styles.itemCard}>
              <Icon name="more-vertical" size={24} color={t.color.text.secondary} />
            </Card>
          </Pressable>

          <Pressable
            ref={cardRefB}
            collapsable={false}
            onPress={() => openMenu(cardRefB)}
            style={({ pressed }) => [
              styles.pressable,
              pressed ? { opacity: 0.92 } : null,
            ]}
          >
            <Card style={styles.itemCard}>
              <Icon name="image" size={24} color={t.color.text.secondary} />
            </Card>
          </Pressable>
        </View>
      </DemoSection>

      <DemoSection title="Button Trigger">
        <View ref={buttonWrapRef} collapsable={false} style={styles.buttonWrap}>
          <Button
            variant="outline"
            onPress={() => openMenu(buttonWrapRef)}
            leadingIcon={<Icon name="menu" size={20} />}
            label="Options Menu"
          />
        </View>
      </DemoSection>

      <ContextMenu
        open={open}
        onClose={() => setOpen(false)}
        anchor={anchor}
        items={contextItems.map((i) => ({
          id: i.id,
          label: i.label,
          icon: i.icon,
          destructive: i.destructive,
          onPress: () => {},
        }))}
      />
    </DemoPage>
  );
}
