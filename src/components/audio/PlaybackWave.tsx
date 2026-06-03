import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface PlaybackWaveProps {
  progressPercent: number;
}

export function PlaybackWave({progressPercent}: PlaybackWaveProps) {
  const {colors} = useTheme();

  const bars = useMemo(() => {
    const result: number[] = [];
    for (let i = 0; i < 80; i++) {
      const x = i / 80;
      const env = Math.sin(x * Math.PI) * 0.8 + 0.2;
      const h =
        4 +
        env *
          (28 +
            Math.sin(i * 0.7) * 18 +
            Math.sin(i * 1.3 + 0.4) * 10);
      result.push(Math.max(2, Math.abs(h)));
    }
    return result;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bars}>
        {bars.map((h, i) => {
          const passed = (i / bars.length) * 100 < progressPercent;
          return (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: h,
                  backgroundColor: passed ? colors.ink : colors.inkFaint,
                },
              ]}
            />
          );
        })}
      </View>
      <View
        style={[
          styles.playhead,
          {
            left: `${progressPercent}%` as any,
            backgroundColor: colors.hanko,
          },
        ]}>
        <View style={[styles.playheadDot, {backgroundColor: colors.hanko}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 28,
    position: 'relative',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: '100%',
    justifyContent: 'space-between',
  },
  bar: {
    width: 2,
    borderRadius: 2,
  },
  playhead: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: 1.5,
  },
  playheadDot: {
    position: 'absolute',
    top: -4,
    left: -3,
    width: 7,
    height: 7,
    borderRadius: 9999,
  },
});
