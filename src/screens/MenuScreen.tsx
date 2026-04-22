import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Avatar } from '../components/Avatar';
import { BackHeader } from '../components/BackHeader';
import { CasesIcon, BellIcon, GlobeIcon, GavelIcon, MoreIcon } from '../components/Icon';
import { RootStackParamList } from '../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MenuScreen() {
  const navigation = useNavigation<Nav>();
  const { lang, toggleLang } = useApp();
  const t = T[lang];
  const { RESIDENTS } = DATA;
  const me = RESIDENTS.find(r => r.id === 'me')!;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader />

      {/* Profile card */}
      <View style={styles.profileWrap}>
        <LinearGradient colors={[TOKENS.bgSubtle, TOKENS.primarySoft]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.profileCard}>
          <View style={styles.avatarBorder}>
            <Avatar user={me} size={64} />
          </View>
          <Text style={styles.profileName}>{lang === 'mk' ? me.name : me.en}</Text>
          <Text style={styles.profileInfo}>{t.unit} {me.unit} · {t.floor} {me.floor} · {t.buildingName}</Text>
        </LinearGradient>
      </View>

      {/* Main menu group */}
      <View style={styles.menuGroup}>
        <MenuRow icon={<CasesIcon color={TOKENS.primary} size={18} />} label={t.directory} onPress={() => navigation.navigate('Directory')} />
        <MenuRow icon={<BellIcon color={TOKENS.amber} size={18} />} label={lang === 'mk' ? 'Известувања' : 'Notifications'} />
        <MenuRow icon={<GlobeIcon color={TOKENS.sage} size={18} />} label={lang === 'mk' ? 'Јазик' : 'Language'} rightLabel={lang === 'mk' ? 'Македонски' : 'English'} onPress={toggleLang} isLast />
      </View>

      {/* Secondary group */}
      <View style={[styles.menuGroup, { marginTop: 14 }]}>
        <MenuRow icon={<GavelIcon color={TOKENS.sky} size={18} />} label={lang === 'mk' ? 'Правилник' : 'House rules'} />
        <MenuRow icon={<MoreIcon color={TOKENS.inkSoft} size={18} />} label={lang === 'mk' ? 'Поддршка' : 'Support'} isLast />
      </View>

      <Text style={styles.version}>Domeeio · v0.1 Pilot</Text>
    </ScrollView>
  );
}

function MenuRow({ icon, label, rightLabel, onPress, isLast }: { icon: React.ReactNode; label: string; rightLabel?: string; onPress?: () => void; isLast?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.menuRow, !isLast && styles.menuRowBorder]}>
      <View style={styles.menuRowIcon}>{icon}</View>
      <Text style={styles.menuRowLabel}>{label}</Text>
      {rightLabel && <Text style={styles.menuRowRight}>{rightLabel}</Text>}
      <Text style={styles.menuRowChevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 40 },
  profileWrap: { paddingHorizontal: 20 },
  profileCard: { padding: 20, borderRadius: 20, alignItems: 'center' },
  avatarBorder: { padding: 3, borderRadius: 36, backgroundColor: 'white', marginBottom: 10 },
  profileName: { fontSize: 18, fontFamily: FONTS.bold, color: TOKENS.ink },
  profileInfo: { fontSize: 13, color: TOKENS.inkSoft, fontFamily: FONTS.regular, marginTop: 3, textAlign: 'center' },
  menuGroup: { marginHorizontal: 20, marginTop: 20, backgroundColor: TOKENS.bgElevated, borderRadius: 16, borderWidth: 1, borderColor: TOKENS.border, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, paddingHorizontal: 16 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: TOKENS.border },
  menuRowIcon: { width: 28, alignItems: 'center' },
  menuRowLabel: { flex: 1, fontSize: 15, fontFamily: FONTS.medium, color: TOKENS.ink },
  menuRowRight: { fontSize: 13, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
  menuRowChevron: { fontSize: 18, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
  version: { textAlign: 'center', marginTop: 24, fontSize: 11, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
});
