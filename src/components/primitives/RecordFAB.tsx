import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface RecordFABProps {
  onPress: () => void;
}

export function RecordFAB({onPress}: RecordFABProps) {
  const {colors} = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        accessibilityLabel="Begin recording"
        accessibilityRole="button"
        style={({pressed}) => [
          styles.button,
          {backgroundColor: colors.ink},
          pressed && styles.pressed,
        ]}>
        <View style={[styles.dot, {backgroundColor: colors.hanko}]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1612',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 12,
  },
  pressed: {
    transform: [{scale: 0.95}],
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 9999,
  },
});
