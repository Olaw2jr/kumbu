import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import type {SummaryBlock} from '@/state/types';
import {useTheme} from '@/theme/ThemeProvider';
import {TopBar} from '@/components/primitives/TopBar';
import {TapIcon} from '@/components/primitives/TapIcon';
import {TabPill} from '@/components/primitives/TabPill';
import {Hanko} from '@/components/primitives/Hanko';
import {MdBlock} from '@/components/notes/MdBlock';
import {I} from '@/components/icons';
import Share from 'react-native-share';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = NativeStackScreenProps<RootStackParamList, 'Summary'>['route'];

const SUMMARY_BLOCKS: SummaryBlock[] = [
  {type: 'h1', text: 'On the train, the river'},
  {type: 'meta', text: '02 June 2026 \u00B7 03:24 \u00B7 daily'},
  {type: 'h2', text: 'Summary'},
  {
    type: 'p',
    text: 'A short, drifting observation written on the morning train. The voice tracks a river running alongside the train and a woman across the aisle reading a yellow letter \u2014 using both as ways into a reflection on how things change shape with use.',
  },
  {type: 'h2', text: 'Key thoughts'},
  {
    type: 'ul',
    items: [
      "A thing changes shape after you use it. You can't unfold it back into newness.",
      'Three crows on a wire \u2014 felt important to count, train moved before I could.',
      "The river's departure produced a brief, irrational feeling of being abandoned.",
      'The pale yellow of the letter \u2014 \u201Cthe inside of an egg before it has decided to become anything.\u201D',
    ],
  },
  {type: 'h2', text: 'Action items'},
  {
    type: 'todo',
    items: [
      "Ask Mariko about her grandmother's letterpress.",
      'Find that pale yellow paper.',
    ],
  },
  {type: 'quote', text: 'I want to learn to talk less and watch more.'},
  {type: 'h2', text: 'Tags'},
  {type: 'tags', items: ['travel', 'observation', 'daily', 'mariko']},
];

const STREAM_INTERVAL_MS = 280;

export function SummaryScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const note = route.params.note;

  const blocks = note.summary ?? SUMMARY_BLOCKS;
  const [revealed, setRevealed] = useState(blocks.length);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!streaming) {
      return;
    }
    setRevealed(0);
    const interval = setInterval(() => {
      setRevealed(prev => {
        if (prev >= blocks.length) {
          setStreaming(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, STREAM_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [streaming, blocks.length]);

  const handleRegenerate = useCallback(() => {
    setStreaming(true);
  }, []);

  const buildMarkdown = useCallback(() => {
    return blocks
      .map(b => {
        switch (b.type) {
          case 'h1':
            return `# ${b.text}`;
          case 'h2':
            return `## ${b.text}`;
          case 'meta':
            return b.text;
          case 'p':
            return b.text;
          case 'ul':
            return b.items?.map(item => `- ${item}`).join('\n');
          case 'todo':
            return b.items?.map(item => `- [ ] ${item}`).join('\n');
          case 'quote':
            return `> ${b.text}`;
          case 'tags':
            return b.items?.map(tag => `#${tag}`).join(' ');
          default:
            return '';
        }
      })
      .filter(Boolean)
      .join('\n\n');
  }, [blocks]);

  const handleCopyMarkdown = useCallback(async () => {
    const md = buildMarkdown();
    try {
      await Share.open({
        message: md,
        title: note.title,
        type: 'text/markdown',
      });
    } catch {
      // User cancelled share
    }
  }, [buildMarkdown, note.title]);

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <TapIcon onPress={() => navigation.navigate('Playback', {note})} label="Back">
            <I.Back size={22} color={colors.ink} />
          </TapIcon>
        }
        right={
          <View style={styles.topBarRight}>
            <TapIcon onPress={handleRegenerate} label="Regenerate">
              <I.Sparkle size={18} color={colors.hanko} />
            </TapIcon>
            <TapIcon onPress={() => navigation.navigate('Share', {note})} label="Share">
              <I.Share size={18} color={colors.ink} />
            </TapIcon>
          </View>
        }
        title="summary"
        sub="markdown \u00B7 auto"
      />

      <View style={styles.tabs}>
        <TabPill
          label="audio"
          onPress={() => navigation.replace('Playback', {note})}
        />
        <TabPill
          label="transcript"
          onPress={() => navigation.replace('Transcript', {note})}
        />
        <TabPill active label="summary" />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}>
        {blocks.slice(0, revealed).map((block, i) => (
          <MdBlock key={i} block={block} />
        ))}

        {revealed >= blocks.length && (
          <View style={[styles.footer, {borderTopColor: colors.line}]}>
            <Hanko size={14} label="\u25CF" backgroundColor={colors.inkMute} />
            <Text
              style={[
                styles.footerText,
                {color: colors.inkMute},
              ]}>
              shaped by kumbu, 2 minutes ago
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomBar, {paddingBottom: insets.bottom + 24}]}>
        <Pressable
          onPress={handleCopyMarkdown}
          accessibilityLabel="Copy as markdown"
          style={[styles.copyButton, {backgroundColor: colors.ink}]}>
          <I.Md size={16} color={colors.paper} />
          <Text
            style={[
              styles.copyButtonText,
              {color: colors.paper},
            ]}>
            copy as markdown
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarRight: {
    flexDirection: 'row',
    gap: 4,
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
  scrollContent: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 120,
  },
  footer: {
    marginTop: 32,
    paddingTop: 18,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 11,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
  },
  copyButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1A1612',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 8,
  },
  copyButtonText: {
    fontSize: 14,
  },
});
