import { AppBar } from '@/components/ui/app-bar';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ThemeToggleButton } from '@/demo/DemoThemeControls';
import { useThemeColor } from '@/lib/utils';
import { useNavigation, useRouter } from 'expo-router';
import type React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DemoPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  floatingContent?: React.ReactNode;
  /** Show global theme toggle button in AppBar trailing slot. Default true. */
  showThemeControls?: boolean;
}

export const DemoPage: React.FC<DemoPageProps> = ({
  title,
  description,
  children,
  scrollable = true,
  floatingContent,
  showThemeControls = true,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    try {
      if (navigation && navigation.canGoBack()) {
        navigation.goBack();
      } else {
        router.push('/');
      }
    } catch {
      router.push('/');
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Official AppBar component with integrated Back well and Theme Action */}
      <AppBar
        title={title}
        onBack={handleBack}
        trailing={showThemeControls ? <ThemeToggleButton /> : null}
      />

      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 36 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {description ? (
            <View className="mt-4 mb-2">
              <Text variant="muted" className="leading-5">
                {description}
              </Text>
            </View>
          ) : null}
          <View className="gap-5 pb-8">{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.flex, styles.scrollContent]}>
          {description ? (
            <View className="mt-4 mb-2">
              <Text variant="muted" className="leading-5">
                {description}
              </Text>
            </View>
          ) : null}
          <View className="flex-1 gap-5 pb-8">{children}</View>
        </View>
      )}

      {floatingContent}
    </View>
  );
};

export const DemoSection: React.FC<{
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** When true, children render on raised surface without inner preview well */
  flush?: boolean;
  /** When true, skip the outer surface card — for demos that are already card-like */
  bare?: boolean;
}> = ({ title, description, children, flush = false, bare = false }) => {
  const header = (
    <View style={styles.sectionHeader}>
      <Text className="text-base font-bold text-foreground tracking-tight">
        {title}
      </Text>
      {description ? (
        <Text variant="muted" className="text-xs leading-4 mt-0.5">
          {description}
        </Text>
      ) : null}
    </View>
  );

  if (bare) {
    return (
      <View style={styles.bareSection}>
        {header}
        {children ? <View style={styles.bareContent}>{children}</View> : null}
      </View>
    );
  }

  return (
    <View style={styles.section}>
      {header}
      {children ? (
        <Card className={flush ? 'p-0 border-border' : 'p-5 border-border'}>
          {children}
        </Card>
      ) : null}
    </View>
  );
};

export const DemoPreview: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <View className="rounded-xl bg-muted/50 p-4 gap-3 border border-border">{children}</View>;
};

export const DemoGroup: React.FC<{
  children: React.ReactNode;
  gap?: number;
  direction?: 'row' | 'column';
  label?: string;
}> = ({ children, gap = 12, direction = 'row', label }) => {
  return (
    <View style={styles.group}>
      {label ? (
        <Text variant="muted" className="text-xs font-semibold uppercase tracking-wider mb-2">
          {label}
        </Text>
      ) : null}
      <View
        style={[
          direction === 'row' ? styles.groupRow : styles.groupColumn,
          { gap },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  section: {
    gap: 10,
  },
  bareSection: {
    gap: 10,
  },
  sectionHeader: {
    gap: 2,
    paddingHorizontal: 2,
  },
  bareContent: {
    gap: 12,
  },
  group: {
    gap: 4,
  },
  groupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  groupColumn: {
    flexDirection: 'column',
  },
});
