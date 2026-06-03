import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface TopBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  sub?: string;
  dense?: boolean;
}

export function TopBar({left, right, title, sub, dense}: TopBarProps) {
  const {colors, fonts} = useTheme();

  return (
    <View style={[styles.container, dense && styles.dense]}>
      <View style={styles.side}>{left}</View>
      <View style={styles.center}>
        {title ? (
          <Text
            style={[
              styles.title,
              {color: colors.ink, fontFamily: fonts.sans + '-Medium'},
            ]}>
            {title}
          </Text>
        ) : null}
        {sub ? (
          <Text
            style={[
              styles.sub,
              {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
            ]}>
            {sub}
          </Text>
        ) : null}
      </View>
      <View style={[styles.side, styles.sideRight]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 44,
  },
  dense: {
    paddingVertical: 8,
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.005 * 14,
  },
  sub: {
    fontSize: 11,
    marginTop: 1,
  },
});
