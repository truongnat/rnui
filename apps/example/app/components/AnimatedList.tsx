import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useToast, useTokens } from '@truongdq01/headless';
import { AnimatedList, Avatar, Button, ListItem, Typography } from '@truongdq01/ui';
import { FadeInRight, FadeOut, SlideInLeft, ZoomIn } from 'react-native-reanimated';
import { CONTACTS, type Contact } from '../kitchen/constants';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function AnimatedListScreen() {
  const t = useTokens();
  const toast = useToast();
  
  // Interactive list state
  const [items, setItems] = useState<Contact[]>(CONTACTS.slice(0, 4));
  const [counter, setCounter] = useState(0);

  const addItem = () => {
    const randomContact = CONTACTS[Math.floor(Math.random() * CONTACTS.length)];
    const newItem = { ...randomContact, id: `new-${counter}-${Date.now()}` };
    setItems([newItem, ...items]);
    setCounter(c => c + 1);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter((item) => item.id !== id));
  };

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Contact; index: number }) => (
      <ListItem
        onPress={() => toast.info(`Contact: ${item.name}`)}
        divider={index < 100}
        secondaryAction={
          <Button
            variant="ghost"
            size="sm"
            onPress={() => removeItem(item.id)}
            style={{ paddingHorizontal: 8, paddingVertical: 4 }}
          >
            <Typography variant="caption" color="error" style={{ fontWeight: '600' }}>Remove</Typography>
          </Button>
        }
      >
        <Avatar initials={item.initials} size="sm" />
        <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
          <Typography variant="subtitle2" numberOfLines={1}>{item.name}</Typography>
          <Typography variant="caption" color="secondary" numberOfLines={1}>
            {item.role}
          </Typography>
        </View>
      </ListItem>
    ),
    [t.spacing, toast]
  );

  return (
    <DemoPage
      title="Animated List"
      description="High-performance lists powered by Reanimated 3 and Shopify FlashList, featuring smooth entrance, exit, and layout animations."
    >
      <DemoSection title="Interactive Layout Logic">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Add or remove items to observe automatic layout shifts. The list uses spring-based 
          transitions to reposition items as the dataset changes.
        </Typography>
        <Button onPress={addItem} variant="solid" style={{ marginBottom: t.spacing[4] }}>
          Insert Random Entry
        </Button>
        <View style={{ height: 350, borderTopWidth: 1, borderTopColor: t.color.border.subtle }}>
          <AnimatedList<Contact>
            id="interactive-list"
            data={items}
            estimatedItemSize={72}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            itemExiting={FadeOut}
          />
        </View>
      </DemoSection>

      <DemoSection title="Entrance Presets">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Sequential entrance animations help guide the user's eye and create a premium feel.
        </Typography>
        
        <Typography variant="overline" style={{ marginBottom: t.spacing[2], color: t.color.text.muted }}>Staggered Zoom</Typography>
        <View style={{ height: 160, marginBottom: t.spacing[6] }}>
          <AnimatedList<Contact>
            id="zoom-list"
            data={CONTACTS.slice(0, 2)}
            estimatedItemSize={72}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            itemEntering={ZoomIn.duration(400)}
            staggerEntering
            staggerDelay={120}
          />
        </View>

        <Typography variant="overline" style={{ marginBottom: t.spacing[2], color: t.color.text.muted }}>Directional Slide (Left)</Typography>
        <View style={{ height: 160, marginBottom: t.spacing[6] }}>
          <AnimatedList<Contact>
            id="slide-list"
            data={CONTACTS.slice(4, 6)}
            estimatedItemSize={72}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            itemEntering={SlideInLeft.duration(500)}
          />
        </View>

        <Typography variant="overline" style={{ marginBottom: t.spacing[2], color: t.color.text.muted }}>Fade from Right</Typography>
        <View style={{ height: 160 }}>
          <AnimatedList<Contact>
            id="fade-list"
            data={CONTACTS.slice(6, 8)}
            estimatedItemSize={72}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            itemEntering={FadeInRight.duration(600)}
            staggerEntering
            staggerDelay={80}
          />
        </View>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({});


