import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/theme/ThemeProvider';
import {SummaryBlock} from '@/state/types';

interface MdBlockProps {
  block: SummaryBlock;
}

export function MdBlock({block}: MdBlockProps) {
  const {colors, fonts} = useTheme();

  switch (block.type) {
    case 'h1':
      return (
        <Text
          style={[
            styles.h1,
            {color: colors.ink, fontFamily: fonts.serif + '-Medium'},
          ]}>
          {block.text}
        </Text>
      );

    case 'meta':
      return (
        <Text
          style={[
            styles.meta,
            {color: colors.inkMute, fontFamily: fonts.mono + '-Regular'},
          ]}>
          {block.text}
        </Text>
      );

    case 'h2':
      return (
        <Text
          style={[
            styles.h2,
            {color: colors.inkMute, fontFamily: fonts.serif + '-Regular'},
          ]}>
          {block.text}
        </Text>
      );

    case 'p':
      return (
        <Text
          style={[
            styles.p,
            {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
          ]}>
          {block.text}
        </Text>
      );

    case 'ul':
      return (
        <View style={styles.ulContainer}>
          {block.items?.map((item, i) => (
            <View key={i} style={styles.ulItem}>
              <View
                style={[styles.ulDash, {backgroundColor: colors.inkMute}]}
              />
              <Text
                style={[
                  styles.ulText,
                  {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
                ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      );

    case 'todo':
      return (
        <View style={styles.todoContainer}>
          {block.items?.map((item, i) => (
            <View key={i} style={styles.todoItem}>
              <View
                style={[styles.checkbox, {borderColor: colors.inkMute}]}
              />
              <Text
                style={[
                  styles.todoText,
                  {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
                ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      );

    case 'quote':
      return (
        <View style={[styles.quoteContainer, {borderLeftColor: colors.hanko}]}>
          <Text
            style={[
              styles.quoteText,
              {color: colors.ink, fontFamily: fonts.serif + '-Regular'},
            ]}>
            {block.text}
          </Text>
        </View>
      );

    case 'tags':
      return (
        <View style={styles.tagsContainer}>
          {block.items?.map(tag => (
            <View
              key={tag}
              style={[styles.tag, {borderColor: colors.line}]}>
              <Text
                style={[
                  styles.tagText,
                  {
                    color: colors.inkSoft,
                    fontFamily: fonts.mono + '-Regular',
                  },
                ]}>
                #{tag}
              </Text>
            </View>
          ))}
        </View>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 26,
    lineHeight: 26 * 1.2,
    fontWeight: '500',
    marginBottom: 8,
  },
  meta: {
    fontSize: 11,
    marginBottom: 28,
  },
  h2: {
    fontSize: 13,
    letterSpacing: 0.18 * 13,
    textTransform: 'uppercase',
    marginTop: 28,
    marginBottom: 12,
  },
  p: {
    fontSize: 16,
    lineHeight: 16 * 1.65,
    marginBottom: 14,
  },
  ulContainer: {
    marginBottom: 8,
  },
  ulItem: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginBottom: 10,
    position: 'relative',
  },
  ulDash: {
    position: 'absolute',
    left: 0,
    top: 11,
    width: 8,
    height: 1,
  },
  ulText: {
    fontSize: 16,
    lineHeight: 16 * 1.55,
    flex: 1,
  },
  todoContainer: {
    marginBottom: 12,
  },
  todoItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 4,
  },
  todoText: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
    flex: 1,
  },
  quoteContainer: {
    marginVertical: 24,
    paddingVertical: 4,
    paddingLeft: 18,
    borderLeftWidth: 1.5,
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
  },
});
