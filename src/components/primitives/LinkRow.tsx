import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {I} from '@/components/icons';

interface LinkRowProps {
  icon?: React.ReactNode;
  label: string;
  right?: string;
  onPress?: () => void;
}

export function LinkRow({icon, label, right, onPress}: LinkRowProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({pressed}) => [
        styles.container,
        {borderTopColor: colors.line},
        pressed && styles.pressed,
      ]}>
      {icon && <View style={{marginRight: 14}}>{icon}</View>}
      <Text style={[styles.label, {color: colors.ink}]}>{label}</Text>
      {right && (
        <Text
          style={[
            styles.right,
            {color: colors.inkMute, fontFamily: 'JetBrainsMono-Regular'},
          ]}>
          {right}
        </Text>
      )}
      <I.Chevron size={14} color={colors.inkMute} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    minHeight: 44,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
    flex: 1,
  },
  right: {
    fontSize: 12,
    marginRight: 8,
  },
});
