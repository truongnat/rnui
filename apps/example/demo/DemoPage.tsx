import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoThemeControls } from '@/demo/DemoThemeControls';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import type React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DemoPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  floatingContent?: React.ReactNode;
  /** Show global theme preview FAB (light/dark/system). Default true. */
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
  const colors = useThemeColor();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderContent = () => (
    <View style={[styles.introSection, !scrollable && styles.flex]}>
      {description ? (
        <Text variant="muted" style={styles.description}>
          {description}
        </Text>
      ) : null}
      <View style={[styles.content, !scrollable && styles.flex]}>
        {children}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <View
        className="bg-card"
        style={[
          styles.header,
          {
            paddingTop: insets.top + 6,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ChevronLeft color={colors.foreground} size={24} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text variant="large" style={styles.headerTitle}>
            {title}
          </Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 32 },
          ]}
        >
          {renderContent()}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.flex,
            styles.scrollContent,
            { paddingBottom: insets.bottom + 16 },
          ]}
        >
          {renderContent()}
        </View>
      )}

      {showThemeControls || floatingContent ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {showThemeControls ? <DemoThemeControls /> : null}
          {floatingContent}
        </View>
      ) : null}
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
  const colors = useThemeColor();

  const header = (
    <View style={styles.sectionHeader}>
      <Text variant="large">{title}</Text>
      {description ? <Text variant="muted">{description}</Text> : null}
    </View>
  );

  if (bare) {
    return (
      <View style={styles.bareSection}>
        {header}
        <View style={styles.bareContent}>{children}</View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      {header}
      <View
        className="bg-card"
        style={[
          styles.sectionCard,
          { borderColor: colors.border, padding: flush ? 0 : 16 },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

/** Muted well for isolating interactive previews inside a section card */
export const DemoPreview: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <View className="rounded-md bg-muted p-4 gap-3">{children}</View>;
};

export const DemoGroup: React.FC<{
  children: React.ReactNode;
  gap?: number;
  direction?: 'row' | 'column';
  label?: string;
}> = ({ children, gap, direction = 'row', label }) => {
  return (
    <View style={styles.group}>
      {label ? <Text variant="muted">{label}</Text> : null}
      <View
        style={[
          direction === 'row' ? styles.groupRow : styles.groupColumn,
          { gap: gap ?? 12 },
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    zIndex: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  introSection: {
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  description: {
    lineHeight: 22,
  },
  content: {
    gap: 20,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    gap: 4,
    paddingHorizontal: 2,
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
    overflow: 'hidden',
  },
  bareSection: {
    gap: 12,
  },
  bareContent: {
    gap: 12,
  },
  group: {
    gap: 8,
  },
  groupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  groupColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});
