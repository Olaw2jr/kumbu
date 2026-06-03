import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface FormatCardProps {
  active?: boolean;
  onPress?: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
}

export function FormatCard({active, onPress, icon, label, sub}: FormatCardProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{selected: active}}
      style={[
        styles.container,
        {
          borderWidth: active ? 1.5 : 1,
          borderColor: active ? colors.ink : colors.line,
          backgroundColor: colors.paper,
        },
      ]}>
      <View style={{opacity: active ? 1 : 0.6}}>{icon}</View>
      <View>
        <Text style={[styles.label, {color: colors.ink}]}>{label}</Text>
        <Text
          style={[
            styles.sub,
            {color: colors.inkMute, fontFamily: 'JetBrainsMono-Regular'},
          ]}>
          {sub}
        </Text>
      </View>
      {active && (
        <View style={[styles.dot, {backgroundColor: colors.hanko}]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 14,
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  sub: {
    fontSize: 10,
    marginTop: 2,
  },
  dot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 9999,
  },
});
