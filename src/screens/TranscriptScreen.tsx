import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import type {TranscriptSegment} from '@/state/types';
import {useTheme} from '@/theme/ThemeProvider';
import {useTTS} from '@/hooks/useTTS';
import {TopBar} from '@/components/primitives/TopBar';
import {TapIcon} from '@/components/primitives/TapIcon';
import {TabPill} from '@/components/primitives/TabPill';
import {TranscriptLine} from '@/components/notes/TranscriptLine';
import {MiniPlayer} from '@/components/audio/MiniPlayer';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = NativeStackScreenProps<RootStackParamList, 'Transcript'>['route'];

const SAMPLE_SEGMENTS: TranscriptSegment[] = [
  {startMs: 0, endMs: 8000, text: 'A long river ran beside us for most of the morning.'},
  {startMs: 8000, endMs: 21000, text: 'I noticed I was talking out loud, not for anyone in particular, just to hear myself notice things.'},
  {startMs: 21000, endMs: 38000, text: "There was a woman across the aisle. She was reading a letter on paper \u2014 the kind of paper that doesn't fold flat after you've folded it once."},
  {startMs: 38000, endMs: 62000, text: "I thought about that for a long time. About how a thing changes shape after you have used it. How you can't unfold it back into newness."},
  {startMs: 62000, endMs: 78000, text: 'Three crows on a wire. I think it was three. The train moved before I could count.'},
  {startMs: 78000, endMs: 106000, text: 'The river kept up with us through the third town. Then it bent away and I felt, for a half-second, abandoned. Which is silly. It is a river.'},
  {startMs: 106000, endMs: 134000, text: "I want to remember the color of the woman's letter. A very pale, very soft yellow. Like the inside of an egg before it has decided to become anything."},
  {startMs: 134000, endMs: 154000, text: "Note to self \u2014 see if Mariko still has her grandmother's old letterpress. The yellow paper. Ask kindly."},
  {startMs: 154000, endMs: 180000, text: 'The light kept changing. I want to learn to talk less and watch more.'},
];

export function TranscriptScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const {speak, stop, isSpeaking} = useTTS();
  const note = route.params.note;

  const segments = note.transcript ?? SAMPLE_SEGMENTS;
  const [activeIdx, setActiveIdx] = useState(0);

  const durStr = `${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % segments.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [segments.length]);

  const handleSegmentPress = useCallback(
    (index: number) => {
      setActiveIdx(index);
      if (isSpeaking) {
        stop();
      }
      speak(segments[index].text);
    },
    [segments, speak, stop, isSpeaking],
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <TapIcon onPress={() => navigation.navigate('Playback', {note})} label="Back">
            <I.Back size={22} color={colors.ink} />
          </TapIcon>
        }
        right={
          <TapIcon onPress={() => navigation.navigate('Share', {note})} label="Share">
            <I.Share size={18} color={colors.ink} />
          </TapIcon>
        }
        title="transcript"
        sub={durStr}
      />

      <View style={styles.tabs}>
        <TabPill
          label="audio"
          onPress={() => navigation.replace('Playback', {note})}
        />
        <TabPill active label="transcript" />
        <TabPill
          label="summary"
          onPress={() => navigation.replace('Summary', {note})}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingTop: 24, paddingBottom: 80}}>
        {segments.map((seg, i) => (
          <TranscriptLine
            key={i}
            startMs={seg.startMs}
            text={seg.text}
            active={i === activeIdx}
            onPress={() => handleSegmentPress(i)}
          />
        ))}

        <Text
          style={[
            styles.endMark,
            {color: colors.inkFaint},
          ]}>
          {'\u2014'}
        </Text>
      </ScrollView>

      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    paddingTop: 4,
    paddingHorizontal: 28,
    flexDirection: 'row',
    gap: 22,
  },
  scroll: {
    flex: 1,
  },
  endMark: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
  },
});
