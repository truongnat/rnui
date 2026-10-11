import { useState } from 'react';
import { View } from 'react-native';
import { Folder, Plus, Search } from 'lucide-react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateTitle,
} from '@/components/ui/empty-state';
import { ListItem } from '@/components/ui/list-item';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function EmptyStateScreen() {
  const [projects, setProjects] = useState(0);
  const [filtered, setFiltered] = useState(true);
  const muted = useIconColor('muted');
  const onPrimary = useIconColor('onPrimary');
  return (
    <DemoPage
      title="Empty State"
      description="Say what is missing and give a useful next step. Recovery changes the content, not just a toast."
    >
      <DemoSection
        title="First project"
        description="Create an item to move from an empty collection to real content."
        flush
      >
        <Animated.View
          layout={LinearTransition.duration(200).reduceMotion(
            ReduceMotion.System
          )}
        >
          {projects === 0 ? (
            <EmptyState icon={<Folder size={36} color={muted} />}>
              <EmptyStateTitle>No projects yet</EmptyStateTitle>
              <EmptyStateDescription>
                Keep your notes and files together. Create a project to get
                started.
              </EmptyStateDescription>
              <EmptyStateAction>
                <Button onPress={() => setProjects(1)}>
                  <Plus size={18} color={onPrimary} />
                  <Text>Create a project</Text>
                </Button>
              </EmptyStateAction>
            </EmptyState>
          ) : (
            <Animated.View
              entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
              className="py-3"
            >
              <ListItem
                title="Untitled project"
                subtitle="Just created · 0 files"
                leading={<Folder size={24} color={muted} />}
              />
              <View className="items-start px-4 pt-3">
                <Button variant="outline" onPress={() => setProjects(0)}>
                  Reset collection
                </Button>
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </DemoSection>
      <DemoSection
        title="No matching results"
        description="Clear the filter to reveal the underlying collection."
        flush
      >
        <Animated.View
          key={filtered ? 'filtered' : 'results'}
          entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
        >
          {filtered ? (
            <EmptyState icon={<Search size={36} color={muted} />}>
              <EmptyStateTitle>No archived projects</EmptyStateTitle>
              <EmptyStateDescription>
                Your projects are still active. Clear the archive filter to see
                them.
              </EmptyStateDescription>
              <EmptyStateAction>
                <Button variant="outline" onPress={() => setFiltered(false)}>
                  Clear archive filter
                </Button>
              </EmptyStateAction>
            </EmptyState>
          ) : (
            <View className="py-3">
              <ListItem
                title="Mobile launch"
                subtitle="Active · Updated today"
                leading={<Folder size={24} color={muted} />}
              />
              <ListItem
                title="Design review"
                subtitle="Active · Updated yesterday"
                leading={<Folder size={24} color={muted} />}
              />
              <View className="items-start px-4 pt-3">
                <Button variant="outline" onPress={() => setFiltered(true)}>
                  Show archived only
                </Button>
              </View>
            </View>
          )}
        </Animated.View>
      </DemoSection>
      <DemoSection
        title="Compact context"
        description="A quiet informational state needs no animation or action."
      >
        <EmptyState
          className="px-3 py-6"
          icon={<Search size={24} color={muted} />}
        >
          <EmptyStateTitle>No saved searches</EmptyStateTitle>
          <EmptyStateDescription>
            Searches you save will appear here for quick access.
          </EmptyStateDescription>
        </EmptyState>
        <Text
          variant="muted"
          className="mt-2 text-center"
          accessibilityLiveRegion="polite"
        >
          {projects > 0
            ? 'Your first project is ready.'
            : 'Create your first project above.'}
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
