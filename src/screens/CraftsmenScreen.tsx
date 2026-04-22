import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { DATA, Craftsman } from '../data';
import { Chip } from '../components/Chip';
import { Card } from '../components/Card';
import { BackHeader } from '../components/BackHeader';
import { CalendarIcon, StarIcon, VerifiedIcon } from '../components/Icon';
import { RootStackParamList } from '../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type AvailTone = 'success' | 'sage' | 'neutral';

const availLabel = (a: string, lang: 'mk' | 'en') => {
  if (a === 'today') return lang === 'mk' ? 'Достапен денес' : 'Available today';
  if (a === 'tomorrow') return lang === 'mk' ? 'Утре' : 'Tomorrow';
  return lang === 'mk' ? 'Следна недела' : 'Next week';
};
const availTone = (a: string): AvailTone => a === 'today' ? 'success' : a === 'tomorrow' ? 'sage' : 'neutral';

export function CraftsmenScreen() {
  const navigation = useNavigation<Nav>();
  const { lang } = useApp();
  const { TRADES, CRAFTSMEN, MY_BOOKINGS } = DATA;
  const [trade, setTrade] = useState('all');

  const filtered = trade === 'all' ? CRAFTSMEN : CRAFTSMEN.filter(c => c.trade === trade);
  const myBooking = MY_BOOKINGS[0];
  const bookedCraftsman = myBooking ? CRAFTSMEN.find(c => c.id === myBooking.craftsman) : null;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader />
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{lang === 'mk' ? 'Мајстор' : 'Craftsmen'}</Text>
        <Text style={styles.subtitle}>
          {lang === 'mk' ? 'Резервирај проверен мајстор во Скопје. Оценети од соседи.' : 'Book a vetted craftsman in Skopje. Rated by neighbors.'}
        </Text>
      </View>

      {/* Active booking */}
      {myBooking && bookedCraftsman && (
        <View style={styles.section}>
          <Card padding={14}>
            <View style={styles.bookingRow}>
              <View style={styles.bookingIcon}>
                <CalendarIcon color={TOKENS.sageInk} size={20} />
              </View>
              <View style={styles.bookingBody}>
                <Text style={styles.bookingLabel}>{lang === 'mk' ? 'Мое активно закажување' : 'My active booking'}</Text>
                <Text style={styles.bookingDetail}>{lang === 'mk' ? bookedCraftsman.name : bookedCraftsman.en} · {lang === 'mk' ? myBooking.date : myBooking.en_date} {myBooking.time}</Text>
              </View>
              <Chip tone="success" size="xs">✓ {lang === 'mk' ? 'Потврдено' : 'Confirmed'}</Chip>
            </View>
          </Card>
        </View>
      )}

      {/* Trade filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tradeScroll}>
        {[{ id: 'all', mk: 'Сите', en: 'All' }, ...TRADES].map(tr => (
          <TouchableOpacity
            key={tr.id}
            onPress={() => setTrade(tr.id)}
            activeOpacity={0.7}
            style={[styles.tradePill, trade === tr.id && styles.tradePillActive]}
          >
            <Text style={[styles.tradePillText, trade === tr.id && styles.tradePillTextActive]}>{tr[lang]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Craftsmen cards */}
      <View style={styles.craftsList}>
        {filtered.map(c => (
          <CraftsmanCard key={c.id} craftsman={c} lang={lang} onPress={() => navigation.navigate('CraftsmanDetail', { craftsmanId: c.id })} />
        ))}
      </View>
    </ScrollView>
  );
}

function CraftsmanCard({ craftsman: c, lang, onPress }: { craftsman: Craftsman; lang: 'mk' | 'en'; onPress: () => void }) {
  const { TRADES } = DATA;
  const tr = TRADES.find(x => x.id === c.trade)!;
  return (
    <Card padding={14} onPress={onPress}>
      <View style={styles.craftsmanRow}>
        <View style={[styles.craftsmanAvatar, { backgroundColor: c.color }]}>
          <Text style={styles.craftsmanInitials}>{c.initials}</Text>
        </View>
        <View style={styles.craftsmanBody}>
          <View style={styles.craftsmanNameRow}>
            <Text style={styles.craftsmanName} numberOfLines={1}>{lang === 'mk' ? c.name : c.en}</Text>
            {c.verified && <VerifiedIcon color={TOKENS.sage} size={14} />}
          </View>
          <Text style={styles.craftsmanTrade}>
            <Text style={{ color: tr.color }}>{tr[lang]}</Text>
            <Text style={{ color: TOKENS.inkMuted }}> · {c.years} {lang === 'mk' ? 'год.' : 'yrs'} · {c.city}</Text>
          </Text>
          <View style={styles.craftsmanMeta}>
            <View style={styles.ratingRow}>
              <StarIcon size={13} />
              <Text style={styles.ratingVal}>{c.rating}</Text>
              <Text style={styles.ratingCount}>({c.reviews})</Text>
            </View>
            <Chip tone={availTone(c.avail)} size="xs">{availLabel(c.avail, lang)}</Chip>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 40 },
  titleWrap: { paddingHorizontal: 20, paddingBottom: 14 },
  title: { fontSize: 28, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.6 },
  subtitle: { fontSize: 13.5, color: TOKENS.inkSoft, fontFamily: FONTS.regular, marginTop: 4, lineHeight: 20 },
  section: { paddingHorizontal: 20, marginBottom: 14 },
  bookingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bookingIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: TOKENS.sageSoft, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  bookingBody: { flex: 1, minWidth: 0 },
  bookingLabel: { fontSize: 13, color: TOKENS.inkSoft, fontFamily: FONTS.medium },
  bookingDetail: { fontSize: 14, fontFamily: FONTS.semiBold, color: TOKENS.ink, marginTop: 2 },
  tradeScroll: { paddingHorizontal: 20, paddingBottom: 12, gap: 6 },
  tradePill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: TOKENS.border, backgroundColor: TOKENS.bgElevated, flexShrink: 0 },
  tradePillActive: { backgroundColor: TOKENS.ink, borderColor: TOKENS.ink },
  tradePillText: { fontSize: 13, fontFamily: FONTS.semiBold, color: TOKENS.inkSoft },
  tradePillTextActive: { color: 'white' },
  craftsList: { paddingHorizontal: 20, gap: 10 },
  craftsmanRow: { flexDirection: 'row', gap: 12 },
  craftsmanAvatar: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  craftsmanInitials: { fontSize: 17, fontFamily: FONTS.bold, color: 'white' },
  craftsmanBody: { flex: 1, minWidth: 0 },
  craftsmanNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'nowrap' },
  craftsmanName: { fontSize: 15, fontFamily: FONTS.bold, color: TOKENS.ink, flexShrink: 1 },
  craftsmanTrade: { fontSize: 12.5, fontFamily: FONTS.medium, marginTop: 3 },
  craftsmanMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingVal: { fontSize: 12.5, fontFamily: FONTS.bold, color: TOKENS.ink },
  ratingCount: { fontSize: 12.5, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
});
