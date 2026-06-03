import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {useTheme} from '@/theme/ThemeProvider';

interface InkRippleProps {
  active: boolean;
}

function RippleCircle({
  delay,
  active,
  color,
}: {
  delay: number;
  active: boolean;
  color: string;
}) {
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (active) {
      scale.value = withDelay(
        delay,
        withRepeat(
          withTiming(2.6, {duration: 3400, easing: Easing.bezier(0.22, 1, 0.36, 1)}),
          -1,
        ),
      );
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(0.55, {duration: 0}),
            withTiming(0, {duration: 3400, easing: Easing.bezier(0.22, 1, 0.36, 1)}),
          ),
          -1,
        ),
      );
    } else {
      scale.value = 0.6;
      opacity.value = 0;
    }
  }, [active, delay, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.ripple,
        {borderColor: color},
        animatedStyle,
      ]}
    />
  );
}

export function InkRipple({active}: InkRippleProps) {
  const {colors, reducedMotion} = useTheme();
  const showRipples = active && !reducedMotion;

  const breatheScale = useSharedValue(1);

  useEffect(() => {
    if (active && !reducedMotion) {
      breatheScale.value = withRepeat(
        withSequence(
          withTiming(1.18, {duration: 1300, easing: Easing.inOut(Easing.ease)}),
          withTiming(1, {duration: 1300, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
      );
    } else {
      breatheScale.value = 1;
    }
  }, [active, reducedMotion, breatheScale]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{scale: breatheScale.value}],
  }));

  return (
    <View style={styles.container}>
      {showRipples &&
        [0, 1, 2].map(i => (
          <RippleCircle
            key={i}
            delay={i * 1130}
            active={showRipples}
            color={colors.ink}
          />
        ))}
      <Animated.View style={[styles.dot, {backgroundColor: colors.ink}, dotStyle]}>
        <View style={[styles.center, {backgroundColor: colors.hanko}]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 9999,
    borderWidth: 1,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  center: {
    width: 6,
    height: 6,
    borderRadius: 9999,
  },
});
