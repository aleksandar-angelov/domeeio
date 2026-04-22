import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TOKENS, FONTS } from '../constants/tokens';

type ChipTone = 'neutral' | 'primary' | 'sage' | 'amber' | 'sky' | 'rose' | 'danger' | 'success' | 'warn';
type ChipSize = 'sm' | 'xs';

const TONES: Record<ChipTone, { bg: string; color: string }> = {
  neutral: { bg: '#f0e9dc', color: TOKENS.inkSoft },
  primary: { bg: TOKENS.primarySoft, color: TOKENS.primaryInk },
  sage: { bg: TOKENS.sageSoft, color: TOKENS.sageInk },
  amber: { bg: TOKENS.amberSoft, color: '#7a5420' },
  sky: { bg: TOKENS.skySoft, color: '#3e5668' },
  rose: { bg: TOKENS.roseSoft, color: '#823a48' },
  danger: { bg: TOKENS.dangerSoft, color: '#7a2e1e' },
  success: { bg: TOKENS.successSoft, color: '#355028' },
  warn: { bg: TOKENS.warnSoft, color: '#6e4a10' },
};

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  size?: ChipSize;
}

export const Chip: React.FC<ChipProps> = ({ children, tone = 'neutral', size = 'sm' }) => {
  const t = TONES[tone];
  const isXs = size === 'xs';

  return (
    <View style={[styles.base, { backgroundColor: t.bg }, isXs ? styles.xs : styles.sm]}>
      <Text style={[styles.text, { color: t.color }, isXs ? styles.textXs : styles.textSm]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sm: { paddingHorizontal: 10, paddingVertical: 4 },
  xs: { paddingHorizontal: 8, paddingVertical: 2 },
  text: {
    fontFamily: FONTS.semiBold,
  },
  textSm: { fontSize: 12 },
  textXs: { fontSize: 11 },
});
