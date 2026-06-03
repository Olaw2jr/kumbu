import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface BrowseRowProps {
  label: string;
  count: number;
  onPress?: () => void;
}

export function BrowseRow({label, count, onPress}: BrowseRowProps) {
  const {colors, fonts} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({pressed}) => [
        styles.container,
        {borderBottomColor: colors.line},
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, {color: colors.ink}]}>{label}</Text>
      <Text
        style={[
          styles.count,
          {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
        ]}>
        {String(count).padStart(2, '0')}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    minHeight: 44,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
  },
  count: {
    fontSize: 12,
  },
});
