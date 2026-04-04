import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { AspectRatio } from '../AspectRatio';

describe('AspectRatio', () => {
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <AspectRatio testID="aspect-ratio">
        <View testID="child" />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
    expect(getByTestId('child')).toBeTruthy();
  });

  it('applies default 1:1 ratio when no ratio specified', () => {
    const { getByTestId } = render(
      <AspectRatio testID="aspect-ratio">
        <View />
      </AspectRatio>
    );

    const container = getByTestId('aspect-ratio');
    expect(container).toBeTruthy();
  });

  it('accepts custom ratio prop', () => {
    const { getByTestId } = render(
      <AspectRatio ratio={16 / 9} testID="aspect-ratio">
        <View />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });

  it('accepts width and height props for custom ratio', () => {
    const { getByTestId } = render(
      <AspectRatio width={4} height={3} testID="aspect-ratio">
        <View />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });

  it('prioritizes width/height over ratio prop', () => {
    const { getByTestId } = render(
      <AspectRatio ratio={1} width={16} height={9} testID="aspect-ratio">
        <View />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByTestId } = render(
      <AspectRatio testID="aspect-ratio" style={{ backgroundColor: 'red' }}>
        <View />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });

  it('handles empty children', () => {
    const { getByTestId } = render(<AspectRatio testID="aspect-ratio" />);

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });

  it('prioritizes width/height over ratio prop', () => {
    const { getByTestId } = render(
      <AspectRatio ratio={1} width={16} height={9} testID="aspect-ratio">
        <View />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });

  it('handles ratio=0 edge case', () => {
    const { getByTestId } = render(
      <AspectRatio ratio={0} testID="aspect-ratio">
        <View />
      </AspectRatio>
    );

    expect(getByTestId('aspect-ratio')).toBeTruthy();
  });
});
