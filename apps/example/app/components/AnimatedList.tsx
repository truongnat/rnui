import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOut,
  LinearTransition,
  SlideInLeft,
  ZoomIn,
  type BaseAnimationBuilder,
  type EntryExitAnimationFunction,
  type ReanimatedKeyframe,
} from 'react-native-reanimated';
import { useToast, useTokens } from '@truongdq01/headless';
import { AnimatedList, Avatar, Button, ListItem, Typography } from '@truongdq01/ui';
import { CONTACTS, type Contact } from '@/demo/demoData';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type EnterAnimation =
  | BaseAnimationBuilder
  | EntryExitAnimationFunction
  | ReanimatedKeyframe;

const LAYOUT_ANIMATION = LinearTransition.duration(250);

function withStaggerDelay(
  animation: EnterAnimation | undefined,
  index: number,
  staggerDelay: number
): EnterAnimation | undefined {
  if (!animation) return undefined;
  if (
    typeof animation === 'object' &&
    animation !== null &&
    'delay' in animation &&
    typeof (animation as BaseAnimationBuilder).delay === 'function'
  ) {
    return (animation as BaseAnimationBuilder).delay(
      Math.min(index * staggerDelay, 1000)
    );
  }
  return animation;
}

function AnimatedPresetRows({
  title,
  contacts,
  entering,
  staggerEntering = false,
  staggerDelay = 80,
  renderRow,
}: {
  title: string;
  contacts: Contact[];
  entering?: EnterAnimation;
  staggerEntering?: boolean;
  staggerDelay?: number;
  renderRow: (contact: Contact, index: number) => ReactNode;
}) {
  const t = useTokens();

  return (
    <View style={{ marginBottom: t.spacing[6] }}>
      <Typography
        variant="overline"
        style={{ marginBottom: t.spacing[2], color: t.color.text.tertiary }}
      >
        {title}
      </Typography>
      <View
        style={{
          borderRadius: t.radius.lg,
          overflow: 'hidden',
          backgroundColor: t.color.surface.raised,
        }}
      >
        {contacts.map((contact, index) => (
          <Animated.View
            key={contact.id}
            entering={
              staggerEntering
                ? withStaggerDelay(entering, index, staggerDelay)
                : entering
            }
            layout={LAYOUT_ANIMATION}
          >
            {renderRow(contact, index)}
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

export default function AnimatedListScreen() {
  const t = useTokens();
  const toast = useToast();

  const [items, setItems] = useState<Contact[]>(CONTACTS.slice(0, 4));
  const [counter, setCounter] = useState(0);

  const addItem = useCallback(() => {
    const randomContact = CONTACTS[Math.floor(Math.random() * CONTACTS.length)];
    const newItem = { ...randomContact, id: `new-${counter}-${Date.now()}` };
    setItems((prev) => [newItem, ...prev]);
    setCounter((c) => c + 1);
  }, [counter]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  const renderContactRow = useCallback(
    (item: Contact, index: number, showRemove: boolean) => (
      <ListItem
        onPress={() => toast.info(`Contact: ${item.name}`)}
        divider={index < 100}
        secondaryAction={
          showRemove ? (
            <Button
              variant="ghost"
              size="sm"
              onPress={() => removeItem(item.id)}
              style={{ paddingHorizontal: t.spacing[2], paddingVertical: t.spacing[1] }}
            >
              <Typography variant="caption" color="error" style={{ fontWeight: '600' }}>
                Remove
              </Typography>
            </Button>
          ) : undefined
        }
      >
        <Avatar initials={item.initials} size="sm" />
        <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
          <Typography variant="subtitle2" numberOfLines={1}>
            {item.name}
          </Typography>
          <Typography variant="caption" color="secondary" numberOfLines={1}>
            {item.role}
          </Typography>
        </View>
      </ListItem>
    ),
    [removeItem, t.spacing, toast]
  );

  const renderItem = useCallback(
    (info: { item: Contact; index: number }) =>
      renderContactRow(info.item, info.index, true),
    [renderContactRow]
  );

  const listFooter = useMemo(
    () => (
      <DemoSection title="Entrance Presets" description="Timed enter animations on static lists.">
        <AnimatedPresetRows
          title="Staggered Zoom"
          contacts={CONTACTS.slice(0, 2)}
          entering={ZoomIn.duration(400)}
          staggerEntering
          staggerDelay={120}
          renderRow={(contact, index) => renderContactRow(contact, index, false)}
        />
        <AnimatedPresetRows
          title="Directional Slide (Left)"
          contacts={CONTACTS.slice(4, 6)}
          entering={SlideInLeft.duration(500)}
          renderRow={(contact, index) => renderContactRow(contact, index, false)}
        />
        <AnimatedPresetRows
          title="Fade from Right"
          contacts={CONTACTS.slice(6, 8)}
          entering={FadeInRight.duration(600)}
          staggerEntering
          staggerDelay={80}
          renderRow={(contact, index) => renderContactRow(contact, index, false)}
        />
      </DemoSection>
    ),
    [renderContactRow, t.spacing]
  );

  const listHeader = useMemo(
    () => (
      <View style={{ marginBottom: t.spacing[4] }}>
        <Button onPress={addItem} variant="solid">
          Insert Random Entry
        </Button>
      </View>
    ),
    [addItem, t.spacing]
  );

  return (
    <DemoPage
      scrollable={false}
      title="Animated List"
      description="Add or remove items to see Reanimated enter, exit, and layout animations."
    >
      <View
        style={{
          flex: 1,
          minHeight: 420,
          borderTopWidth: 1,
          borderTopColor: t.color.border.subtle,
        }}
      >
        <AnimatedList<Contact>
          id="interactive-list"
          data={items}
          estimatedItemSize={72}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          itemEntering={FadeInDown.duration(300)}
          itemExiting={FadeOut.duration(200)}
          itemLayout={LAYOUT_ANIMATION}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
        />
      </View>
    </DemoPage>
  );
}
