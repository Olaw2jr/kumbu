import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {I} from '@/components/icons';

interface MiniPlayerProps {
  timeLabel?: string;
  progressPercent?: number;
  onPlay?: () => void;
  onPause?: () => void;
}

export function MiniPlayer({
  timeLabel = '01:18',
  progressPercent = 38,
  onPlay,
  onPause,
}: MiniPlayerProps) {
  const {colors, fonts} = useTheme();
  const [playing, setPlaying] = useState(false);

  const handlePress = () => {
    if (playing) {
      onPause?.();
    } else {
      onPlay?.();
    }
    setPlaying(!playing);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.paper,
          borderColor: colors.line,
        },
      ]}>
      <Pressable
        onPress={handlePress}
        accessibilityLabel={playing ? 'Pause' : 'Play'}
        accessibilityRole="button"
        style={[styles.playBtn, {backgroundColor: colors.ink}]}>
        {playing ? (
          <I.Pause size={14} color={colors.paper} />
        ) : (
          <I.Play size={14} color={colors.paper} />
        )}
      </Pressable>

      <View style={[styles.track, {backgroundColor: colors.line}]}>
        <View
          style={[
            styles.trackFill,
            {
              width: `${progressPercent}%` as any,
              backgroundColor: colors.ink,
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.time,
          {color: colors.inkSoft, fontFamily: fonts.mono + '-Regular'},
        ]}>
        {timeLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 9999,
    shadowColor: '#1A1612',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 4,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    flex: 1,
    height: 2,
    borderRadius: 9999,
    position: 'relative',
    overflow: 'hidden',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 9999,
  },
  time: {
    fontSize: 11,
  },
});
