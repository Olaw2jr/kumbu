import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';

interface ChoiceRowProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function ChoiceRow({label, value, options, onChange}: ChoiceRowProps) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {borderTopColor: colors.line}]}>
      <Text style={[styles.label, {color: colors.ink}]}>{label}</Text>
      <View style={[styles.options, {backgroundColor: colors.paperDeep}]}>
        {options.map(o => (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            style={[
              styles.option,
              {
                backgroundColor: value === o ? colors.ink : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.optionText,
                {color: value === o ? colors.paper : colors.inkSoft},
              ]}>
              {o}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    gap: 16,
    minHeight: 44,
  },
  label: {
    fontSize: 15,
  },
  options: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 9999,
    gap: 0,
  },
  option: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    minWidth: 44,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 12,
  },
});
