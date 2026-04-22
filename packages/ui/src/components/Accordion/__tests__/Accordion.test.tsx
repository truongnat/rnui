import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Text } from 'react-native';
import { Accordion, AccordionDetails, AccordionSummary } from '..';

test('Accordion renders and expands on press', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Accordion>
        <AccordionSummary>Details</AccordionSummary>
        <AccordionDetails>
          <Text>Expanded Content</Text>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
  fireEvent.press(getByText('Details'));
  expect(getByText('Expanded Content')).toBeTruthy();
});
