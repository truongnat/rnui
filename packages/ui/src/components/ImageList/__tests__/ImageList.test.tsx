import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { View } from 'react-native';
import { ImageList, ImageListItem } from '../ImageList';

test('ImageList renders items', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ImageList cols={2}>
        <ImageListItem>
          <View />
        </ImageListItem>
      </ImageList>
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
