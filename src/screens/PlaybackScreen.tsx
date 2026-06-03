import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useAudioPlayer} from '@/hooks/useAudioPlayer';
import {formatTime} from '@/utils/format';
import {TopBar} from '@/components/primitives/TopBar';
import {TapIcon} from '@/components/primitives/TapIcon';
import {TabPill} from '@/components/primitives/TabPill';
import {PlaybackWave} from '@/components/audio/PlaybackWave';
import {I} from '@/components/icons';
import Svg, {Path} from 'react-native-svg';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = NativeStackScreenProps<RootStackParamList, 'Playback'>['route'];

export function PlaybackScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const note = route.params.note;

  const {isPlaying, positionMs, durationMs, progressPercent, play, pause, seekRelative} =
    useAudioPlayer(note.audioUri);

  const durStr = `${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}`;
  const posStr = formatTime(Math.floor(positionMs / 1000));
  const remainStr = formatTime(Math.max(0, note.duration - Math.floor(positionMs / 1000)));

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <TapIcon onPress={() => navigation.navigate('Home')} label="Back">
            <I.Back size={22} color={colors.ink} />
          </TapIcon>
        }
        right={
          <TapIcon onPress={() => navigation.navigate('Edit', {note})} label="More">
            <I.More size={20} color={colors.ink} />
          </TapIcon>
        }
        sub={`${note.dateShort.replace('.', '\u00B7')}  \u00B7  ${note.folderId}`}
      />

      <View style={styles.titleBlock}>
        <Text
          style={[
            styles.noteTitle,
            {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
          ]}>
          {note.title}
        </Text>
        <Text
          style={[
            styles.noteMeta,
            {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
          ]}>
          {durStr}  \u00B7  {note.dateLabel.toLowerCase()}
        </Text>
      </View>

      <View style={styles.waveContainer}>
        <PlaybackWave progressPercent={progressPercent} />
      </View>

      <View style={styles.timeRow}>
        <Text
          style={[
            styles.timeLabel,
            {color: colors.ink, fontFamily: fonts.mono + '-Regular'},
          ]}>
          {posStr}
        </Text>
        <Text
          style={[
            styles.timeLabel,
            {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
          ]}>
          \u2212{remainStr}
        </Text>
      </View>

      <View style={styles.tabs}>
        <TabPill active label="audio" />
        <TabPill
          label="transcript"
          onPress={() => navigation.replace('Transcript', {note})}
        />
        <TabPill
          label="summary"
          onPress={() => navigation.replace('Summary', {note})}
        />
      </View>

      <View style={[styles.controls, {paddingBottom: insets.bottom + 16}]}>
        <TapIcon onPress={() => seekRelative(-15000)} label="Back 15 seconds">
          <View style={styles.seekContainer}>
            <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
              <Path
                d="M16 6V2L9 7l7 5V8a8 8 0 11-8 8"
                stroke={colors.inkSoft}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text
              style={[
                styles.seekLabel,
                {color: colors.inkSoft, fontFamily: fonts.mono + '-Regular'},
              ]}>
              15
            </Text>
          </View>
        </TapIcon>

        <Pressable
          onPress={isPlaying ? pause : play}
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          style={[styles.playBtn, {backgroundColor: colors.ink}]}>
          {isPlaying ? (
            <I.Pause size={22} color={colors.paper} />
          ) : (
            <I.Play size={22} color={colors.paper} />
          )}
        </Pressable>

        <TapIcon onPress={() => seekRelative(15000)} label="Forward 15 seconds">
          <View style={styles.seekContainer}>
            <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
              <Path
                d="M16 6V2l7 5-7 5V8a8 8 0 108 8"
                stroke={colors.inkSoft}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text
              style={[
                styles.seekLabel,
                {color: colors.inkSoft, fontFamily: fonts.mono + '-Regular'},
              ]}>
              15
            </Text>
          </View>
        </TapIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBlock: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 32,
  },
  noteTitle: {
    fontSize: 30,
    lineHeight: 30 * 1.22,
    fontWeight: '400',
    letterSpacing: -0.015 * 30,
  },
  noteMeta: {
    fontSize: 11,
    marginTop: 14,
  },
  waveContainer: {
    paddingVertical: 32,
  },
  timeRow: {
    paddingHorizontal: 28,
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 12,
  },
  tabs: {
    marginTop: 'auto',
    paddingHorizontal: 28,
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 22,
  },
  controls: {
    paddingHorizontal: 28,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seekContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  seekLabel: {
    position: 'absolute',
    fontSize: 9,
    marginTop: 4,
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1612',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.16,
    shadowRadius: 32,
    elevation: 12,
  },
});
