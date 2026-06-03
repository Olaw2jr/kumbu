import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import type {Folder} from '@/state/types';
import {useTheme} from '@/theme/ThemeProvider';
import {TopBar} from '@/components/primitives/TopBar';
import {TapIcon} from '@/components/primitives/TapIcon';
import {FolderRow} from '@/components/notes/FolderRow';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const FOLDERS: Folder[] = [
  {id: 'all', name: 'all notes', kanji: '\u5168', noteCount: 7},
  {id: 'daily', name: 'daily', kanji: '\u65E5', noteCount: 3},
  {id: 'people', name: 'people', kanji: '\u4EBA', noteCount: 1},
  {id: 'field', name: 'field', kanji: '\u91CE', noteCount: 1},
  {id: 'work', name: 'work', kanji: '\u4ED5', noteCount: 1},
  {id: 'reading', name: 'reading', kanji: '\u8AAD', noteCount: 1},
];

export function FoldersScreen() {
  const navigation = useNavigation<Nav>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <TapIcon onPress={() => navigation.navigate('Home')} label="Back">
            <I.Back size={22} color={colors.ink} />
          </TapIcon>
        }
        right={
          <TapIcon onPress={() => {}} label="New folder">
            <I.Plus size={20} color={colors.ink} />
          </TapIcon>
        }
        title="folders"
      />

      <View style={styles.heading}>
        <Text
          style={[
            styles.headingText,
            {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
          ]}>
          A place for everything.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: 40}}>
        {FOLDERS.map((folder, i) => (
          <FolderRow
            key={folder.id}
            folder={folder}
            isFirst={i === 0}
            onPress={() => navigation.navigate('Home')}
          />
        ))}

        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              {color: colors.inkMute},
            ]}>
            {'Folders are quiet containers.\nkumbu won\u2019t sort for you unless you ask.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headingText: {
    fontSize: 30,
    lineHeight: 30 * 1.1,
    fontWeight: '400',
  },
  scroll: {
    flex: 1,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    lineHeight: 12 * 1.6,
    textAlign: 'center',
  },
});
