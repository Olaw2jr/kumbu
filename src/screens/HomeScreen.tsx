import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useNotes} from '@/state/NotesContext';
import {TapIcon} from '@/components/primitives/TapIcon';
import {SectionLabel} from '@/components/primitives/SectionLabel';
import {RecordFAB} from '@/components/primitives/RecordFAB';
import {NoteRow} from '@/components/notes/NoteRow';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const {colors, fonts} = useTheme();
  const {notes} = useNotes();
  const insets = useSafeAreaInsets();

  const isEmpty = notes.length === 0;
  const recent = notes.filter(
    n => n.dateLabel === 'Yesterday' || n.dateLabel.includes('day'),
  );
  const earlier = notes.filter(
    n => !(n.dateLabel === 'Yesterday' || n.dateLabel.includes('day')),
  );

  const totalMin = notes.reduce((acc, n) => acc + Math.floor(n.duration / 60), 0);

  return (
    <View style={[styles.container, {backgroundColor: colors.paper}]}>
      <View style={{paddingTop: insets.top}}>
        <View style={styles.header}>
          <TapIcon onPress={() => navigation.navigate('Folders')} label="Folders">
            <I.Folder size={20} color={colors.ink} />
          </TapIcon>
          <Text
            style={[
              styles.title,
              {color: colors.ink, fontFamily: fonts.serif + '-Medium'},
            ]}>
            kumbu
          </Text>
          <TapIcon onPress={() => navigation.navigate('Search')} label="Search">
            <I.Search size={20} color={colors.ink} />
          </TapIcon>
        </View>

        <View style={styles.dateLine}>
          <View>
            <Text
              style={[
                styles.dateTitle,
                {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
              ]}>
              {isEmpty ? 'A quiet beginning.' : 'June, two thousand twenty-six'}
            </Text>
            <Text
              style={[
                styles.countLine,
                {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
              ]}>
              {isEmpty
                ? '00 notes'
                : `${String(notes.length).padStart(2, '0')} notes  \u00B7  ${totalMin} min`}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{paddingBottom: 140}}>
        {isEmpty && <EmptyState />}

        {recent.length > 0 && (
          <>
            <SectionLabel>recent</SectionLabel>
            {recent.map((n, i) => (
              <NoteRow
                key={n.id}
                note={n}
                isFirst={i === 0}
                onPress={() => navigation.navigate('Playback', {note: n})}
              />
            ))}
          </>
        )}

        {earlier.length > 0 && (
          <>
            <View style={{height: 32}} />
            <SectionLabel>earlier</SectionLabel>
            {earlier.map((n, i) => (
              <NoteRow
                key={n.id}
                note={n}
                isFirst={i === 0}
                onPress={() => navigation.navigate('Playback', {note: n})}
              />
            ))}
          </>
        )}
      </ScrollView>

      <RecordFAB onPress={() => navigation.navigate('Recording')} />
    </View>
  );
}

function EmptyState() {
  const {colors, fonts} = useTheme();

  return (
    <View style={styles.empty}>
      <View style={[styles.breatheDot, {backgroundColor: colors.ink}]} />
      <Text
        style={[
          styles.emptyTitle,
          {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
        ]}>
        {'Nothing yet.\nThat is also something.'}
      </Text>
      <Text style={[styles.emptyHint, {color: colors.inkMute}]}>
        tap the dot below to begin.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: -0.01 * 22,
    textAlign: 'center',
  },
  dateLine: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 18,
  },
  dateTitle: {
    fontSize: 32,
    lineHeight: 32 * 1.1,
    fontWeight: '400',
  },
  countLine: {
    fontSize: 11,
    marginTop: 8,
  },
  scroll: {
    flex: 1,
  },
  empty: {
    paddingTop: 80,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  breatheDot: {
    width: 12,
    height: 12,
    borderRadius: 9999,
    marginBottom: 32,
  },
  emptyTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: 13,
    marginTop: 12,
  },
});
