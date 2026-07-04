import type React from 'react';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { DemoThemeControls } from '@/demo/DemoThemeControls';

interface DemoPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  floatingContent?: React.ReactNode;
  /** Show global theme preview FAB (light/dark + brand). Default true. */
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
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const themedStyles = useMemo(
    () =>
      StyleSheet.create({
        scrollContent: {
          paddingHorizontal: tokens.spacing[4],
        },
        introSection: {
          marginTop: tokens.spacing[4],
          marginBottom: tokens.spacing[2],
          gap: tokens.spacing[2],
        },
        description: {
          lineHeight: tokens.fontSize.md * 1.55,
        },
        content: {
          gap: tokens.spacing[5],
        },
        header: {
          paddingBottom: tokens.spacing[3],
          paddingHorizontal: tokens.spacing[3],
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: tokens.color.border.subtle,
          backgroundColor: tokens.color.surface.default,
        },
      }),
    [tokens],
  );

  const renderContent = () => (
    <View
      style={[
        themedStyles.introSection,
        !scrollable && styles.introSectionStatic,
      ]}
    >
      {description ? (
        <Typography
          variant="body1"
          color="secondary"
          style={themedStyles.description}
        >
          {description}
        </Typography>
      ) : null}
      <View style={[themedStyles.content, !scrollable && styles.contentStatic]}>
        {children}
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: tokens.color.bg.subtle }]}
    >
      <View
        style={[
          styles.header,
          themedStyles.header,
          { paddingTop: insets.top + tokens.spacing[1.5] },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: tokens.opacity[70] },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ChevronLeft color={tokens.color.text.primary} size={24} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ fontWeight: tokens.fontWeight.semibold }}
          >
            {title}
          </Typography>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
          contentContainerStyle={[
            themedStyles.scrollContent,
            { paddingBottom: insets.bottom + tokens.spacing[8] },
          ]}
        >
          {renderContent()}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.container,
            themedStyles.scrollContent,
            styles.scrollContentStatic,
            { paddingBottom: insets.bottom + tokens.spacing[4] },
          ]}
        >
          {renderContent()}
        </View>
      )}

      {(showThemeControls || floatingContent) ? (
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
  const { tokens } = useTheme();

  const header = (
    <View style={{ gap: tokens.spacing[1], paddingHorizontal: tokens.spacing[0.5] }}>
      <Typography
        variant="subtitle2"
        style={{ fontWeight: tokens.fontWeight.semibold }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="secondary">
          {description}
        </Typography>
      ) : null}
    </View>
  );

  if (bare) {
    return (
      <View style={{ gap: tokens.spacing[3] }}>
        {header}
        <View style={{ gap: tokens.spacing[3] }}>{children}</View>
      </View>
    );
  }

  return (
    <View style={{ gap: tokens.spacing[2] }}>
      {header}
      <View
        style={{
          backgroundColor: tokens.color.surface.default,
          borderRadius: tokens.radius.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: tokens.color.border.subtle,
          padding: flush ? 0 : tokens.spacing[4],
          gap: tokens.spacing[3],
          overflow: 'hidden',
        }}
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
  const { tokens } = useTheme();
  return (
    <View
      style={{
        padding: tokens.spacing[4],
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.surface.sunken,
        gap: tokens.spacing[3],
      }}
    >
      {children}
    </View>
  );
};

export const DemoGroup: React.FC<{
  children: React.ReactNode;
  gap?: number;
  direction?: 'row' | 'column';
  label?: string;
}> = ({ children, gap, direction = 'row', label }) => {
  const { tokens } = useTheme();
  return (
    <View style={{ gap: tokens.spacing[2] }}>
      {label ? (
        <Typography variant="caption" color="tertiary">
          {label}
        </Typography>
      ) : null}
      <View
        style={[
          direction === 'row' ? styles.group : styles.groupColumn,
          { gap: gap ?? tokens.spacing[3] },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
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
  headerPlaceholder: {
    width: 44,
  },
  scrollContentStatic: {
    flex: 1,
  },
  introSectionStatic: {
    flex: 1,
  },
  contentStatic: {
    flex: 1,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  groupColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});
