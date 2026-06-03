import React, {useState, useCallback} from 'react';
import {View, ScrollView, Text, TextInput, Pressable, Alert, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useNotes} from '@/state/NotesContext';
import {TopBar} from '@/components/primitives/TopBar';
import {FieldGroup} from '@/components/primitives/FieldGroup';
import {MetaCell} from '@/components/primitives/MetaCell';
import {ActionRow} from '@/components/primitives/ActionRow';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = NativeStackScreenProps<RootStackParamList, 'Edit'>['route'];

const SUGGESTED_TAGS = ['mariko', 'train', 'morning'];

export function EditScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const {updateNote, deleteNote} = useNotes();
  const note = route.params.note;

  const [title, setTitle] = useState(note.title);
  const [folder, setFolder] = useState(note.folderId);
  const [tags, setTags] = useState<string[]>(
    note.tags.length > 0 ? note.tags : ['travel', 'observation', 'daily'],
  );

  const durStr = `${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}`;
  const dateObj = new Date(note.createdAt);
  const dateStr = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const availableSuggestions = SUGGESTED_TAGS.filter(t => !tags.includes(t));

  const handleSave = useCallback(() => {
    updateNote(note.id, {title, folderId: folder, tags});
    navigation.navigate('Playback', {note: {...note, title, folderId: folder, tags}});
  }, [navigation, updateNote, note, title, folder, tags]);

  const handleCancel = useCallback(() => {
    navigation.navigate('Playback', {note});
  }, [navigation, note]);

  const handleRemoveTag = useCallback(
    (tag: string) => {
      setTags(prev => prev.filter(t => t !== tag));
    },
    [],
  );

  const handleAddTag = useCallback(
    (tag: string) => {
      setTags(prev => [...prev, tag]);
    },
    [],
  );

  const handleDuplicate = useCallback(() => {
    // Duplicate logic would be handled by the notes context
  }, []);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete note',
      'This cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNote(note.id);
            navigation.navigate('Home');
          },
        },
      ],
    );
  }, [deleteNote, note.id, navigation]);

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <Pressable
            onPress={handleCancel}
            accessibilityLabel="Cancel"
            accessibilityRole="button">
            <Text style={[styles.topBarAction, {color: colors.inkSoft}]}>
              cancel
            </Text>
          </Pressable>
        }
        right={
          <Pressable
            onPress={handleSave}
            accessibilityLabel="Save"
            accessibilityRole="button">
            <Text
              style={[
                styles.topBarAction,
                {color: colors.hanko, fontWeight: '500'},
              ]}>
              save
            </Text>
          </Pressable>
        }
        title="edit note"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: 40}}
        keyboardShouldPersistTaps="handled">
        {/* Title field */}
        <FieldGroup label="title">
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[
              styles.titleInput,
              {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
            ]}
            placeholderTextColor={colors.inkFaint}
            placeholder="Note title"
            accessibilityLabel="Note title"
          />
        </FieldGroup>

        {/* Folder picker */}
        <FieldGroup label="folder">
          <Pressable
            onPress={() => navigation.navigate('Folders')}
            accessibilityLabel="Choose folder"
            accessibilityRole="button"
            style={styles.folderButton}>
            <Text style={[styles.folderLabel, {color: colors.ink}]}>
              {folder}
            </Text>
            <I.Chevron size={16} color={colors.inkMute} />
          </Pressable>
        </FieldGroup>

        {/* Tags */}
        <FieldGroup label="tags">
          <View style={styles.tagsRow}>
            {tags.map(tag => (
              <View
                key={tag}
                style={[styles.tag, {backgroundColor: colors.paperDeep}]}>
                <Text
                  style={[
                    styles.tagLabel,
                    {color: colors.ink, fontFamily: fonts.mono + '-Regular'},
                  ]}>
                  #{tag}
                </Text>
                <Pressable
                  onPress={() => handleRemoveTag(tag)}
                  accessibilityLabel={`Remove tag ${tag}`}
                  style={styles.tagRemove}>
                  <I.Close size={12} color={colors.inkMute} />
                </Pressable>
              </View>
            ))}
            <Pressable
              onPress={() => {}}
              accessibilityLabel="Add tag"
              style={[styles.addTag, {borderColor: colors.line}]}>
              <Text
                style={[
                  styles.addTagLabel,
                  {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
                ]}>
                + add
              </Text>
            </Pressable>
          </View>

          {/* Suggested tags */}
          {availableSuggestions.length > 0 && (
            <View style={styles.suggestedSection}>
              <Text
                style={[
                  styles.suggestedLabel,
                  {color: colors.inkMute},
                ]}>
                suggested by kumbu
              </Text>
              <View style={styles.suggestedRow}>
                {availableSuggestions.map(tag => (
                  <Pressable
                    key={tag}
                    onPress={() => handleAddTag(tag)}
                    accessibilityLabel={`Add suggested tag ${tag}`}
                    style={[styles.suggestedTag, {borderColor: colors.line}]}>
                    <Text
                      style={[
                        styles.suggestedTagLabel,
                        {color: colors.inkSoft, fontFamily: fonts.mono + '-Regular'},
                      ]}>
                      + #{tag}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </FieldGroup>

        {/* Meta read-only */}
        <FieldGroup label="captured">
          <View style={styles.metaGrid}>
            <View style={styles.metaGridCell}>
              <MetaCell label="date" value={dateStr} />
            </View>
            <View style={styles.metaGridCell}>
              <MetaCell label="time" value={timeStr} />
            </View>
            <View style={styles.metaGridCell}>
              <MetaCell label="length" value={durStr} />
            </View>
            <View style={styles.metaGridCell}>
              <MetaCell label="device" value="iPhone" />
            </View>
          </View>
        </FieldGroup>

        {/* Actions */}
        <View style={styles.actions}>
          <ActionRow
            icon={<I.Copy size={18} color={colors.ink} />}
            label="duplicate"
            onPress={handleDuplicate}
          />
          <ActionRow
            icon={<I.Share size={18} color={colors.ink} />}
            label="share & export"
            onPress={() => navigation.navigate('Share', {note})}
          />
          <ActionRow
            icon={<I.Trash size={18} color={colors.hanko} />}
            label="delete"
            labelColor={colors.hanko}
            onPress={handleDelete}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarAction: {
    fontSize: 14,
  },
  scroll: {
    flex: 1,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '400',
    paddingVertical: 8,
  },
  folderButton: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
  },
  folderLabel: {
    fontSize: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingTop: 12,
    paddingBottom: 4,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 10,
    borderRadius: 9999,
  },
  tagLabel: {
    fontSize: 12,
  },
  tagRemove: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addTagLabel: {
    fontSize: 12,
  },
  suggestedSection: {
    marginTop: 12,
  },
  suggestedLabel: {
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    marginBottom: 6,
  },
  suggestedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  suggestedTag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  suggestedTagLabel: {
    fontSize: 12,
  },
  metaGrid: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaGridCell: {
    width: '47%',
  },
  actions: {
    paddingTop: 32,
    paddingHorizontal: 28,
    paddingBottom: 24,
    gap: 4,
  },
});
