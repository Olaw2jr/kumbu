import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {formatTime} from '@/utils/format';

interface TranscriptLineProps {
  startMs: number;
  text: string;
  active?: boolean;
  onPress: () => void;
}

export function TranscriptLine({startMs, text, active, onPress}: TranscriptLineProps) {
  const {colors, fonts} = useTheme();
  const timeStr = formatTime(Math.floor(startMs / 1000));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[
        styles.container,
        {backgroundColor: active ? colors.paperDeep : 'transparent'},
      ]}>
      <Text
        style={[
          styles.time,
          {
            color: active ? colors.hanko : colors.inkFaint,
            fontFamily: fonts.mono + '-Regular',
          },
        ]}>
        {timeStr}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: active ? colors.ink : colors.inkSoft,
            fontFamily: fonts.serif + '-Regular',
          },
        ]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 28,
    minHeight: 44,
  },
  time: {
    fontSize: 10,
    paddingTop: 8,
    width: 38,
  },
  text: {
    fontSize: 17,
    lineHeight: 17 * 1.55,
    flex: 1,
    fontWeight: '400',
  },
});
