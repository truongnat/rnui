import { useCallback, useMemo } from 'react';
import { View, type ListRenderItemInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedList } from '@/components/ui/animated-list';
import { useToast } from '@/components/ui/toast';
import { createRandomContact } from '@/demo/animatedListDemoData';
import { CONTACTS, type Contact } from '@/demo/demoData';
import { AnimatedListDemoFrame } from './AnimatedListDemoFrame';
import { useAnimatedListController } from './controller';
import { RemovableRow } from './RemovableRow';
import { ContactRow } from './rows';

export function ContactsDemo() {
  const { toast } = useToast();
  const insets = useSafeAreaInsets();

  const initialData = useMemo(() => CONTACTS.slice(0, 4), []);
  const {
    items,
    listRef,
    insert,
    finalizeRemove,
    animated,
    itemDelay,
    keyExtractor,
  } = useAnimatedListController<Contact>({
    initialData,
    createItem: createRandomContact,
    idPrefix: 'contact',
  });

  const openContact = useCallback(
    (_id: string, name: string) => toast.info(`Contact: ${name}`),
    [toast]
  );

  const listFooter = useMemo(
    () => <View style={{ height: insets.bottom + 32 }} />,
    [insets.bottom]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Contact>) => (
      <RemovableRow
        resetKey={info.item.id}
        onRemoved={() => finalizeRemove(info.item.id)}
      >
        {(remove) => (
          <ContactRow
            id={info.item.id}
            name={info.item.name}
            role={info.item.role}
            initials={info.item.initials}
            unread={info.item.unread}
            isLast={info.index === items.length - 1}
            onOpen={openContact}
            onRemove={remove}
          />
        )}
      </RemovableRow>
    ),
    [finalizeRemove, items.length, openContact]
  );

  return (
    <AnimatedListDemoFrame
      insertLabel="Insert Random Contact"
      onInsert={insert}
    >
      <AnimatedList<Contact>
        ref={listRef}
        style={{ flex: 1 }}
        data={items}
        extraData={items.length}
        animated={animated}
        itemDelay={itemDelay}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={listFooter}
      />
    </AnimatedListDemoFrame>
  );
}
