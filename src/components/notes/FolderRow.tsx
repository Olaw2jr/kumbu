import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {I} from '@/components/icons';
import {Folder} from '@/state/types';

interface FolderRowProps {
  folder: Folder;
  onPress: () => void;
  isFirst?: boolean;
}

export function FolderRow({folder, onPress, isFirst}: FolderRowProps) {
  const {colors, fonts} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={folder.name}
      style={({pressed}) => [
        styles.container,
        {
          borderBottomColor: colors.line,
          borderTopColor: colors.line,
          borderTopWidth: isFirst ? 1 : 0,
        },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.kanji, {borderColor: colors.line}]}>
        <Text
          style={[
            styles.kanjiText,
            {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
          ]}>
          {folder.kanji}
        </Text>
      </View>

      <View style={styles.body}>
        <Text
          style={[
            styles.name,
            {color: colors.ink, fontFamily: fonts.serif + '-Medium'},
          ]}>
          {folder.name}
        </Text>
        <Text
          style={[
            styles.count,
            {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
          ]}>
          {String(folder.noteCount).padStart(2, '0')}{' '}
          {folder.noteCount === 1 ? 'note' : 'notes'}
        </Text>
      </View>

      <I.Chevron size={16} color={colors.inkMute} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  kanji: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  kanjiText: {
    fontSize: 22,
    fontWeight: '400',
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
  },
  count: {
    fontSize: 11,
    marginTop: 2,
  },
});
