import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface FieldGroupProps {
  label: string;
  children: React.ReactNode;
}

export function FieldGroup({label, children}: FieldGroupProps) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {borderBottomColor: colors.line}]}>
      <Text style={[styles.label, {color: colors.inkMute}]}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 28,
    paddingBottom: 4,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.18 * 10,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
});
