import React from 'react';
import { render } from '@testing-library/react-native';
import { Carousel } from '../Carousel';
import { ThemeProvider } from '@truongdq01/headless';
import { Text } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light" brand={undefined} override={undefined}>
    {children}
  </ThemeProvider>
);

test('Carousel renders current item', () => {
  const data = ['Slide 1', 'Slide 2'];
  const { getByText } = render(
    <Wrap>
      <Carousel
        data={data}
        itemWidth={375}
        renderItem={(item) => <Text>{item}</Text>}
      />
    </Wrap>
  );
  expect(getByText('Slide 1')).toBeTruthy();
});

test('Carousel renders nothing when data is empty', () => {
  const { queryByText } = render(
    <Wrap>
      <Carousel<string>
        data={[]}
        itemWidth={375}
        renderItem={() => <Text>should-not-show</Text>}
      />
    </Wrap>
  );
  expect(queryByText('should-not-show')).toBeNull();
});

test('Carousel uses keyExtractor for stable keys', () => {
  type Row = { id: string; label: string };
  const rows: Row[] = [
    { id: 'a', label: 'A1' },
    { id: 'b', label: 'B1' },
  ];
  const { getByText } = render(
    <Wrap>
      <Carousel<Row>
        data={rows}
        itemWidth={300}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <Text>{item.label}</Text>}
      />
    </Wrap>
  );
  expect(getByText('A1')).toBeTruthy();
});
