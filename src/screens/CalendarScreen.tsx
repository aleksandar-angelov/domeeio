import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Card } from '../components/Card';
import { BackHeader } from '../components/BackHeader';
import { ClockIcon } from '../components/Icon';

const EVENT_DATES: Record<number, string> = { 23: '#c97a5f', 25: '#7a9a6e', 27: '#b88a4a', 29: '#6e8ba0' };

export function CalendarScreen() {
  const { lang } = useApp();
  const t = T[lang];
  const { EVENTS } = DATA;
  const [selDate, setSelDate] = useState(23);

  const monthName = lang === 'mk' ? 'Април 2026' : 'April 2026';
  const weekdays = lang === 'mk' ? ['П', 'В', 'С', 'Ч', 'П', 'С', 'Н'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // April 1 2026 = Wednesday → 2 padding days
  const days: (number | null)[] = [null, null, ...Array.from({ length: 30 }, (_, i) => i + 1)];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader />
      <Text style={styles.screenTitle}>{t.tabs.calendar}</Text>

      <View style={styles.body}>
        <Card padding={18}>
          {/* Month header */}
          <View style={styles.monthRow}>
            <Text style={styles.monthName}>{monthName}</Text>
            <View style={styles.navBtns}>
              <TouchableOpacity activeOpacity={0.7} style={styles.navBtn}><Text style={styles.navBtnText}>‹</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.navBtn}><Text style={styles.navBtnText}>›</Text></TouchableOpacity>
            </View>
          </View>

          {/* Weekday labels */}
          <View style={styles.weekdayRow}>
            {weekdays.map((w, i) => (
              <View key={i} style={styles.weekdayCell}>
                <Text style={styles.weekdayText}>{w}</Text>
              </View>
            ))}
          </View>

          {/* Day grid */}
          <View style={styles.dayGrid}>
            {days.map((d, i) => {
              if (d === null) return <View key={i} style={styles.dayCellEmpty} />;
              const evtColor = EVENT_DATES[d];
              const isSel = d === selDate;
              const isToday = d === 22;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelDate(d)}
                  activeOpacity={0.7}
                  style={[styles.dayCell, isSel && styles.dayCellSelected, isToday && !isSel && styles.dayCellToday]}
                >
                  <Text style={[styles.dayNum, isSel && styles.dayNumSelected, (isToday && !isSel) && styles.dayNumToday]}>{d}</Text>
                  {evtColor && <View style={[styles.evtDot, { backgroundColor: isSel ? 'white' : evtColor }]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <Text style={styles.eventsLabel}>{lang === 'mk' ? 'НАСТАНИ ВО ОВОЈ МЕСЕЦ' : 'EVENTS THIS MONTH'}</Text>

        <View style={styles.eventsList}>
          {EVENTS.map(e => (
            <Card key={e.id} padding={0}>
              <View style={styles.eventRow}>
                <View style={[styles.eventDateBox, { backgroundColor: e.color }]}>
                  <Text style={styles.eventDay}>{e.day}</Text>
                  <Text style={styles.eventNum}>{e.date}</Text>
                </View>
                <View style={styles.eventBody}>
                  <Text style={styles.eventTitle}>{e.title[lang]}</Text>
                  <View style={styles.eventTime}>
                    <ClockIcon color={TOKENS.inkSoft} size={12} />
                    <Text style={styles.eventTimeText}>{e.time}</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 40 },
  screenTitle: { fontSize: 28, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.6, paddingHorizontal: 20, marginBottom: 4 },
  body: { paddingHorizontal: 20 },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  monthName: { fontSize: 17, fontFamily: FONTS.bold, color: TOKENS.ink },
  navBtns: { flexDirection: 'row', gap: 4 },
  navBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: TOKENS.bgSubtle, alignItems: 'center', justifyContent: 'center' },
  navBtnText: { fontSize: 16, fontFamily: FONTS.semiBold, color: TOKENS.inkSoft },
  weekdayRow: { flexDirection: 'row', marginBottom: 6 },
  weekdayCell: { flex: 1, alignItems: 'center' },
  weekdayText: { fontSize: 11, fontFamily: FONTS.semiBold, color: TOKENS.inkMuted },
  dayGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCellEmpty: { width: `${100 / 7}%` as any, aspectRatio: 1 },
  dayCell: { width: `${100 / 7}%` as any, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  dayCellSelected: { backgroundColor: TOKENS.primary },
  dayCellToday: { backgroundColor: TOKENS.primarySoft },
  dayNum: { fontSize: 14, fontFamily: FONTS.medium, color: TOKENS.ink },
  dayNumSelected: { color: 'white', fontFamily: FONTS.bold },
  dayNumToday: { fontFamily: FONTS.bold },
  evtDot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
  eventsLabel: { fontSize: 13, fontFamily: FONTS.bold, color: TOKENS.inkSoft, letterSpacing: 0.8, marginTop: 22, marginBottom: 10 },
  eventsList: { gap: 10 },
  eventRow: { flexDirection: 'row', alignItems: 'stretch' },
  eventDateBox: { width: 60, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 18, borderBottomLeftRadius: 18, paddingVertical: 12 },
  eventDay: { fontSize: 10, fontFamily: FONTS.bold, color: 'white', textTransform: 'uppercase', opacity: 0.9 },
  eventNum: { fontSize: 22, fontFamily: FONTS.bold, color: 'white', lineHeight: 26 },
  eventBody: { flex: 1, padding: 12, paddingHorizontal: 14 },
  eventTitle: { fontSize: 15, fontFamily: FONTS.semiBold, color: TOKENS.ink, lineHeight: 20 },
  eventTime: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  eventTimeText: { fontSize: 12.5, color: TOKENS.inkSoft, fontFamily: FONTS.medium },
});
