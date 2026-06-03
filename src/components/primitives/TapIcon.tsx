import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

interface TapIconProps {
  children: React.ReactNode;
  onPress?: () => void;
  label: string;
  color?: string;
}

export function TapIcon({children, onPress, label, color}: TapIconProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
      style={({pressed}) => [
        styles.container,
        color ? {borderColor: color} : undefined,
        pressed && styles.pressed,
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  pressed: {
    opacity: 0.6,
  },
});
