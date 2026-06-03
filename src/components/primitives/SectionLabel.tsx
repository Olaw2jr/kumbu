import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface SectionLabelProps {
  children: string;
}

export function SectionLabel({children}: SectionLabelProps) {
  const {colors} = useTheme();

  return (
    <Text style={[styles.label, {color: colors.inkMute}]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    fontSize: 11,
    letterSpacing: 0.15 * 11,
    textTransform: 'uppercase',
  },
});
