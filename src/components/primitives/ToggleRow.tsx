import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

export function ToggleRow({label, value, onToggle}: ToggleRowProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={() => onToggle(!value)}
      accessibilityRole="switch"
      accessibilityState={{checked: value}}
      style={[styles.container, {borderTopColor: colors.line}]}>
      <Text style={[styles.label, {color: colors.ink}]}>{label}</Text>
      <View
        style={[
          styles.track,
          {backgroundColor: value ? colors.ink : colors.line},
        ]}>
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: colors.paper,
              left: value ? 18 : 2,
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    minHeight: 44,
  },
  label: {
    fontSize: 15,
  },
  track: {
    width: 36,
    height: 20,
    borderRadius: 9999,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    top: 2,
    width: 16,
    height: 16,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});
