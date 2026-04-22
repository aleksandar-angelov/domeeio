import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TOKENS, FONTS } from '../constants/tokens';
import { BackIcon } from './Icon';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';

interface BackHeaderProps {
  onBack?: () => void;
  title?: string;
}

export const BackHeader: React.FC<BackHeaderProps> = ({ onBack, title }) => {
  const navigation = useNavigation();
  const { lang } = useApp();
  const t = T[lang];
  const handleBack = onBack || (() => navigation.goBack());

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backBtn} activeOpacity={0.7}>
        <BackIcon color={TOKENS.primary} size={22} />
        <Text style={styles.backText}>{t.back}</Text>
      </TouchableOpacity>
      {title ? <Text style={styles.titleText}>{title}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 14,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  backText: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: TOKENS.primary,
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 12,
    fontSize: 13,
    color: TOKENS.inkMuted,
    fontFamily: 'monospace',
  },
});
