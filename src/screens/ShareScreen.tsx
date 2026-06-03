import React, {useState, useMemo} from 'react';
import {View, ScrollView, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {TapIcon} from '@/components/primitives/TapIcon';
import {FormatCard} from '@/components/primitives/FormatCard';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = NativeStackScreenProps<RootStackParamList, 'Share'>['route'];

type ExportFormat = 'md' | 'txt' | 'audio' | 'pdf';

const FORMAT_LABELS: Record<ExportFormat, string> = {
  md: 'markdown',
  txt: 'plain text',
  audio: 'audio',
  pdf: 'pdf',
};

const DESTINATIONS = [
  {symbol: '\u8A18', label: 'Obsidian'},
  {symbol: '\u2731', label: 'Notion'},
  {symbol: '\u2197', label: 'AirDrop'},
  {symbol: '\u2709', label: 'Mail'},
  {symbol: '\u2318', label: 'Copy'},
  {symbol: '\u2601', label: 'iCloud'},
  {symbol: '\u2325', label: 'Files'},
  {symbol: '\u2026', label: 'More'},
];

export function ShareScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const note = route.params.note;

  const [format, setFormat] = useState<ExportFormat>('md');

  const slug = note.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const previews = useMemo<Record<ExportFormat, string>>(
    () => ({
      md: `# ${note.title}\n\n${note.dateShort} \u00B7 ${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}\n\n## Summary\nA short, drifting observation written on the morning train\u2026`,
      txt: `${note.title}\n${note.dateShort} \u00B7 ${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}\n\n${note.excerpt}`,
      audio: `\uD83C\uDF99  ${slug}.m4a\n     ${String(Math.floor(note.duration / 60)).padStart(2, '0')}:${String(note.duration % 60).padStart(2, '0')}  \u00B7  4.2 MB  \u00B7  256 kbps`,
      pdf: `${note.title}.pdf\n4 pages \u00B7 formatted document`,
    }),
    [note, slug],
  );

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Playback', {note});
    }
  };

  return (
    <View style={styles.overlay}>
      {/* Dimmed backdrop */}
      <Pressable
        style={styles.backdrop}
        onPress={handleClose}
        accessibilityLabel="Close share sheet"
      />

      {/* Bottom sheet */}
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.paper,
            paddingBottom: insets.bottom + 36,
          },
        ]}>
        {/* Grabber */}
        <View style={styles.grabberContainer}>
          <View style={[styles.grabber, {backgroundColor: colors.line}]} />
        </View>

        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text
                style={[
                  styles.headerTitle,
                  {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
                ]}>
                Share this note
              </Text>
              <Text
                style={[
                  styles.headerSlug,
                  {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
                ]}>
                {slug}
              </Text>
            </View>
            <TapIcon onPress={handleClose} label="Close">
              <I.Close size={20} color={colors.ink} />
            </TapIcon>
          </View>

          {/* Format chooser */}
          <View style={styles.formatGrid}>
            <View style={styles.formatCell}>
              <FormatCard
                active={format === 'md'}
                onPress={() => setFormat('md')}
                icon={<I.Md size={20} color={format === 'md' ? colors.ink : colors.inkSoft} />}
                label="Markdown"
                sub=".md \u00B7 for notes apps"
              />
            </View>
            <View style={styles.formatCell}>
              <FormatCard
                active={format === 'txt'}
                onPress={() => setFormat('txt')}
                icon={<I.Doc size={20} color={format === 'txt' ? colors.ink : colors.inkSoft} />}
                label="Plain text"
                sub=".txt \u00B7 transcript only"
              />
            </View>
            <View style={styles.formatCell}>
              <FormatCard
                active={format === 'audio'}
                onPress={() => setFormat('audio')}
                icon={<I.Mic size={20} color={format === 'audio' ? colors.ink : colors.inkSoft} />}
                label="Audio"
                sub=".m4a \u00B7 the recording"
              />
            </View>
            <View style={styles.formatCell}>
              <FormatCard
                active={format === 'pdf'}
                onPress={() => setFormat('pdf')}
                icon={<I.Doc size={20} color={format === 'pdf' ? colors.ink : colors.inkSoft} />}
                label="PDF"
                sub=".pdf \u00B7 formatted"
              />
            </View>
          </View>

          {/* Preview */}
          <View style={[styles.preview, {backgroundColor: colors.paperDeep}]}>
            <Text
              style={[
                styles.previewText,
                {color: colors.inkSoft, fontFamily: fonts.mono + '-Regular'},
              ]}
              numberOfLines={6}>
              {previews[format]}
            </Text>
            <View
              style={[
                styles.previewFade,
                {backgroundColor: colors.paperDeep},
              ]}
            />
          </View>

          {/* Destinations */}
          <View style={styles.destinationsSection}>
            <Text style={[styles.destinationsLabel, {color: colors.inkMute}]}>
              send to
            </Text>
            <View style={styles.destinationsGrid}>
              {DESTINATIONS.map((dest, i) => (
                <Pressable
                  key={i}
                  accessibilityLabel={dest.label}
                  style={({pressed}) => [
                    styles.destinationItem,
                    pressed && styles.pressed,
                  ]}>
                  <View
                    style={[
                      styles.destinationIcon,
                      {backgroundColor: colors.paperDeep},
                    ]}>
                    <Text
                      style={[
                        styles.destinationSymbol,
                        {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
                      ]}>
                      {dest.symbol}
                    </Text>
                  </View>
                  <Text style={[styles.destinationLabel, {color: colors.inkSoft}]}>
                    {dest.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Primary export button */}
          <Pressable
            onPress={() => {}}
            accessibilityLabel={`Export as ${FORMAT_LABELS[format]}`}
            style={[styles.exportButton, {backgroundColor: colors.ink}]}>
            <I.Down size={16} color={colors.paper} />
            <Text style={[styles.exportButtonText, {color: colors.paper}]}>
              export as {FORMAT_LABELS[format]}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 18, 15, 0.42)',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#1A1612',
    shadowOffset: {width: 0, height: -20},
    shadowOpacity: 0.25,
    shadowRadius: 60,
    elevation: 20,
  },
  grabberContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 9999,
  },
  sheetContent: {
    paddingBottom: 0,
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
  },
  headerSlug: {
    fontSize: 11,
    marginTop: 4,
  },
  formatGrid: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  formatCell: {
    width: '48%',
  },
  preview: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 12,
    maxHeight: 120,
    overflow: 'hidden',
    position: 'relative',
  },
  previewText: {
    fontSize: 11,
    lineHeight: 11 * 1.6,
  },
  previewFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    opacity: 0.9,
  },
  destinationsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  destinationsLabel: {
    fontSize: 10,
    letterSpacing: 0.18 * 10,
    textTransform: 'uppercase',
    marginBottom: 12,
    paddingLeft: 8,
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  destinationItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  pressed: {
    opacity: 0.6,
  },
  destinationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationSymbol: {
    fontSize: 18,
  },
  destinationLabel: {
    fontSize: 10,
  },
  exportButton: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exportButtonText: {
    fontSize: 14,
  },
});
