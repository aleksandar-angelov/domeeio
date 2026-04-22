import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Chip } from '../components/Chip';
import { BackHeader } from '../components/BackHeader';
import { CheckIcon } from '../components/Icon';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CaseDetail'>;

const statusTone: Record<string, 'rose' | 'amber' | 'success'> = {
  open: 'rose', in_progress: 'amber', resolved: 'success',
};

export function CaseDetailScreen({ route }: Props) {
  const { lang } = useApp();
  const t = T[lang];
  const { CASES, RESIDENTS } = DATA;
  const c = CASES.find(x => x.id === route.params.caseId)!;
  const rep = RESIDENTS.find(r => r.id === c.reporter)!;
  const statusLabel: Record<string, string> = { open: t.open, in_progress: t.inProgress, resolved: t.resolved };

  type TimelineItem = { id: number; type: string; time: string; user: typeof rep; meta?: string | null; text?: { mk: string; en: string } };
  const timeline: TimelineItem[] = [
    { id: 1, type: 'reported', time: c.date + ' 14:22', user: rep },
    { id: 2, type: 'assigned', time: c.date + ' 16:05', user: RESIDENTS[0], meta: c.assignee },
    { id: 3, type: 'update', time: '22 Apr 09:15', user: RESIDENTS[0], text: { mk: 'Сервисерот потврди доаѓање утре во 10:00.', en: 'Technician confirmed arrival tomorrow at 10:00.' } },
  ].filter(it => c.status !== 'open' || it.type === 'reported');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader title={`#${c.id.slice(1)}`} />

      <View style={styles.body}>
        <View style={styles.chips}>
          <Chip tone={statusTone[c.status]}>{statusLabel[c.status]}</Chip>
          {c.priority === 'high' && <Chip tone="danger">{lang === 'mk' ? 'Итно' : 'Urgent'}</Chip>}
        </View>

        <Text style={styles.title}>{c.title[lang]}</Text>
        <Text style={styles.desc}>
          {lang === 'mk'
            ? 'Пријавено од жителите. Потребна е проверка и поправка.'
            : 'Reported by residents. Inspection and repair required.'}
        </Text>

        {/* Photo placeholder */}
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>[case photo]</Text>
        </View>

        {/* Meta grid */}
        <View style={styles.metaGrid}>
          <MetaField label={t.reportedBy} value={lang === 'mk' ? rep.name : rep.en} />
          <MetaField label={t.assigned} value={c.assignee ?? '—'} />
        </View>

        {/* Timeline */}
        <Text style={styles.activityLabel}>{lang === 'mk' ? 'АКТИВНОСТ' : 'ACTIVITY'}</Text>
        {timeline.map((it, i) => (
          <View key={it.id} style={styles.timelineItem}>
            {i < timeline.length - 1 && <View style={styles.timelineLine} />}
            <View style={styles.timelineDot}>
              <CheckIcon color={TOKENS.sageInk} size={14} />
            </View>
            <View style={styles.timelineBody}>
              <Text style={styles.timelineTitle}>
                {it.type === 'reported' && (lang === 'mk' ? 'Пријавен случај' : 'Case reported')}
                {it.type === 'assigned' && (lang === 'mk' ? `Доделен на ${it.meta}` : `Assigned to ${it.meta}`)}
                {it.type === 'update' && it.text?.[lang]}
              </Text>
              <Text style={styles.timelineMeta}>{lang === 'mk' ? it.user.name : it.user.en} · {it.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaField}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 40 },
  body: { paddingHorizontal: 20 },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  title: { fontSize: 24, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.4, lineHeight: 30 },
  desc: { fontSize: 14, color: TOKENS.inkSoft, fontFamily: FONTS.regular, lineHeight: 21, marginTop: 8 },
  photoPlaceholder: { marginTop: 16, borderRadius: 14, height: 140, backgroundColor: TOKENS.bgSubtle, borderWidth: 1, borderColor: TOKENS.border, alignItems: 'center', justifyContent: 'center' },
  photoText: { color: TOKENS.inkMuted, fontSize: 12, fontFamily: 'monospace' },
  metaGrid: { marginTop: 16, flexDirection: 'row', gap: 10 },
  metaField: { flex: 1, backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border, borderRadius: 12, padding: 10 },
  metaLabel: { fontSize: 11, color: TOKENS.inkMuted, fontFamily: FONTS.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  metaValue: { fontSize: 14, color: TOKENS.ink, fontFamily: FONTS.medium, marginTop: 3 },
  activityLabel: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.inkSoft, letterSpacing: 0.8, marginTop: 24, marginBottom: 12 },
  timelineItem: { flexDirection: 'row', gap: 12, paddingBottom: 16, position: 'relative' },
  timelineLine: { position: 'absolute', left: 13, top: 28, bottom: 4, width: 1.5, backgroundColor: TOKENS.border },
  timelineDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: TOKENS.sageSoft, alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 },
  timelineBody: { flex: 1 },
  timelineTitle: { fontSize: 13, fontFamily: FONTS.semiBold, color: TOKENS.ink, lineHeight: 18 },
  timelineMeta: { fontSize: 12, color: TOKENS.inkMuted, fontFamily: FONTS.regular, marginTop: 2 },
});
