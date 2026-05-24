const fs = require('fs');
const path = require('path');

const UI_COMPS_DIR = path.join(__dirname, '../packages/ui/src/components');
const INDEX_FILE = path.join(__dirname, '../apps/example/app/index.tsx');
const COMPONENTS_OUT_DIR = path.join(
  __dirname,
  '../apps/example/app/components'
);

const uiComps = fs
  .readdirSync(UI_COMPS_DIR)
  .filter((d) => fs.statSync(path.join(UI_COMPS_DIR, d)).isDirectory())
  .sort();

if (!fs.existsSync(COMPONENTS_OUT_DIR)) {
  fs.mkdirSync(COMPONENTS_OUT_DIR, { recursive: true });
}

uiComps.forEach((comp) => {
  const fileContent = `import { Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ${comp}Screen() {
  return (
    <DemoPage title="${comp}" description="Demo for the ${comp} component.">
      <DemoSection title="Overview">
        <Typography variant="body1" color="secondary">
          Add ${comp} usage examples here.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}
`;
  fs.writeFileSync(path.join(COMPONENTS_OUT_DIR, `${comp}.tsx`), fileContent);
});

const newIndexContent = `import { useTokens } from '@truongdq01/headless';
import { Typography } from '@truongdq01/ui';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { PillSearchBar, ScreenHeader } from './components/_shared/ExampleChrome';

const COMPONENTS = [
${uiComps.map((c) => `  '${c}',`).join('\n')}
];

export default function ComponentsListScreen() {
  const t = useTokens();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = COMPONENTS.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
      <ScreenHeader title="Components" />
      <View style={{ padding: t.spacing[4], paddingBottom: 0 }}>
        <PillSearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search components..."
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: t.spacing[4],
          gap: t.spacing[2],
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(\`/components/\${item}\`)}
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
