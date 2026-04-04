import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BottomNavigation, BottomNavigationAction } from '../BottomNavigation';
import { ThemeProvider } from '@truongdq01/headless';
import { Text } from 'react-native';

test('BottomNavigation handles item selection', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <BottomNavigation value="home" onChange={onChange} showLabels>
        <BottomNavigationAction value="home" label="Home" />
        <BottomNavigationAction value="search" label="Search" />
      </BottomNavigation>
    </ThemeProvider>
  );

  fireEvent.press(getByText('Search'));
  expect(onChange).toHaveBeenCalledWith('search');
});
