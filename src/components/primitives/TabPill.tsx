import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface TabPillProps {
  active?: boolean;
  label: string;
  onPress?: () => void;
}

export function TabPill({active, label, onPress}: TabPillProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{selected: active}}
      style={[
        styles.container,
        {
          borderBottomColor: active ? colors.ink : 'transparent',
        },
      ]}>
      <Text
        style={[
          styles.label,
          {color: active ? colors.ink : colors.inkMute},
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    borderBottomWidth: 1.5,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    letterSpacing: 0.02 * 13,
  },
});
