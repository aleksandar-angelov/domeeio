import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA } from '../data';
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { Card } from '../components/Card';
import { BackHeader } from '../components/BackHeader';
import { ScreenHeader } from '../components/ScreenHeader';
import { ChatIcon } from '../components/Icon';

export function DirectoryScreen() {
  const { lang } = useApp();
  const t = T[lang];
  const { RESIDENTS } = DATA;
  const others = RESIDENTS.filter(r => r.id !== 'me');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BackHeader />
      <ScreenHeader title={t.directory} subtitle={`400 ${lang === 'mk' ? 'станови · 12 ката' : 'units · 12 floors'}`} />
      <View style={styles.list}>
        {others.map(r => (
          <Card key={r.id} padding={12}>
            <View style={styles.row}>
              <Avatar user={r} size={42} />
              <View style={styles.body}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{lang === 'mk' ? r.name : r.en}</Text>
                  {r.role === 'president' && <Chip tone="primary" size="xs">{t.president}</Chip>}
                </View>
                <Text style={styles.info}>{t.unit} {r.unit} · {t.floor} {r.floor}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.chatBtn}>
                <ChatIcon color={TOKENS.inkSoft} size={20} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 40 },
  list: { paddingHorizontal: 20, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  body: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 14.5, fontFamily: FONTS.semiBold, color: TOKENS.ink },
  info: { fontSize: 12.5, color: TOKENS.inkSoft, fontFamily: FONTS.regular, marginTop: 2 },
  chatBtn: { padding: 8, borderRadius: 10, backgroundColor: TOKENS.bgSubtle },
});
