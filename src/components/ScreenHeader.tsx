import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TOKENS, FONTS } from '../constants/tokens';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  skipTopInset?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle, skipTopInset }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: (skipTopInset ? 0 : insets.top) + 8 }]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: TOKENS.ink,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: TOKENS.inkSoft,
    marginTop: 2,
  },
});
