import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface DemoPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  floatingContent?: React.ReactNode; // For portals/overlays to cover headers
}

export const DemoPage: React.FC<DemoPageProps> = ({
  title,
  description,
  children,
  scrollable = true,
  floatingContent,
}) => {
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderContent = () => (
    <View style={styles.introSection}>
      <Typography variant="h3" style={[styles.largeTitle, { fontWeight: '800' }]}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="secondary" style={styles.description}>
          {description}
        </Typography>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: tokens.color.bg.default }]}>
      {/* Header with Back Button */}
      <View style={[styles.header, { paddingTop: insets.top + 8, borderBottomColor: tokens.color.border.subtle, backgroundColor: tokens.color.bg.default }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft color={tokens.color.text.primary} size={28} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Typography variant="h6" align="center" style={{ fontWeight: '700' }}>
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
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + 32,
            },
          ]}
        >
          {renderContent()}
        </ScrollView>
      ) : (
        <View style={[styles.container, styles.scrollContent]}>
          {renderContent()}
        </View>
      )}

      {/* Overlays / Modals area */}
      {floatingContent && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {floatingContent}
        </View>
      )}
    </View>
  );
};

export const DemoSection: React.FC<{ title: string; description?: string; children?: React.ReactNode }> = ({ title, description, children }) => {
  const { tokens } = useTheme();
  return (
    <View style={styles.section}>
      <Typography 
        variant="overline" 
        style={[styles.sectionTitle, { color: tokens.color.text.tertiary, fontWeight: '700' }]}
      >
        {title.toUpperCase()}
      </Typography>
      {description && (
        <Typography variant="body2" color="secondary" style={styles.sectionDescription}>
          {description}
        </Typography>
      )}
      <View style={styles.sectionCard}>
        {children}
      </View>
    </View>
  );
};

export const DemoGroup: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 12 }) => {
  return (
    <View style={[styles.group, { gap }]}>
      {children}
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
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
  backButton: {
    zIndex: 10,
    width: 40,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  introSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  largeTitle: {
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
    opacity: 0.8,
  },
  content: {
    gap: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    paddingLeft: 4,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  sectionDescription: {
    marginBottom: 12,
    lineHeight: 20,
    opacity: 0.9,
    paddingHorizontal: 4,
  },
  sectionCard: {
    gap: 12,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
