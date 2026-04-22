import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Chip } from '../components/Chip';
import { BackHeader } from '../components/BackHeader';
import { CheckIcon } from '../components/Icon';
import { PrimaryButton } from '../components/FormComponents';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'PollDetail'>;

export function PollDetailScreen({ route }: Props) {
  const { lang, votes, castVote } = useApp();
  const t = T[lang];
  const { POLLS } = DATA;
  const p = POLLS.find(x => x.id === route.params.pollId)!;
  const myVote = votes[p.id] || p.voted;
  const [selected, setSelected] = useState<string | null>(myVote || null);
  const [just, setJust] = useState(false);
  const closed = p.closed;
  const total = p.total;

  const handleCast = () => {
    if (!selected || myVote) return;
    castVote(p.id, selected);
    setJust(true);
    setTimeout(() => setJust(false), 1600);
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader />
      <View style={styles.body}>
        <View style={styles.chips}>
          {closed
            ? <Chip tone="neutral">{lang === 'mk' ? 'Завршено' : 'Closed'}</Chip>
            : <Chip tone="sage">{lang === 'mk' ? 'Активно' : 'Active'}</Chip>}
          <Chip tone="neutral">{p.deadline[lang]}</Chip>
        </View>

        <Text style={styles.title}>{p.title[lang]}</Text>
        <Text style={styles.desc}>{p.desc[lang]}</Text>

        {/* Participation bar */}
        <View style={styles.participationCard}>
          <View style={styles.participationRow}>
            <Text style={styles.participationLabel}>{t.participation}</Text>
            <Text style={styles.participationValue}>{p.participation}% · {p.options.reduce((s, o) => s + o.votes, 0)}/{total}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${p.participation}%` as any }]} />
          </View>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {p.options.map(opt => {
            const pct = Math.round((opt.votes / total) * 100);
            const isSel = selected === opt.id;
            const isMy = myVote === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => { if (!myVote && !closed) setSelected(opt.id); }}
                activeOpacity={myVote || closed ? 1 : 0.7}
                style={[styles.option, { borderColor: isSel || isMy ? TOKENS.primary : TOKENS.border }]}
              >
                {(myVote || closed) && (
                  <View style={[styles.optionBar, { width: `${pct}%` as any, backgroundColor: isMy ? TOKENS.primarySoft : TOKENS.bgSubtle }]} />
                )}
                <View style={styles.optionInner}>
                  <View style={[styles.radio, { borderColor: isSel || isMy ? TOKENS.primary : TOKENS.borderStrong, backgroundColor: isSel || isMy ? TOKENS.primary : 'transparent' }]}>
                    {(isSel || isMy) && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.optionLabel}>{opt.label[lang]}</Text>
                  {(myVote || closed) && <Text style={styles.optionPct}>{pct}%</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {!myVote && !closed && (
          <PrimaryButton onPress={handleCast} disabled={!selected} style={styles.castBtn}>
            {t.castVote}
          </PrimaryButton>
        )}

        {myVote && !closed && (
          <View style={styles.votedBanner}>
            <CheckIcon color={TOKENS.sageInk} size={16} />
            <Text style={styles.votedText}>
              {lang === 'mk' ? 'Твојот глас е запишан. Можеш да го смениш додека гласањето е отворено.' : 'Your vote is recorded. You can change it while voting is open.'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
    {just && (
      <View style={styles.toast} pointerEvents="none">
        <CheckIcon color="#fff" size={16} />
        <Text style={styles.toastText}>{lang === 'mk' ? 'Гласот е запишан' : 'Vote recorded'}</Text>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 60 },
  body: { paddingHorizontal: 20 },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  title: { fontSize: 24, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.4, lineHeight: 30 },
  desc: { fontSize: 14.5, color: TOKENS.inkSoft, fontFamily: FONTS.regular, lineHeight: 22, marginTop: 10 },
  participationCard: { marginTop: 16, padding: 14, borderRadius: 14, backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border },
  participationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  participationLabel: { fontSize: 12, color: TOKENS.inkSoft, fontFamily: FONTS.semiBold },
  participationValue: { fontSize: 12, color: TOKENS.ink, fontFamily: FONTS.semiBold },
  progressTrack: { height: 6, borderRadius: 6, backgroundColor: TOKENS.bgSubtle, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: TOKENS.sage, borderRadius: 6 },
  options: { marginTop: 20, gap: 10 },
  option: { position: 'relative', overflow: 'hidden', borderRadius: 14, borderWidth: 2, backgroundColor: TOKENS.bgElevated },
  optionBar: { position: 'absolute', top: 0, left: 0, bottom: 0 },
  optionInner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, paddingHorizontal: 16 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' },
  optionLabel: { flex: 1, fontSize: 15, fontFamily: FONTS.semiBold, color: TOKENS.ink },
  optionPct: { fontSize: 14, fontFamily: FONTS.bold, color: TOKENS.ink },
  castBtn: { marginTop: 20 },
  votedBanner: { marginTop: 20, padding: 14, borderRadius: 14, backgroundColor: TOKENS.sageSoft, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  votedText: { flex: 1, fontSize: 14, fontFamily: FONTS.semiBold, color: TOKENS.sageInk, lineHeight: 20 },
  toast: { position: 'absolute', alignSelf: 'center', top: '45%', backgroundColor: 'rgba(42,36,28,0.92)', paddingHorizontal: 22, paddingVertical: 14, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  toastText: { color: 'white', fontSize: 14, fontFamily: FONTS.semiBold },
});
