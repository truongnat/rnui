import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast, useTokens } from '@truongdq01/headless';
import { AnimatedList } from '@truongdq01/ui';
import { createRandomContact } from '@/demo/animatedListDemoData';
import { CONTACTS, type Contact } from '@/demo/demoData';
import { AnimatedListDemoFrame } from './AnimatedListDemoFrame';
import { INSERT_AT_TOP_MVCP, useAnimatedListController } from './controller';
import { RemovableRow } from './RemovableRow';
import { ContactRow } from './rows';

export function ContactsDemo() {
  const t = useTokens();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const initialData = useMemo(() => CONTACTS.slice(0, 4), []);
  const {
    items,
    type,
    setType,
    listRef,
    countRef,
    insert,
    finalizeRemove,
    activeListConfig,
    removeVariant,
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
    () => <View style={{ height: insets.bottom + t.spacing[8] }} />,
    [insets.bottom, t.spacing]
  );

  const renderItem = useCallback(
    (info: { item: Contact; index: number }) => (
      <RemovableRow
        resetKey={info.item.id}
        variant={removeVariant}
        onRemoved={() => finalizeRemove(info.item.id)}
      >
        {(remove) => (
          <ContactRow
            id={info.item.id}
            name={info.item.name}
            role={info.item.role}
            initials={info.item.initials}
            unread={info.item.unread}
            isLast={info.index === countRef.current - 1}
            contentGap={t.spacing[3]}
            actionPaddingH={t.spacing[2]}
            actionPaddingV={t.spacing[1]}
            onOpen={openContact}
            onRemove={remove}
          />
        )}
      </RemovableRow>
    ),
    [countRef, finalizeRemove, openContact, removeVariant, t.spacing]
  );

  return (
    <AnimatedListDemoFrame
      type={type}
      onChangeType={setType}
      insertLabel="Insert Random Contact"
      onInsert={insert}
    >
      <AnimatedList<Contact>
        ref={listRef}
        {...activeListConfig}
        style={{ flex: 1 }}
        data={items}
        extraData={items.length}
        maintainVisibleContentPosition={INSERT_AT_TOP_MVCP}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={listFooter}
      />
    </AnimatedListDemoFrame>
  );
}
