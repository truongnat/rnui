import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Typography } from '../Typography';

export interface BlockquoteProps {
  id?: string;
  children?: React.ReactNode;
  /** Optional attribution for the quote (author, source, etc.). */
  cite?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function BlockquoteInner({
  id: idProp,
  children,
  cite,
  style,
}: BlockquoteProps) {
  const id = useId(idProp, 'blockquote');
  const {
    components: { blockquote },
  } = useTheme();

  const containerStyle = useMemo(
    () => [blockquote.container, style],
    [blockquote.container, style]
  );

  return (
    <View nativeID={id} style={containerStyle} accessibilityRole="text">
      <Typography variant="body1" color="secondary">
        {children}
      </Typography>
      {cite != null ? (
        <Typography color="secondary" style={blockquote.cite}>
          {cite}
        </Typography>
      ) : null}
    </View>
  );
}

export const Blockquote = React.memo(BlockquoteInner);
Blockquote.displayName = 'Blockquote';
