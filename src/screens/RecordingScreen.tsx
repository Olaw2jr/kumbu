import React from 'react';
import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useAudioRecorder} from '@/hooks/useAudioRecorder';
import {usePermissions} from '@/hooks/usePermissions';
import {useNotes} from '@/state/NotesContext';
import {formatTimerMs} from '@/utils/format';
import {TopBar} from '@/components/primitives/TopBar';
import {TapIcon} from '@/components/primitives/TapIcon';
import {InkRipple} from '@/components/audio/InkRipple';
import {Waveline} from '@/components/audio/Waveline';
import {I} from '@/components/icons';
import {Note} from '@/state/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function RecordingScreen() {
  const navigation = useNavigation<Nav>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const {addNote} = useNotes();
  const {ensureMicrophone, microphone} = usePermissions();
  const {
    phase,
    elapsedMs,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    flagMoment,
  } = useAudioRecorder();

  const timer = formatTimerMs(elapsedMs);
  const isRecording = phase === 'recording';

  React.useEffect(() => {
    const init = async () => {
      const allowed = await ensureMicrophone();
      if (allowed) {
        startRecording();
      } else {
        Alert.alert(
          'Microphone Access Required',
          'kumbu needs microphone access to record voice notes. Please enable it in your device settings.',
          [
            {text: 'Go Back', onPress: () => navigation.goBack()},
          ],
        );
      }
    };
    init();
  }, [ensureMicrophone, startRecording, navigation]);

  const handleStop = async () => {
    const audioUri = await stopRecording();
    const durationSec = Math.round(elapsedMs / 1000);
    const now = new Date();
    const note: Note = {
      id: `n-${Date.now()}`,
      title: 'Untitled note',
      audioUri,
      duration: durationSec,
      createdAt: now.getTime(),
      dateLabel: 'Just now',
      dateShort: `${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`,
      folderId: 'daily',
      tags: [],
      isUnread: true,
      excerpt: '',
    };
    addNote(note);
    navigation.navigate('Playback', {note});
  };

  const handlePauseResume = () => {
    if (isRecording) {
      pauseRecording();
    } else {
      resumeRecording();
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <TapIcon onPress={() => navigation.goBack()} label="Close">
            <I.Chevron size={20} color={colors.ink} style={{transform: [{rotate: '180deg'}]}} />
          </TapIcon>
        }
        right={
          <TapIcon onPress={() => {}} label="More">
            <I.More size={20} color={colors.ink} />
          </TapIcon>
        }
        title="recording"
      />

      <View style={styles.center}>
        <InkRipple active={isRecording} />

        <View style={styles.timerBlock}>
          <Text
            style={[
              styles.timer,
              {color: colors.ink, fontFamily: fonts.mono + '-Light'},
            ]}>
            {timer.mm}:{timer.ss}
            <Text
              style={[styles.timerCs, {color: colors.inkMute}]}>
              .{timer.cs}
            </Text>
          </Text>
          <Text style={[styles.phaseLabel, {color: colors.inkMute}]}>
            {isRecording ? 'listening' : 'paused'}
          </Text>
        </View>

        <Waveline active={isRecording} />
      </View>

      <View style={[styles.controls, {paddingBottom: insets.bottom + 24}]}>
        <TapIcon onPress={flagMoment} label="Mark moment">
          <View style={[styles.circleBtn, {borderColor: colors.line}]}>
            <I.Flag size={18} color={colors.inkSoft} />
          </View>
        </TapIcon>

        <Pressable
          onPress={handleStop}
          accessibilityLabel="Stop"
          style={[styles.stopBtn, {backgroundColor: colors.ink}]}>
          <View style={[styles.stopSquare, {backgroundColor: colors.hanko}]} />
        </Pressable>

        <TapIcon onPress={handlePauseResume} label={isRecording ? 'Pause' : 'Resume'}>
          <View style={[styles.circleBtn, {borderColor: colors.line}]}>
            {isRecording ? (
              <I.Pause size={18} color={colors.inkSoft} />
            ) : (
              <I.Play size={18} color={colors.inkSoft} />
            )}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    gap: 56,
  },
  timerBlock: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 56,
    fontWeight: '300',
    letterSpacing: -0.04 * 56,
    lineHeight: 56,
  },
  timerCs: {
    fontSize: 28,
    marginLeft: 4,
  },
  phaseLabel: {
    marginTop: 14,
    fontSize: 12,
    letterSpacing: 0.15 * 12,
    textTransform: 'uppercase',
  },
  controls: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopBtn: {
    width: 84,
    height: 84,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1612',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.18,
    shadowRadius: 40,
    elevation: 16,
  },
  stopSquare: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});
