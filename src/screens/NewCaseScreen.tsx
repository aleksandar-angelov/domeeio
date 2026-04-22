import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { BackHeader } from '../components/BackHeader';
import { FieldLabel, TextInput, TextArea, PrimaryButton } from '../components/FormComponents';
import { CheckIcon, CameraIcon, DropIcon, BoltIcon, ElevatorIcon, WrenchIcon } from '../components/Icon';

type CatId = 'plumbing' | 'electrical' | 'elevator' | 'general';

export function NewCaseScreen() {
  const navigation = useNavigation();
  const { lang } = useApp();
  const t = T[lang];
  const [cat, setCat] = useState<CatId>('plumbing');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cats: { id: CatId; label: string; Icon: React.ComponentType<{ color: string; size: number }>; color: string }[] = [
    { id: 'plumbing', label: lang === 'mk' ? 'Водовод' : 'Plumbing', Icon: DropIcon, color: TOKENS.sky },
    { id: 'electrical', label: lang === 'mk' ? 'Електрика' : 'Electrical', Icon: BoltIcon, color: TOKENS.amber },
    { id: 'elevator', label: lang === 'mk' ? 'Лифт' : 'Elevator', Icon: ElevatorIcon, color: TOKENS.primary },
    { id: 'general', label: lang === 'mk' ? 'Друго' : 'General', Icon: WrenchIcon, color: TOKENS.sage },
  ];

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <CheckIcon color={TOKENS.sageInk} size={36} />
        </View>
        <Text style={styles.successTitle}>{lang === 'mk' ? 'Случајот е пријавен' : 'Case submitted'}</Text>
        <Text style={styles.successDesc}>
          {lang === 'mk'
            ? 'Претседателот ќе ја разгледа пријавата и ќе ја додели на соодветниот сервисер.'
            : 'The president will review and assign it to the right technician.'}
        </Text>
        <PrimaryButton onPress={() => navigation.goBack()} style={styles.successBtn}>
          {lang === 'mk' ? 'Види ги моите случаи' : 'View my cases'}
        </PrimaryButton>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <BackHeader />
      <Text style={styles.screenTitle}>{t.newCase}</Text>

      <View style={styles.body}>
        <FieldLabel>{t.category}</FieldLabel>
        <View style={styles.catGrid}>
          {cats.map(c => {
            const active = cat === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => setCat(c.id)}
                activeOpacity={0.7}
                style={[styles.catBtn, { borderColor: active ? c.color : TOKENS.border, backgroundColor: active ? c.color : TOKENS.bgElevated }]}
              >
                <c.Icon color={active ? '#fff' : c.color} size={18} />
                <Text style={[styles.catLabel, { color: active ? 'white' : TOKENS.ink }]}>{c.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FieldLabel>{lang === 'mk' ? 'Наслов' : 'Title'}</FieldLabel>
        <TextInput value={title} onChangeText={setTitle} placeholder={lang === 'mk' ? 'Краток опис…' : 'Short summary…'} />

        <FieldLabel>{t.location}</FieldLabel>
        <TextInput value={loc} onChangeText={setLoc} placeholder={lang === 'mk' ? 'Пр. ходник, кат 3' : 'e.g. hallway, floor 3'} />

        <FieldLabel>{t.description}</FieldLabel>
        <TextArea value={desc} onChangeText={setDesc} placeholder={lang === 'mk' ? 'Опиши го проблемот…' : 'Describe the problem…'} />

        <TouchableOpacity activeOpacity={0.7} style={styles.photoBtn}>
          <CameraIcon color={TOKENS.inkSoft} size={20} />
          <Text style={styles.photoBtnText}>{t.attachPhoto}</Text>
        </TouchableOpacity>

        <PrimaryButton onPress={() => setSubmitted(true)} style={styles.submitBtn}>
          {t.submit}
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: TOKENS.bg },
  content: { paddingBottom: 60 },
  screenTitle: { fontSize: 28, fontFamily: FONTS.bold, color: TOKENS.ink, letterSpacing: -0.6, paddingHorizontal: 20, marginBottom: 4 },
  body: { paddingHorizontal: 20 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  catBtn: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1.5 },
  catLabel: { fontSize: 14, fontFamily: FONTS.semiBold },
  photoBtn: { marginTop: 16, padding: 14, borderRadius: 14, backgroundColor: TOKENS.bgElevated, borderWidth: 1.5, borderColor: TOKENS.borderStrong, borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  photoBtnText: { fontSize: 14, fontFamily: FONTS.semiBold, color: TOKENS.inkSoft },
  submitBtn: { marginTop: 24 },
  successContainer: { flex: 1, backgroundColor: TOKENS.bg, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successIcon: { width: 76, height: 76, borderRadius: 38, backgroundColor: TOKENS.sageSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle: { fontSize: 22, fontFamily: FONTS.bold, color: TOKENS.ink, textAlign: 'center' },
  successDesc: { fontSize: 14, fontFamily: FONTS.regular, color: TOKENS.inkSoft, textAlign: 'center', lineHeight: 21, marginTop: 12 },
  successBtn: { marginTop: 24, width: '100%' },
});
