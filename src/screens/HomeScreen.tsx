import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, TabParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import {
  BellIcon, ClockIcon, WrenchIcon, PollsIcon, PdfIcon, PinIcon,
} from '../components/Icon';
import { TAB_BAR_HEIGHT } from '../navigation/TabNavigator';


type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { lang } = useApp();
  const t = T[lang];
  const insets = useSafeAreaInsets();
  const { ANNOUNCEMENTS, POLLS, EVENTS, RESIDENTS, CASES } = DATA;

  const hour = new Date().getHours();
  const greet = lang === 'mk'
    ? (hour < 11 ? 'Добро утро' : hour < 18 ? 'Добар ден' : 'Добра вечер')
    : (hour < 11 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');

  const me = RESIDENTS.find(r => r.id === 'me')!;
  const activePolls = POLLS.filter(p => !p.closed);
  const myOpenCases = CASES.filter(c => c.reporter === 'me' && c.status !== 'resolved');
  const nextEvent = EVENTS[0];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20 }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={[TOKENS.bgSubtle, TOKENS.bg]} style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.buildingName}>{t.buildingName}</Text>
            <Text style={styles.greeting}>{greet},</Text>
            <Text style={styles.greetingItalic}>{lang === 'mk' ? 'сосед' : 'neighbor'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <BellIcon color={TOKENS.ink} size={22} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconBtn} activeOpacity={0.7}>
              <Avatar user={me} size={32} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Stats strip */}
        <View style={styles.statsRow}>
          <StatTile label={lang === 'mk' ? 'Мои случаи' : 'My cases'} value={myOpenCases.length} tone="primary" onPress={() => navigation.navigate('Cases')} />
          <StatTile label={lang === 'mk' ? 'Гласања' : 'Polls'} value={activePolls.length} tone="sage" onPress={() => navigation.navigate('Polls')} />
          <StatTile label={lang === 'mk' ? 'Неплатени' : 'Unpaid'} value={1} tone="amber" onPress={() => navigation.navigate('Docs')} />
        </View>
      </LinearGradient>

      {/* Announcements */}
      <View style={styles.section}>
        <SectionHeader title={t.announcements} />
        <View style={styles.sectionContent}>
          {ANNOUNCEMENTS.map(a => {
            const author = RESIDENTS.find(r => r.id === a.author)!;
            return (
              <Card key={a.id} padding={14}>
                <View style={styles.announcementRow}>
                  <Avatar user={author} size={38} />
                  <View style={styles.announcementBody}>
                    <View style={styles.announcementMeta}>
                      <Text style={styles.authorName} numberOfLines={1}>{lang === 'mk' ? author.name : author.en}</Text>
                      {author.role === 'president' && <Chip tone="primary" size="xs">{t.president}</Chip>}
                      {a.pinned && <PinIcon color={TOKENS.amber} size={14} />}
                      <Text style={styles.timeText}>{a.time[lang]}</Text>
                    </View>
                    <Text style={styles.announcementTitle}>{a.title[lang]}</Text>
                    <Text style={styles.announcementText}>{a.body[lang]}</Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.section}>
        <SectionHeader title={t.quickActions} />
        <View style={styles.quickActionsGrid}>
          <QuickAction icon={<WrenchIcon color="#fff" size={20} />} label={t.reportIssue} bg={TOKENS.primary} onPress={() => navigation.navigate('NewCase')} />
          <QuickAction icon={<PollsIcon color="#fff" size={20} />} label={t.voteNow} bg={TOKENS.sage} count={activePolls.length} onPress={() => navigation.navigate('Polls')} />
          <QuickAction icon={<WrenchIcon color="#fff" size={20} />} label={lang === 'mk' ? 'Мајстор' : 'Craftsman'} bg={TOKENS.amber} onPress={() => navigation.navigate('Craftsmen')} />
          <QuickAction icon={<PdfIcon color="#fff" size={20} />} label={t.bills} bg={TOKENS.sky} onPress={() => navigation.navigate('Docs')} />
        </View>
      </View>

      {/* Next event */}
      <View style={styles.section}>
        <SectionHeader title={t.upcoming} action={t.seeAll} onAction={() => navigation.navigate('Calendar')} />
        <View style={styles.sectionContent}>
          <Card padding={0} onPress={() => navigation.navigate('Calendar')}>
            <View style={styles.eventCard}>
              <View style={[styles.eventDate, { backgroundColor: nextEvent.color }]}>
                <Text style={styles.eventDay}>{nextEvent.day}</Text>
                <Text style={styles.eventNum}>{nextEvent.date}</Text>
              </View>
              <View style={styles.eventBody}>
                <Chip tone="primary" size="xs">{lang === 'mk' ? 'Одржување' : 'Maintenance'}</Chip>
                <Text style={styles.eventTitle}>{nextEvent.title[lang]}</Text>
                <View style={styles.eventTime}>
                  <ClockIcon color={TOKENS.inkSoft} size={13} />
                  <Text style={styles.eventTimeText}>{nextEvent.time}</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

function StatTile({ label, value, tone, onPress }: { label: string; value: number; tone: string; onPress: () => void }) {
  const colorMap: Record<string, { bg: string; ink: string }> = {
    primary: { bg: TOKENS.primarySoft, ink: TOKENS.primaryInk },
    sage: { bg: TOKENS.sageSoft, ink: TOKENS.sageInk },
    amber: { bg: TOKENS.amberSoft, ink: '#6e4a10' },
  };
  const c = colorMap[tone];
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.statTile, { backgroundColor: c.bg }]}>
      <Text style={[styles.statValue, { color: c.ink }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: c.ink }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function QuickAction({ icon, label, bg, onPress, count }: { icon: React.ReactNode; label: string; bg: string; onPress: () => void; count?: number }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.quickAction}>
      <View style={[styles.quickActionIcon, { backgroundColor: bg }]}>
        {icon}
        {count != null && count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.quickActionLabel} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  buildingName: { fontSize: 13, fontFamily: FONTS.medium, color: TOKENS.inkSoft },
  greeting: { fontSize: 24, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.5, marginTop: 2 },
  greetingItalic: { fontSize: 24, fontFamily: FONTS.serifItalic, color: TOKENS.primary, letterSpacing: -0.3, marginTop: -2 },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, backgroundColor: TOKENS.danger, borderRadius: 4, borderWidth: 2, borderColor: TOKENS.bg },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  statTile: { flex: 1, borderRadius: 14, padding: 12 },
  statValue: { fontSize: 24, fontFamily: FONTS.bold, letterSpacing: -0.5, lineHeight: 28 },
  statLabel: { fontSize: 12, fontFamily: FONTS.medium, opacity: 0.75, marginTop: 4 },
  section: { marginTop: 20 },
  sectionContent: { paddingHorizontal: 20, gap: 10 },
  announcementRow: { flexDirection: 'row', gap: 12 },
  announcementBody: { flex: 1 },
  announcementMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'nowrap' },
  authorName: { fontSize: 13, fontFamily: FONTS.semiBold, color: TOKENS.ink, flexShrink: 1 },
  timeText: { fontSize: 11, color: TOKENS.inkMuted, marginLeft: 'auto' },
  announcementTitle: { fontSize: 15, fontFamily: FONTS.semiBold, color: TOKENS.ink, lineHeight: 20, marginTop: 4 },
  announcementText: { fontSize: 14, fontFamily: FONTS.regular, color: TOKENS.inkSoft, lineHeight: 20, marginTop: 4 },
  quickActionsGrid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickAction: { width: '48%', backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#2a241c', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  quickActionIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  quickActionLabel: { fontSize: 14, fontFamily: FONTS.semiBold, color: TOKENS.ink, lineHeight: 18, flex: 1 },
  badge: { position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, paddingHorizontal: 5, backgroundColor: TOKENS.ink, borderRadius: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: TOKENS.bgElevated },
  badgeText: { color: 'white', fontSize: 11, fontFamily: FONTS.bold },
  eventCard: { flexDirection: 'row', alignItems: 'stretch' },
  eventDate: { width: 76, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 18, borderBottomLeftRadius: 18, paddingVertical: 16 },
  eventDay: { fontSize: 11, fontFamily: FONTS.bold, color: 'white', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.85 },
  eventNum: { fontSize: 32, fontFamily: FONTS.bold, color: 'white', lineHeight: 38 },
  eventBody: { flex: 1, padding: 16, gap: 6 },
  eventTitle: { fontSize: 16, fontFamily: FONTS.semiBold, color: TOKENS.ink },
  eventTime: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eventTimeText: { fontSize: 13, color: TOKENS.inkSoft, fontFamily: FONTS.medium },
});
