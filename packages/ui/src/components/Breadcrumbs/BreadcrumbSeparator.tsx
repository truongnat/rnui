import { useTheme } from '@truongdq01/headless';
import { memo, type ReactNode } from 'react';
import { Text, View } from 'react-native';

interface BreadcrumbSeparatorProps {
  separator: ReactNode;
}

function BreadcrumbSeparatorInner({ separator }: BreadcrumbSeparatorProps) {
  const {
    components: { breadcrumbs },
  } = useTheme();

  if (typeof separator === 'string' || typeof separator === 'number') {
    return (
      <View style={breadcrumbs.separator.container}>
        <Text style={breadcrumbs.separator.text}>{separator}</Text>
      </View>
    );
  }

  return (
    <View style={breadcrumbs.separator.container}>{separator}</View>
  );
}

export const BreadcrumbSeparator = memo(BreadcrumbSeparatorInner);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
