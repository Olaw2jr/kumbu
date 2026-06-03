import React from 'react';
import {Text} from 'react-native';
import {render, act} from '@testing-library/react-native';
import {ThemeProvider, useTheme} from './ThemeProvider';

function TestConsumer() {
  const {colors, isDark, theme, typeScaleFactor, aaaContrast} = useTheme();
  return (
    <>
      <Text testID="paper">{colors.paper}</Text>
      <Text testID="ink">{colors.ink}</Text>
      <Text testID="inkSoft">{colors.inkSoft}</Text>
      <Text testID="isDark">{String(isDark)}</Text>
      <Text testID="theme">{theme}</Text>
      <Text testID="scale">{String(typeScaleFactor)}</Text>
      <Text testID="aaa">{String(aaaContrast)}</Text>
    </>
  );
}

describe('ThemeProvider', () => {
  it('provides paper palette by default', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('paper').props.children).toBe('#FAFAF6');
    expect(getByTestId('ink').props.children).toBe('#1A1612');
    expect(getByTestId('isDark').props.children).toBe('false');
    expect(getByTestId('theme').props.children).toBe('paper');
  });

  it('provides night palette when initialTheme is night', () => {
    const {getByTestId} = render(
      <ThemeProvider initialTheme="night">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('paper').props.children).toBe('#14120F');
    expect(getByTestId('ink').props.children).toBe('#F2EEE4');
    expect(getByTestId('isDark').props.children).toBe('true');
  });

  it('applies AAA contrast remapping', () => {
    const {getByTestId} = render(
      <ThemeProvider initialAaaContrast={true}>
        <TestConsumer />
      </ThemeProvider>,
    );
    // AAA maps inkSoft -> ink value
    expect(getByTestId('inkSoft').props.children).toBe('#1A1612');
  });

  it('applies type scale factor', () => {
    const {getByTestId} = render(
      <ThemeProvider initialTypeScale="large">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('scale').props.children).toBe('1.12');
  });

  it('applies small type scale factor', () => {
    const {getByTestId} = render(
      <ThemeProvider initialTypeScale="small">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('scale').props.children).toBe('0.92');
  });

  it('throws when useTheme is used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => render(<TestConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider',
    );
    spy.mockRestore();
  });
});
