import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface HairlineProps {
  inset?: number;
  color?: string;
  opacity?: number;
}

export function Hairline({inset = 20, color, opacity = 1}: HairlineProps) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: color || colors.line,
        marginLeft: inset,
        marginRight: inset,
        opacity,
      }}
    />
  );
}
