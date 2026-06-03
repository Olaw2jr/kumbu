import React, {useState, useCallback, useRef} from 'react';
import {View, ScrollView, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useNotes} from '@/state/NotesContext';
import {TapIcon} from '@/components/primitives/TapIcon';
import {SectionLabel} from '@/components/primitives/SectionLabel';
import {NoteRow} from '@/components/notes/NoteRow';
import {BrowseRow} from '@/components/notes/BrowseRow';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const {notes, searchNotes} = useNotes();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'mariko',
    'manifesto',
    'crows',
  ]);

  const hits = query ? searchNotes(query) : [];

  const handleRecentPress = useCallback(
    (term: string) => {
      setQuery(term);
    },
    [],
  );

  const handleRemoveRecent = useCallback(
    (term: string) => {
      setRecentSearches(prev => prev.filter(r => r !== term));
    },
    [],
  );

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  const folderCount = new Set(notes.map(n => n.folderId)).size;
  const tagCount = new Set(notes.flatMap(n => n.tags)).size;
  const thisMonthCount = notes.filter(n => {
    const d = new Date(n.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      {/* Search header */}
      <View style={styles.searchHeader}>
        <TapIcon onPress={() => navigation.navigate('Home')} label="Back">
          <I.Back size={22} color={colors.ink} />
        </TapIcon>

        <View style={[styles.searchField, {backgroundColor: colors.paperDeep}]}>
          <I.Search size={16} color={colors.inkMute} style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            autoFocus
            placeholder="search notes, transcripts, tags\u2026"
            placeholderTextColor={colors.inkMute}
            style={[
              styles.searchInput,
              {color: colors.ink, fontFamily: fonts.sans + '-Regular'},
            ]}
            accessibilityLabel="Search notes"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable
              onPress={handleClear}
              accessibilityLabel="Clear search"
              style={styles.clearButton}>
              <I.Close size={14} color={colors.inkMute} />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: 40}}
        keyboardShouldPersistTaps="handled">
        {/* Idle state: no query */}
        {!query && (
          <>
            <SectionLabel>recent searches</SectionLabel>
            {recentSearches.map((term, i) => (
              <Pressable
                key={term}
                onPress={() => handleRecentPress(term)}
                accessibilityLabel={`Search for ${term}`}
                style={({pressed}) => [
                  styles.recentRow,
                  {
                    borderBottomColor: colors.line,
                    borderTopColor: colors.line,
                    borderTopWidth: i === 0 ? 1 : 0,
                  },
                  pressed && styles.pressed,
                ]}>
                <I.Search size={14} color={colors.inkFaint} />
                <Text style={[styles.recentLabel, {color: colors.ink}]}>
                  {term}
                </Text>
                <Pressable
                  onPress={() => handleRemoveRecent(term)}
                  accessibilityLabel={`Remove ${term} from recent searches`}
                  hitSlop={8}
                  style={styles.recentRemove}>
                  <I.Close size={14} color={colors.inkMute} />
                </Pressable>
              </Pressable>
            ))}

            <View style={styles.browseGap} />
            <SectionLabel>browse</SectionLabel>
            <BrowseRow
              label="all notes"
              count={notes.length}
              onPress={() => navigation.navigate('Home')}
            />
            <BrowseRow
              label="folders"
              count={folderCount}
              onPress={() => navigation.navigate('Folders')}
            />
            <BrowseRow label="tags" count={tagCount} />
            <BrowseRow label="this month" count={thisMonthCount} />
          </>
        )}

        {/* Active state with results */}
        {query.length > 0 && hits.length > 0 && (
          <>
            <SectionLabel>
              {`${hits.length} result${hits.length === 1 ? '' : 's'}`}
            </SectionLabel>
            {hits.map((n, i) => (
              <NoteRow
                key={n.id}
                note={n}
                isFirst={i === 0}
                onPress={() => navigation.navigate('Playback', {note: n})}
              />
            ))}
          </>
        )}

        {/* Empty state */}
        {query.length > 0 && hits.length === 0 && (
          <View style={styles.emptyState}>
            <Text
              style={[
                styles.emptyTitle,
                {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
              ]}>
              {'No notes match\n'}
              <Text style={styles.emptyQuery}>
                {'\u201C'}{query}{'\u201D'}
              </Text>
            </Text>
            <Text style={[styles.emptyHint, {color: colors.inkMute}]}>
              Try a different word, or speak it.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    paddingHorizontal: 14,
    position: 'relative',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },
  clearButton: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  recentLabel: {
    fontSize: 15,
    flex: 1,
  },
  recentRemove: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseGap: {
    height: 28,
  },
  emptyState: {
    paddingTop: 80,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.45,
    textAlign: 'center',
  },
  emptyQuery: {
    fontStyle: 'italic',
  },
  emptyHint: {
    fontSize: 13,
    marginTop: 14,
  },
});
