import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TOKENS, FONTS } from '../constants/tokens';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action, onAction }) => (
  <View style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    {action && (
      <TouchableOpacity onPress={onAction}>
        <Text style={styles.action}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    color: TOKENS.ink,
    letterSpacing: -0.2,
  },
  action: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: TOKENS.primary,
  },
});
