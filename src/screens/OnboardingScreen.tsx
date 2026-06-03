import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootStackParamList} from '@/app/Navigator';
import {useTheme} from '@/theme/ThemeProvider';
import {useOnboarding} from '@/hooks/useOnboarding';
import {Hanko} from '@/components/primitives/Hanko';
import {I} from '@/components/icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const STEPS = [
  {jp: '\u8A18', en: 'Capture', body: 'Voice notes exist to capture\nthoughts before they disappear.', sub: 'kumbu listens. that is all.'},
  {jp: '\u8074', en: 'Listen', body: 'Then read what you said,\nor a summary written for you.', sub: 'transcribed and shaped into markdown.'},
  {jp: '\u6B8B', en: 'Keep', body: 'Keep only what matters.\nThe rest, quietly, returns to silence.', sub: 'private by default. yours alone.'},
];

export function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  const {completeOnboarding} = useOnboarding();
  const {colors, fonts} = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const cur = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const finish = () => {
    completeOnboarding();
    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.paper, paddingTop: insets.top}]}>
      <View style={styles.topRow}>
        <View style={styles.dots}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: i === step ? 18 : 6,
                  backgroundColor: i === step ? colors.ink : colors.line,
                },
              ]}
            />
          ))}
        </View>
        <Pressable
          onPress={finish}
          accessibilityLabel="Skip onboarding"
          style={styles.skipBtn}>
          <Text style={[styles.skip, {color: colors.inkMute}]}>skip</Text>
        </Pressable>
      </View>

      <View style={styles.center}>
        <View style={styles.kanjiContainer}>
          <Text
            style={[
              styles.kanji,
              {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
            ]}>
            {cur.jp}
          </Text>
          {step === 0 && (
            <View style={styles.hankoPosition}>
              <Hanko size={20} label="\u25CF" />
            </View>
          )}
        </View>

        <Text
          style={[
            styles.body,
            {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
          ]}>
          {cur.body}
        </Text>

        <Text style={[styles.sub, {color: colors.inkMute}]}>{cur.sub}</Text>
      </View>

      <View style={[styles.bottom, {paddingBottom: insets.bottom + 24}]}>
        <Pressable
          onPress={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          accessibilityLabel="Go back"
          style={styles.backBtn}>
          <Text
            style={[
              styles.backText,
              {color: step === 0 ? 'transparent' : colors.inkMute},
            ]}>
            back
          </Text>
        </Pressable>

        <Pressable
          onPress={() => (isLast ? finish() : setStep(step + 1))}
          accessibilityLabel={isLast ? 'Begin using kumbu' : 'Continue'}
          style={[styles.continueBtn, {backgroundColor: colors.ink}]}>
          <Text style={[styles.continueText, {color: colors.paper}]}>
            {isLast ? 'begin' : 'continue'}
          </Text>
          <I.ArrowR size={16} color={colors.paper} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    paddingTop: 54,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    height: 2,
    borderRadius: 1,
  },
  skipBtn: {
    padding: 6,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: {
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  kanjiContainer: {
    marginBottom: 56,
    position: 'relative',
  },
  kanji: {
    fontSize: 96,
    lineHeight: 96,
    fontWeight: '400',
  },
  hankoPosition: {
    position: 'absolute',
    right: -14,
    bottom: 8,
  },
  body: {
    fontSize: 24,
    lineHeight: 24 * 1.45,
    textAlign: 'center',
    fontWeight: '400',
  },
  sub: {
    marginTop: 28,
    fontSize: 13,
    letterSpacing: 0.02 * 13,
    textAlign: 'center',
  },
  bottom: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 14,
  },
  continueBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 9999,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
