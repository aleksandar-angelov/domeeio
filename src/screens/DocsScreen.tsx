import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Chip } from '../components/Chip';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { TAB_BAR_HEIGHT } from '../navigation/TabNavigator';

type DocTab = 'all' | 'bills' | 'minutes' | 'docs';

export function DocsScreen() {
  const { lang } = useApp();
  const t = T[lang];
  const { DOCS } = DATA;
  const [tab, setTab] = useState<DocTab>('all');

  const groups: Record<DocTab, typeof DOCS> = {
    all: DOCS,
    bills: DOCS.filter(d => d.type === 'bill'),
    minutes: DOCS.filter(d => d.type === 'minutes'),
    docs: DOCS.filter(d => d.type === 'doc'),
  };
  const items = groups[tab];
  const unpaid = DOCS.find(d => d.type === 'bill' && d.status === 'unpaid');

  const docTypeColor = (type: string) => {
    if (type === 'bill') return { bg: TOKENS.primarySoft, ink: TOKENS.primaryInk };
    if (type === 'minutes') return { bg: TOKENS.sageSoft, ink: TOKENS.sageInk };
    return { bg: TOKENS.skySoft, ink: '#3e5668' };
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: TOKENS.bg }} contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 20 }} showsVerticalScrollIndicator={false}>
      <ScreenHeader title={t.tabs.docs} />

      {/* Unpaid bill banner */}
      {unpaid && (
        <View style={styles.bannerWrap}>
          <LinearGradient colors={[TOKENS.primary, TOKENS.amber]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.banner}>
            <Text style={styles.bannerLabel}>{lang === 'mk' ? 'НЕПЛАТЕНА СМЕТКА' : 'UNPAID BILL'}</Text>
            <Text style={styles.bannerTitle}>{unpaid.title[lang]}</Text>
            <View style={styles.bannerFooter}>
              <View>
                <Text style={styles.bannerAmount}>{unpaid.amount}</Text>
                <Text style={styles.bannerDue}>{t.due} {unpaid.due}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>{lang === 'mk' ? 'Преземи PDF' : 'Download PDF'}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {([['all', lang === 'mk' ? 'Сите' : 'All'], ['bills', t.bills], ['minutes', t.minutes], ['docs', t.documents]] as [DocTab, string][]).map(([id, label]) => (
          <TouchableOpacity
            key={id}
            onPress={() => setTab(id)}
            activeOpacity={0.7}
            style={[styles.filterBtn, tab === id && styles.filterBtnActive]}
          >
            <Text style={[styles.filterText, tab === id && styles.filterTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.list}>
        {items.map(d => {
          const colors = docTypeColor(d.type);
          return (
            <Card key={d.id} padding={14}>
              <View style={styles.docRow}>
                <View style={[styles.docThumb, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.docThumbText, { color: colors.ink }]}>PDF</Text>
                </View>
                <View style={styles.docBody}>
                  <Text style={styles.docTitle}>{d.title[lang]}</Text>
                  <View style={styles.docMeta}>
                    {d.amount && <Text style={styles.docAmount}>{d.amount}</Text>}
                    {d.amount && <Text style={styles.docMetaSep}>·</Text>}
                    <Text style={styles.docSize}>{d.size}</Text>
                    {d.status === 'paid' && <Chip tone="success" size="xs">✓ {t.paid}</Chip>}
                    {d.status === 'unpaid' && <Chip tone="warn" size="xs">{t.unpaid}</Chip>}
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bannerWrap: { paddingHorizontal: 20, marginBottom: 16 },
  banner: { padding: 16, borderRadius: 16 },
  bannerLabel: { fontSize: 11, fontFamily: FONTS.bold, color: 'white', opacity: 0.9, letterSpacing: 1, textTransform: 'uppercase' },
  bannerTitle: { fontSize: 15, fontFamily: FONTS.semiBold, color: 'white', marginTop: 6 },
  bannerFooter: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 14 },
  bannerAmount: { fontSize: 26, fontFamily: FONTS.bold, color: 'white', letterSpacing: -0.5 },
  bannerDue: { fontSize: 12, color: 'white', opacity: 0.9, marginTop: 2, fontFamily: FONTS.regular },
  bannerBtn: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  bannerBtnText: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.primaryInk },
  filterRow: { paddingHorizontal: 20, paddingBottom: 12, gap: 6 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, borderWidth: 1, borderColor: TOKENS.border, backgroundColor: TOKENS.bgElevated },
  filterBtnActive: { backgroundColor: TOKENS.ink, borderColor: TOKENS.ink },
  filterText: { fontSize: 13, fontFamily: FONTS.semiBold, color: TOKENS.inkSoft },
  filterTextActive: { color: 'white' },
  list: { paddingHorizontal: 20, gap: 8 },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  docThumb: { width: 44, height: 56, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  docThumbText: { fontSize: 10, fontFamily: FONTS.extraBold, letterSpacing: 0.5 },
  docBody: { flex: 1 },
  docTitle: { fontSize: 14.5, fontFamily: FONTS.semiBold, color: TOKENS.ink, lineHeight: 20 },
  docMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' },
  docAmount: { fontSize: 12, fontFamily: FONTS.bold, color: TOKENS.ink },
  docMetaSep: { fontSize: 12, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
  docSize: { fontSize: 12, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
});
