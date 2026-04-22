import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { DATA } from '../data';
import { BackHeader } from '../components/BackHeader';
import { FieldLabel, TextArea, PrimaryButton } from '../components/FormComponents';
import { CheckIcon, StarIcon, VerifiedIcon } from '../components/Icon';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CraftsmanDetail'>;
type Step = 'profile' | 'booking' | 'confirmed';

const DATES = [
  { id: 'd1', mk: 'Сре', en: 'Wed', num: 23 },
  { id: 'd2', mk: 'Чет', en: 'Thu', num: 24 },
  { id: 'd3', mk: 'Пет', en: 'Fri', num: 25 },
  { id: 'd4', mk: 'Саб', en: 'Sat', num: 26 },
  { id: 'd5', mk: 'Пон', en: 'Mon', num: 28 },
];
const SLOTS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

export function CraftsmanDetailScreen({ route }: Props) {
  const navigation = useNavigation();
  const { lang } = useApp();
  const { CRAFTSMEN, TRADES } = DATA;
  const c = CRAFTSMEN.find(x => x.id === route.params.craftsmanId)!;
  const tr = TRADES.find(x => x.id === c.trade)!;

  const [step, setStep] = useState<Step>('profile');
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [desc, setDesc] = useState('');

  if (step === 'confirmed') {
    const d = DATES.find(x => x.id === date);
    return (
      <View style={styles.confirmContainer}>
        <BackHeader onBack={() => navigation.goBack()} />
        <View style={styles.confirmBody}>
          <View style={styles.confirmIcon}>
            <CheckIcon color={TOKENS.sageInk} size={40} />
          </View>
          <Text style={styles.confirmTitle}>{lang === 'mk' ? 'Закажано!' : 'Booked!'}</Text>
          <Text style={styles.confirmDetail}>{lang === 'mk' ? c.name : c.en} · {d?.[lang]} {d?.num} · {time}</Text>
          <Text style={styles.confirmNote}>{lang === 'mk' ? 'Мајсторот ќе ја потврди резервацијата.' : 'The craftsman will confirm your booking.'}</Text>
          <PrimaryButton onPress={() => navigation.goBack()} style={styles.confirmBtn}>
            {lang === 'mk' ? 'Готово' : 'Done'}
          </PrimaryButton>
        </View>
      </View>
    );
  }

  if (step === 'booking') {
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <BackHeader onBack={() => setStep('profile')} />
        <View style={styles.body}>
          <Text style={styles.bookingTitle}>{lang === 'mk' ? 'Закажи термин' : 'Book a time'}</Text>
          <Text style={styles.bookingWith}>{lang === 'mk' ? 'со' : 'with'} {lang === 'mk' ? c.name : c.en}</Text>

          <FieldLabel>{lang === 'mk' ? 'Датум' : 'Date'}</FieldLabel>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
            {DATES.map(d => (
              <TouchableOpacity
                key={d.id}
                onPress={() => setDate(d.id)}
                activeOpacity={0.7}
                style={[styles.dateBtn, date === d.id && styles.dateBtnActive]}
              >
                <Text style={[styles.dateBtnDay, date === d.id && styles.dateBtnTextActive]}>{d[lang]}</Text>
                <Text style={[styles.dateBtnNum, date === d.id && styles.dateBtnTextActive]}>{d.num}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FieldLabel>{lang === 'mk' ? 'Време' : 'Time'}</FieldLabel>
          <View style={styles.slotsGrid}>
            {SLOTS.map(s => (
              <TouchableOpacity
                key={s}
                onPress={() => setTime(s)}
                activeOpacity={0.7}
                style={[styles.slotBtn, time === s && styles.slotBtnActive]}
              >
                <Text style={[styles.slotBtnText, time === s && styles.slotBtnTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FieldLabel>{lang === 'mk' ? 'Опис на работата' : 'Job description'}</FieldLabel>
          <TextArea value={desc} onChangeText={setDesc} placeholder={lang === 'mk' ? 'Што треба да се направи…' : 'What needs to be done…'} />

          <PrimaryButton onPress={() => date && time && setStep('confirmed')} disabled={!date || !time} style={styles.confirmBookBtn}>
            {lang === 'mk' ? 'Потврди резервација' : 'Confirm booking'}
          </PrimaryButton>
        </View>
      </ScrollView>
    );
  }

  // Profile view
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader />
      <View style={styles.body}>
        {/* Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.profileAvatar, { backgroundColor: c.color }]}>
            <Text style={styles.profileInitials}>{c.initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileNameRow}>
              <Text style={styles.profileName}>{lang === 'mk' ? c.name : c.en}</Text>
              {c.verified && <VerifiedIcon color={TOKENS.sage} size={16} />}
            </View>
            <Text style={[styles.profileTrade, { color: tr.color }]}>{tr[lang]}</Text>
            <View style={styles.profileRating}>
              <StarIcon size={14} />
              <Text style={styles.ratingVal}>{c.rating}</Text>
              <Text style={styles.ratingCount}>· {c.reviews} {lang === 'mk' ? 'оценки' : 'reviews'}</Text>
            </View>
          </View>
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          <StatBox label={lang === 'mk' ? 'Искуство' : 'Experience'} value={`${c.years} ${lang === 'mk' ? 'год.' : 'yrs'}`} />
          <StatBox label={lang === 'mk' ? 'Град' : 'City'} value={c.city} />
          <StatBox label={lang === 'mk' ? 'Цена' : 'Rate'} value={c.price} small />
        </View>

        <Text style={styles.bio}>{c.desc[lang]}</Text>

        <View style={styles.availBanner}>
          <CheckIcon color={TOKENS.sageInk} size={16} />
          <Text style={styles.availText}>
            {c.avail === 'today'
              ? (lang === 'mk' ? 'Достапен денес за итни повици' : 'Available today for urgent calls')
              : (lang === 'mk' ? 'Следно слободно: утре' : 'Next available: tomorrow')}
          </Text>
        </View>

        {/* Reviews */}
        <Text style={styles.reviewsLabel}>{lang === 'mk' ? 'ОЦЕНКИ ОД СОСЕДИ' : 'NEIGHBOR REVIEWS'}</Text>
        {[
          { by: 'Ана, стан 12', en_by: 'Ana, unit 12', rating: 5, text: { mk: 'Дојде за 30 минути и го реши проблемот брзо. Препорака!', en: 'Came in 30 minutes and fixed it fast. Highly recommend!' } },
          { by: 'Марко, стан 8', en_by: 'Marko, unit 8', rating: 5, text: { mk: 'Уредно, чисто и по добра цена.', en: 'Tidy, clean, and fair pricing.' } },
        ].map((r, i) => (
          <View key={i} style={[styles.review, i > 0 && styles.reviewBorder]}>
            <View style={styles.reviewMeta}>
              <Text style={styles.reviewAuthor}>{lang === 'mk' ? r.by : r.en_by}</Text>
              <Text style={styles.reviewStars}>{'★'.repeat(r.rating)}</Text>
            </View>
            <Text style={styles.reviewText}>{r.text[lang]}</Text>
          </View>
        ))}

        <PrimaryButton onPress={() => setStep('booking')} style={styles.bookBtn}>
          {lang === 'mk' ? 'Закажи термин' : 'Book a time'}
        </PrimaryButton>
        <Text style={styles.disclaimer}>
          {lang === 'mk'
            ? 'Мајсторите се независни изведувачи — Domeeio не е страна во договорот.'
            : 'Craftsmen are independent contractors — Domeeio is not a party to the contract.'}
        </Text>
      </View>
    </ScrollView>
  );
}

function StatBox({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <View style={statStyles.box}>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={[statStyles.value, small && statStyles.valueSmall]}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  box: { flex: 1, padding: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border },
  label: { fontSize: 10.5, fontFamily: FONTS.bold, color: TOKENS.inkMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 15, fontFamily: FONTS.bold, color: TOKENS.ink, marginTop: 3, letterSpacing: -0.2 },
  valueSmall: { fontSize: 12 },
});

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 60 },
  body: { paddingHorizontal: 20 },
  profileHeader: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  profileAvatar: { width: 76, height: 76, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  profileInitials: { fontSize: 28, fontFamily: FONTS.bold, color: 'white' },
  profileInfo: { flex: 1, minWidth: 0 },
  profileNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  profileName: { fontSize: 20, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.3, lineHeight: 24, flexShrink: 1 },
  profileTrade: { fontSize: 13, fontFamily: FONTS.semiBold, marginTop: 6 },
  profileRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  ratingVal: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.ink },
  ratingCount: { fontSize: 13, color: TOKENS.inkMuted, fontFamily: FONTS.regular },
  statsGrid: { flexDirection: 'row', gap: 8, marginTop: 18 },
  bio: { marginTop: 18, fontSize: 14.5, color: TOKENS.inkSoft, fontFamily: FONTS.regular, lineHeight: 22 },
  availBanner: { marginTop: 20, padding: 14, borderRadius: 14, backgroundColor: TOKENS.sageSoft, flexDirection: 'row', alignItems: 'center', gap: 10 },
  availText: { fontSize: 13, fontFamily: FONTS.semiBold, color: TOKENS.sageInk, flex: 1 },
  reviewsLabel: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.inkSoft, letterSpacing: 0.8, marginTop: 22, marginBottom: 10 },
  review: { paddingVertical: 12 },
  reviewBorder: { borderTopWidth: 1, borderTopColor: TOKENS.border },
  reviewMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  reviewAuthor: { fontSize: 12, fontFamily: FONTS.bold, color: TOKENS.ink },
  reviewStars: { fontSize: 12, color: TOKENS.amber },
  reviewText: { fontSize: 13.5, color: TOKENS.inkSoft, fontFamily: FONTS.regular, lineHeight: 20, marginTop: 4 },
  bookBtn: { marginTop: 24 },
  disclaimer: { fontSize: 11, color: TOKENS.inkMuted, textAlign: 'center', marginTop: 8, lineHeight: 16, fontFamily: FONTS.regular },
  // Booking step
  bookingTitle: { fontSize: 22, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.4 },
  bookingWith: { fontSize: 13, color: TOKENS.inkSoft, fontFamily: FONTS.regular, marginTop: 4 },
  dateScroll: { gap: 8, paddingBottom: 4 },
  dateBtn: { width: 62, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: TOKENS.border, backgroundColor: TOKENS.bgElevated, alignItems: 'center', gap: 2 },
  dateBtnActive: { backgroundColor: TOKENS.primary, borderColor: TOKENS.primary },
  dateBtnDay: { fontSize: 11, fontFamily: FONTS.semiBold, color: TOKENS.inkSoft, opacity: 0.8 },
  dateBtnNum: { fontSize: 20, fontFamily: FONTS.bold, color: TOKENS.ink },
  dateBtnTextActive: { color: 'white', opacity: 1 },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotBtn: { width: '30%', paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: TOKENS.border, backgroundColor: TOKENS.bgElevated, alignItems: 'center' },
  slotBtnActive: { backgroundColor: TOKENS.primarySoft, borderColor: TOKENS.primary },
  slotBtnText: { fontSize: 14, fontFamily: FONTS.semiBold, color: TOKENS.ink },
  slotBtnTextActive: { color: TOKENS.primaryInk },
  confirmBookBtn: { marginTop: 24 },
  // Confirmed state
  confirmContainer: { flex: 1, backgroundColor: TOKENS.bg },
  confirmBody: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  confirmIcon: { width: 84, height: 84, borderRadius: 42, backgroundColor: TOKENS.sageSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  confirmTitle: { fontSize: 22, fontFamily: FONTS.bold, color: TOKENS.ink },
  confirmDetail: { fontSize: 14, color: TOKENS.inkSoft, fontFamily: FONTS.regular, marginTop: 10 },
  confirmNote: { fontSize: 13, color: TOKENS.inkMuted, fontFamily: FONTS.regular, marginTop: 6 },
  confirmBtn: { marginTop: 24, width: '100%' },
});
