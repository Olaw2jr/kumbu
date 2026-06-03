import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {Note} from '@/state/types';

interface NoteRowProps {
  note: Note;
  onPress: () => void;
  isFirst?: boolean;
}

export function NoteRow({note, onPress, isFirst}: NoteRowProps) {
  const {colors, fonts} = useTheme();

  const durStr = `${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}`;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={note.title}
      style={({pressed}) => [
        styles.container,
        {
          borderBottomColor: colors.line,
          borderTopColor: colors.line,
          borderTopWidth: isFirst ? 1 : 0,
        },
        pressed && styles.pressed,
      ]}>
      <Text
        style={[
          styles.date,
          {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
        ]}>
        {note.dateShort}
      </Text>

      <View style={styles.body}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {color: colors.ink, fontFamily: fonts.serif + '-Medium'},
          ]}>
          {note.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.excerpt, {color: colors.inkSoft}]}>
          {note.excerpt}
        </Text>
      </View>

      <View style={styles.meta}>
        <Text
          style={[
            styles.duration,
            {color: colors.inkSoft, fontFamily: fonts.mono + '-Regular'},
          ]}>
          {durStr}
        </Text>
        {note.isUnread && (
          <View
            style={[styles.unreadDot, {backgroundColor: colors.hanko}]}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  date: {
    width: 36,
    fontSize: 10,
    paddingTop: 4,
    letterSpacing: 0,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 17 * 1.25,
    marginBottom: 6,
  },
  excerpt: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  meta: {
    alignItems: 'flex-end',
    gap: 6,
    paddingTop: 4,
  },
  duration: {
    fontSize: 11,
  },
  unreadDot: {
    width: 5,
    height: 5,
    borderRadius: 9999,
  },
});
