import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA, Poll } from '../data';
import { Chip } from '../components/Chip';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { RootStackParamList } from '../types/navigation';
import { TAB_BAR_HEIGHT } from '../navigation/TabNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function PollsScreen() {
  const navigation = useNavigation<Nav>();
  const { lang, votes } = useApp();
  const t = T[lang];
  const { POLLS } = DATA;
  const insets = useSafeAreaInsets();

  const active = POLLS.filter(p => !p.closed).length;
  const closed = POLLS.filter(p => p.closed).length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: TOKENS.bg }} contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20 }} showsVerticalScrollIndicator={false}>
      <ScreenHeader title={t.tabs.polls} subtitle={lang === 'mk' ? `${active} активни · ${closed} завршени` : `${active} active · ${closed} closed`} />
      <View style={styles.list}>
        {POLLS.map(p => (
          <PollCard key={p.id} poll={p} lang={lang} myVote={votes[p.id]} onOpen={() => navigation.navigate('PollDetail', { pollId: p.id })} />
        ))}
      </View>
    </ScrollView>
  );
}

function PollCard({ poll, lang, myVote, onOpen }: { poll: Poll; lang: 'mk' | 'en'; myVote?: string; onOpen: () => void }) {
  const t = T[lang];
  const maxVotes = Math.max(...poll.options.map(o => o.votes));
  const closed = poll.closed;
  const total = poll.total;

  return (
    <Card padding={0} onPress={onOpen}>
      <View style={styles.cardHeader}>
        <View style={styles.cardChips}>
          {closed
            ? <Chip tone="neutral" size="xs">{lang === 'mk' ? 'Завршено' : 'Closed'}</Chip>
            : <Chip tone="sage" size="xs">{lang === 'mk' ? 'Активно' : 'Active'}</Chip>}
          {(myVote || poll.voted) && <Chip tone="primary" size="xs">✓ {t.youVoted}</Chip>}
          <Text style={styles.deadline}>{poll.deadline[lang]}</Text>
        </View>
        <Text style={styles.pollTitle}>{poll.title[lang]}</Text>
        <Text style={styles.pollDesc}>{poll.desc[lang]}</Text>
      </View>

      <View style={styles.optionsWrap}>
        {poll.options.map(opt => {
          const pct = Math.round((opt.votes / total) * 100);
          const isWinner = closed && opt.votes === maxVotes;
          const userVoted = myVote === opt.id || poll.voted === opt.id;
          return (
            <View key={opt.id} style={[styles.optionRow, { borderColor: userVoted ? TOKENS.primary : TOKENS.border }]}>
              <View style={[styles.optionBar, { width: `${pct}%` as any, backgroundColor: isWinner ? TOKENS.sageSoft : (userVoted ? TOKENS.primarySoft : '#ebe3d3') }]} />
              <View style={styles.optionContent}>
                <Text style={[styles.optionLabel, (userVoted || isWinner) && styles.optionLabelBold]}>{opt.label[lang]}</Text>
                <Text style={styles.optionPct}>{pct}%</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.participation}>
          {t.participation}: <Text style={styles.participationBold}>{poll.participation}%</Text>
          <Text style={styles.participationMuted}> · {poll.options.reduce((s, o) => s + o.votes, 0)} / {total}</Text>
        </Text>
        {!closed && !myVote && !poll.voted && (
          <Text style={styles.voteNow}>{t.voteNow} →</Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, gap: 14 },
  cardHeader: { padding: 16, paddingBottom: 12 },
  cardChips: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  deadline: { fontSize: 11, color: TOKENS.inkMuted, marginLeft: 'auto', fontFamily: FONTS.medium },
  pollTitle: { fontSize: 17, fontFamily: FONTS.bold, color: TOKENS.ink, lineHeight: 22, letterSpacing: -0.2 },
  pollDesc: { fontSize: 13, color: TOKENS.inkSoft, marginTop: 6, lineHeight: 18, fontFamily: FONTS.regular },
  optionsWrap: { paddingHorizontal: 16, paddingBottom: 14, gap: 8 },
  optionRow: { position: 'relative', overflow: 'hidden', borderRadius: 10, borderWidth: 1, backgroundColor: TOKENS.bgSubtle },
  optionBar: { position: 'absolute', top: 0, left: 0, bottom: 0 },
  optionContent: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 12, gap: 8 },
  optionLabel: { flex: 1, fontSize: 13.5, color: TOKENS.ink, fontFamily: FONTS.medium },
  optionLabelBold: { fontFamily: FONTS.bold },
  optionPct: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.inkSoft },
  cardFooter: { paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderTopColor: TOKENS.border, flexDirection: 'row', alignItems: 'center' },
  participation: { flex: 1, fontSize: 12, color: TOKENS.inkSoft, fontFamily: FONTS.regular },
  participationBold: { fontFamily: FONTS.bold, color: TOKENS.ink },
  participationMuted: { color: TOKENS.inkMuted },
  voteNow: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.primary },
});
