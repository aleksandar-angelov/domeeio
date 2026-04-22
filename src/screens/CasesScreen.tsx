import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { BoltIcon, DropIcon, ElevatorIcon, WrenchIcon, PlusIcon } from '../components/Icon';
import { RootStackParamList } from '../types/navigation';
import { TAB_BAR_HEIGHT } from '../navigation/TabNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const catIcon: Record<string, React.ComponentType<{ color: string; size: number }>> = {
  electrical: BoltIcon, plumbing: DropIcon, elevator: ElevatorIcon, general: WrenchIcon,
};

const statusTone: Record<string, 'rose' | 'amber' | 'success'> = {
  open: 'rose', in_progress: 'amber', resolved: 'success',
};

export function CasesScreen() {
  const navigation = useNavigation<Nav>();
  const { lang } = useApp();
  const t = T[lang];
  const { CASES, RESIDENTS } = DATA;
  const [filter, setFilter] = useState<'all' | 'mine'>('all');

  const filtered = filter === 'mine' ? CASES.filter(c => c.reporter === 'me') : CASES;
  const statusLabel: Record<string, string> = { open: t.open, in_progress: t.inProgress, resolved: t.resolved };

  return (
    <View style={{ flex: 1, backgroundColor: TOKENS.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 20 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader title={t.tabs.cases} />

        {/* Filter tabs */}
        <View style={styles.filterRow}>
          {([['all', t.allCases], ['mine', t.yourCases]] as const).map(([id, label]) => (
            <TouchableOpacity
              key={id}
              onPress={() => setFilter(id)}
              activeOpacity={0.7}
              style={[styles.filterBtn, filter === id && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, filter === id && styles.filterTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cases list */}
        <View style={styles.list}>
          {filtered.map(c => {
            const rep = RESIDENTS.find(r => r.id === c.reporter)!;
            const CatIcon = catIcon[c.cat] || WrenchIcon;
            return (
              <Card key={c.id} padding={14} onPress={() => navigation.navigate('CaseDetail', { caseId: c.id })}>
                <View style={styles.caseRow}>
                  <View style={styles.caseIconWrap}>
                    <CatIcon color={TOKENS.primary} size={18} />
                  </View>
                  <View style={styles.caseBody}>
                    <View style={styles.caseMeta}>
                      <Chip tone={statusTone[c.status]} size="xs">{statusLabel[c.status]}</Chip>
                      {c.priority === 'high' && <Chip tone="danger" size="xs">{lang === 'mk' ? 'Итно' : 'Urgent'}</Chip>}
                      <Text style={styles.caseId}>#{c.id.slice(1)} · {c.date}</Text>
                    </View>
                    <Text style={styles.caseTitle}>{c.title[lang]}</Text>
                    <View style={styles.caseReporter}>
                      <Avatar user={rep} size={18} />
                      <Text style={styles.caseReporterText}>{lang === 'mk' ? rep.name : rep.en}</Text>
                      {c.assignee && <Text style={styles.caseAssignee}> → {c.assignee}</Text>}
                    </View>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity onPress={() => navigation.navigate('NewCase')} activeOpacity={0.8} style={styles.fab}>
        <PlusIcon color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: { paddingHorizontal: 20, flexDirection: 'row', gap: 8, marginBottom: 12 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: TOKENS.border, backgroundColor: TOKENS.bgElevated },
  filterBtnActive: { backgroundColor: TOKENS.ink, borderColor: TOKENS.ink },
  filterText: { fontSize: 13, fontFamily: FONTS.semiBold, color: TOKENS.inkSoft },
  filterTextActive: { color: 'white' },
  list: { paddingHorizontal: 20, gap: 10 },
  caseRow: { flexDirection: 'row', gap: 12 },
  caseIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: TOKENS.bgSubtle, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  caseBody: { flex: 1 },
  caseMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  caseId: { fontSize: 11, color: TOKENS.inkMuted, marginLeft: 'auto', fontFamily: FONTS.regular },
  caseTitle: { fontSize: 15, fontFamily: FONTS.semiBold, color: TOKENS.ink, lineHeight: 20 },
  caseReporter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  caseReporterText: { fontSize: 12, color: TOKENS.inkSoft, fontFamily: FONTS.medium },
  caseAssignee: { fontSize: 12, color: TOKENS.inkSoft, fontFamily: FONTS.medium },
  fab: { position: 'absolute', right: 20, bottom: TAB_BAR_HEIGHT + 16, width: 56, height: 56, borderRadius: 28, backgroundColor: TOKENS.primary, alignItems: 'center', justifyContent: 'center', shadowColor: TOKENS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 18, elevation: 6 },
});
