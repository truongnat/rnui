const fs = require('fs');
const path = require('path');

const UI_COMPS_DIR = path.join(__dirname, '../packages/ui/src/components');
const INDEX_FILE = path.join(__dirname, '../apps/example/app/index.tsx');
const COMPONENTS_OUT_DIR = path.join(
  __dirname,
  '../apps/example/app/components'
);

// 1. Get all UI Components
const uiComps = fs
  .readdirSync(UI_COMPS_DIR)
  .filter((d) => fs.statSync(path.join(UI_COMPS_DIR, d)).isDirectory())
  .sort();

if (!fs.existsSync(COMPONENTS_OUT_DIR)) {
  fs.mkdirSync(COMPONENTS_OUT_DIR, { recursive: true });
}

// Scaffold all components without destroying TS typing
uiComps.forEach((comp) => {
  const fileContent = `import React from 'react';
import { View, ScrollView } from 'react-native';
import { Typography, Button } from '@truongdq01/ui';
import { ScreenHeader, Section } from '../kitchen/ui';
import { useTokens } from '@truongdq01/headless';

export default function ${comp}Screen() {
  const t = useTokens();
  
  return (
    <View style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
      <ScreenHeader title="${comp}" />
      <ScrollView contentContainerStyle={{ padding: t.spacing[4], gap: t.spacing[4], paddingBottom: 100 }}>
        
        <Section title="Overview">
          <Typography variant="body1" color="secondary">
            Demo for ${comp} component. Migrate specific examples from kitchen-sink.tsx 
            to showcase all variants here.
          </Typography>
        </Section>
        
        <Section title="Basic Usage">
            <Typography variant="body1" color="tertiary">Placeholder</Typography>
        </Section>

      </ScrollView>
    </View>
  );
}
`;
  fs.writeFileSync(path.join(COMPONENTS_OUT_DIR, `${comp}.tsx`), fileContent);
});

// Rewrite index.tsx to be a directory
const newIndexContent = `import React, { useState } from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { Typography, Divider, Icon, Button, Section } from '@truongdq01/ui';
import { ScreenHeader, PillSearchBar } from './kitchen/ui';
import { useTokens } from '@truongdq01/headless';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

const COMPONENTS = [
${uiComps.map((c) => `  '${c}',`).join('\n')}
];

export default function ComponentsListScreen() {
  const t = useTokens();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = COMPONENTS.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
      <ScreenHeader title="Components" />
      <View style={{ padding: t.spacing[4], paddingBottom: 0 }}>
        <PillSearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search components..."
        />
        <View style={{ marginTop: 10 }}>
          <Button label="View Legacy Kitchen Sink" size="sm" variant="outline" onPress={() => router.push('/kitchen-sink' as any)} />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: t.spacing[4], gap: t.spacing[2], paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Pressable 
            onPress={() => router.push(\`/components/\${item}\` as any)}
            style={({ pressed }) => ({
              padding: t.spacing[4],
              backgroundColor: pressed ? t.color.bg.muted : t.color.bg.default,
              borderRadius: t.radius.lg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: t.color.border.subtle,
            })}
          >
            <Typography variant="h4">{item}</Typography>
            <ChevronRight size={20} color={t.color.text.tertiary} />
          </Pressable>
        )}
      />
    </View>
  );
}
`;

fs.writeFileSync(INDEX_FILE, newIndexContent);
console.log('Finished restructuring Expo app.');
