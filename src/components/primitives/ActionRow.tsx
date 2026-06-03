import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {I} from '@/components/icons';

interface ActionRowProps {
  icon: React.ReactNode;
  label: string;
  labelColor?: string;
  onPress?: () => void;
}

export function ActionRow({icon, label, labelColor, onPress}: ActionRowProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({pressed}) => [
        styles.container,
        {borderBottomColor: colors.line},
        pressed && styles.pressed,
      ]}>
      {icon}
      <Text
        style={[
          styles.label,
          {color: labelColor || colors.ink},
        ]}>
        {label}
      </Text>
      <I.Chevron size={14} color={colors.inkMute} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: 1,
    minHeight: 44,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
    flex: 1,
  },
});
