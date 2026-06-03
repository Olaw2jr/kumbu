import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface HankoProps {
  size?: number;
  label?: string;
  style?: ViewStyle;
  backgroundColor?: string;
}

export function Hanko({
  size = 22,
  label = '\u8A18',
  style,
  backgroundColor,
}: HankoProps) {
  const {colors, fonts} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: backgroundColor || colors.hanko,
          borderRadius: 3,
        },
        style,
      ]}>
      <Text
        style={[
          styles.label,
          {
            fontSize: size * 0.55,
            fontFamily: fonts.serif + '-Medium',
            color: '#FAFAF6',
          },
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '500',
    letterSpacing: 0,
  },
});
