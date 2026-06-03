import React, {useCallback} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useSettings} from '@/state/SettingsContext';
import {TopBar} from '@/components/primitives/TopBar';
import {TapIcon} from '@/components/primitives/TapIcon';
import {ToggleRow} from '@/components/primitives/ToggleRow';
import {ChoiceRow} from '@/components/primitives/ChoiceRow';
import {LinkRow} from '@/components/primitives/LinkRow';
import {I} from '@/components/icons';
import type {ThemeMode, TypeScale} from '@/theme/tokens';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function SettingsGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const {colors} = useTheme();
  return (
    <View style={styles.group}>
      <Text style={[styles.groupLabel, {color: colors.inkMute}]}>{label}</Text>
      <View>{children}</View>
    </View>
  );
}

export function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  const {colors, fonts, theme, typeScale, aaaContrast, reducedMotion, setTheme, setTypeScale, setAaaContrast, setReducedMotion} = useTheme();
  const {settings, updateSetting} = useSettings();
  const insets = useSafeAreaInsets();

  const handleThemeChange = useCallback(
    (value: string) => {
      const mode = value as ThemeMode;
      setTheme(mode);
      updateSetting('theme', mode);
    },
    [setTheme, updateSetting],
  );

  const handleTypeScaleChange = useCallback(
    (value: string) => {
      const scale = value as TypeScale;
      setTypeScale(scale);
      updateSetting('typeScale', scale);
    },
    [setTypeScale, updateSetting],
  );

  const handleAaaToggle = useCallback(
    (value: boolean) => {
      setAaaContrast(value);
      updateSetting('aaaContrast', value);
    },
    [setAaaContrast, updateSetting],
  );

  const handleReducedMotionToggle = useCallback(
    (value: boolean) => {
      setReducedMotion(value);
      updateSetting('reducedMotion', value);
    },
    [setReducedMotion, updateSetting],
  );

  const languageMap: Record<string, string> = {
    english: 'english',
    ja: '\u65E5\u672C\u8A9E',
    auto: 'auto',
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <TopBar
        left={
          <TapIcon onPress={() => navigation.navigate('Home')} label="Back">
            <I.Back size={22} color={colors.ink} />
          </TapIcon>
        }
        title="settings"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: 60}}>
        {/* User profile */}
        <View style={styles.profile}>
          <View style={[styles.avatar, {backgroundColor: colors.paperDeep}]}>
            <Text
              style={[
                styles.avatarText,
                {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
              ]}>
              {'\u3042'}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.userName,
                {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
              ]}>
              Aiko Tanaka
            </Text>
            <Text
              style={[
                styles.userEmail,
                {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
              ]}>
              aiko@kumbu.app
            </Text>
          </View>
        </View>

        {/* Appearance */}
        <SettingsGroup label="appearance">
          <ChoiceRow
            label="theme"
            value={theme}
            options={['paper', 'night']}
            onChange={handleThemeChange}
          />
          <ChoiceRow
            label="type scale"
            value={typeScale}
            options={['small', 'regular', 'large']}
            onChange={handleTypeScaleChange}
          />
          <ToggleRow
            label="AAA contrast"
            value={aaaContrast}
            onToggle={handleAaaToggle}
          />
          <ToggleRow
            label="reduce motion"
            value={reducedMotion}
            onToggle={handleReducedMotionToggle}
          />
        </SettingsGroup>

        {/* Transcription */}
        <SettingsGroup label="transcription">
          <ChoiceRow
            label="language"
            value={languageMap[settings.language] || settings.language}
            options={['english', '\u65E5\u672C\u8A9E', 'auto']}
            onChange={(v: string) => {
              const key = v === '\u65E5\u672C\u8A9E' ? 'ja' : v === 'auto' ? 'auto' : 'english';
              updateSetting('language', key as 'english' | 'ja' | 'auto');
            }}
          />
          <ToggleRow
            label="auto-transcribe"
            value={settings.autoTranscribe}
            onToggle={v => updateSetting('autoTranscribe', v)}
          />
          <ToggleRow
            label="speaker detection"
            value={settings.speakerDetection}
            onToggle={v => updateSetting('speakerDetection', v)}
          />
        </SettingsGroup>

        {/* AI shaping */}
        <SettingsGroup label="ai shaping">
          <ChoiceRow
            label="summary length"
            value={settings.summaryLength}
            options={['terse', 'brief', 'detailed']}
            onChange={v => updateSetting('summaryLength', v as 'terse' | 'brief' | 'detailed')}
          />
          <ToggleRow
            label="auto title"
            value={settings.autoTitle}
            onToggle={v => updateSetting('autoTitle', v)}
          />
          <ToggleRow
            label="auto tags"
            value={settings.autoTags}
            onToggle={v => updateSetting('autoTags', v)}
          />
        </SettingsGroup>

        {/* Privacy */}
        <SettingsGroup label="privacy">
          <LinkRow
            icon={<I.Lock size={18} color={colors.inkSoft} />}
            label="end-to-end encryption"
            right="on"
          />
          <LinkRow
            icon={<I.Cloud size={18} color={colors.inkSoft} />}
            label="iCloud sync"
            right="on"
          />
          <LinkRow
            icon={<I.Trash size={18} color={colors.inkSoft} />}
            label="auto-delete after 30 days"
            right="off"
          />
        </SettingsGroup>

        {/* About */}
        <SettingsGroup label="about">
          <LinkRow label="version" right="1.0.0" />
          <LinkRow label="open source notices" />
          <LinkRow label="contact" />
        </SettingsGroup>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerTitle,
              {color: colors.inkMute, fontFamily: fonts.serif + '-Regular'},
            ]}>
            kumbu {'\u2014'} {'\u8A18\u61B6'}
          </Text>
          <Text style={[styles.footerSub, {color: colors.inkMute}]}>
            memory, kept softly.
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
  scroll: {
    flex: 1,
  },
  profile: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  userName: {
    fontSize: 18,
  },
  userEmail: {
    fontSize: 11,
    marginTop: 2,
  },
  group: {
    marginBottom: 4,
  },
  groupLabel: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 8,
    fontSize: 10,
    letterSpacing: 0.18 * 10,
    textTransform: 'uppercase',
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 13,
    lineHeight: 13 * 1.6,
    textAlign: 'center',
  },
  footerSub: {
    fontSize: 11,
    textAlign: 'center',
  },
});
