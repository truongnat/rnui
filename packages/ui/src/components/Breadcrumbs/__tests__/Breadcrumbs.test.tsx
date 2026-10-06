import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Text } from 'react-native';
import { BreadcrumbItem, Breadcrumbs } from '..';

test('Breadcrumbs renders BreadcrumbItem trail with separators', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Breadcrumbs>
        <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
        <BreadcrumbItem onPress={() => {}}>Docs</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(getByText('Home')).toBeTruthy();
  expect(getByText('Docs')).toBeTruthy();
  expect(getByText('Current')).toBeTruthy();
});

test('BreadcrumbItem renders startIcon before label', () => {
  const { getByText, getByTestId } = render(
    <ThemeProvider>
      <Breadcrumbs>
        <BreadcrumbItem
          onPress={() => {}}
          startIcon={<Text testID="home-icon">H</Text>}
        >
          Home
        </BreadcrumbItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(getByText('Home')).toBeTruthy();
  expect(getByTestId('home-icon')).toBeTruthy();
});

test('Breadcrumbs auto-marks last BreadcrumbItem as current', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Breadcrumbs>
        <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
        <BreadcrumbItem>Current page</BreadcrumbItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(getByText('Current page')).toBeTruthy();
});

test('Breadcrumbs collapses middle items with ellipsis', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Breadcrumbs maxItems={3}>
        <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
        <BreadcrumbItem onPress={() => {}}>Catalog</BreadcrumbItem>
        <BreadcrumbItem onPress={() => {}}>Winter</BreadcrumbItem>
        <BreadcrumbItem onPress={() => {}}>Sale</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Clothing</BreadcrumbItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(getByText('Home')).toBeTruthy();
  expect(getByText('...')).toBeTruthy();
  expect(getByText('Clothing')).toBeTruthy();
});
