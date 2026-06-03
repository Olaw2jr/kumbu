import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface MetaCellProps {
  label: string;
  value: string;
}

export function MetaCell({label, value}: MetaCellProps) {
  const {colors, fonts} = useTheme();

  return (
    <View>
      <Text style={[styles.label, {color: colors.inkMute}]}>{label}</Text>
      <Text
        style={[
          styles.value,
          {color: colors.ink, fontFamily: fonts.mono + '-Regular'},
        ]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.1 * 10,
  },
  value: {
    fontSize: 13,
    marginTop: 2,
  },
});
