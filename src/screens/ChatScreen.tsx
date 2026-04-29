import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { DATA, ChatMessage } from '../data';
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { ScreenHeader } from '../components/ScreenHeader';
import { SendIcon } from '../components/Icon';
import { TAB_BAR_HEIGHT } from '../navigation/TabNavigator';

export function ChatScreen() {
  const { lang } = useApp();
  const t = T[lang];
  const { CHAT, RESIDENTS } = DATA;
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<ChatMessage[]>(CHAT);
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMsgs(prev => [...prev, { id: 'm' + Date.now(), user: 'me', text: { mk: input, en: input }, time }]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={0}>
      <View style={styles.container}>
        <ScreenHeader title={t.generalChat} subtitle={`400 ${lang === 'mk' ? 'членови · 12 онлајн' : 'members · 12 online'}`} />

        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={{ padding: 16, paddingBottom: 8, gap: 4 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          <Text style={styles.dateSep}>{lang === 'mk' ? 'ДЕНЕС' : 'TODAY'}</Text>
          {msgs.map((m, i) => {
            const u = RESIDENTS.find(r => r.id === m.user);
            const isMe = m.user === 'me';
            const prev = msgs[i - 1];
            const showAvatar = !prev || prev.user !== m.user;
            return (
              <View key={m.id} style={[styles.msgRow, isMe && styles.msgRowMe, showAvatar && styles.msgRowGroupStart]}>
                <View style={styles.avatarSlot}>
                  {showAvatar && !isMe && <Avatar user={u} size={28} />}
                </View>
                <View style={styles.msgContent}>
                  {showAvatar && !isMe && (
                    <View style={styles.senderRow}>
                      <Text style={styles.senderName}>{lang === 'mk' ? u?.name : u?.en}</Text>
                      {m.badge === 'president' && <Chip tone="primary" size="xs">{t.president}</Chip>}
                    </View>
                  )}
                  <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                    <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{m.text[lang]}</Text>
                  </View>
                  <Text style={[styles.msgTime, isMe && styles.msgTimeMe]}>{m.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Composer */}
        <View style={[styles.composer, { marginBottom: TAB_BAR_HEIGHT + insets.bottom }]}>
          <View style={styles.inputWrap}>
            <TextInput
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              placeholder={t.message}
              placeholderTextColor={TOKENS.inkMuted}
              style={styles.input}
              returnKeyType="send"
            />
          </View>
          <TouchableOpacity onPress={send} activeOpacity={0.8} style={[styles.sendBtn, { backgroundColor: input.trim() ? TOKENS.primary : TOKENS.bgSubtle }]}>
            <SendIcon color={input.trim() ? '#fff' : TOKENS.inkMuted} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: TOKENS.bg },
  messages: { flex: 1 },
  dateSep: { textAlign: 'center', fontSize: 11, fontFamily: FONTS.semiBold, color: TOKENS.inkMuted, letterSpacing: 0.5, marginBottom: 16 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  msgRowMe: { flexDirection: 'row-reverse' },
  msgRowGroupStart: { marginTop: 8 },
  avatarSlot: { width: 28, flexShrink: 0 },
  msgContent: { maxWidth: '72%' },
  senderRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3, marginLeft: 12 },
  senderName: { fontSize: 11, color: TOKENS.inkMuted, fontFamily: FONTS.semiBold },
  bubble: { padding: 9, paddingHorizontal: 13, borderRadius: 18 },
  bubbleMe: { backgroundColor: TOKENS.primary, borderBottomRightRadius: 6 },
  bubbleOther: { backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border, borderBottomLeftRadius: 6 },
  bubbleText: { fontSize: 14.5, lineHeight: 20, color: TOKENS.ink, fontFamily: FONTS.regular },
  bubbleTextMe: { color: 'white' },
  msgTime: { fontSize: 10, color: TOKENS.inkMuted, marginTop: 2, marginLeft: 12, fontFamily: FONTS.regular },
  msgTimeMe: { textAlign: 'right', marginLeft: 0, marginRight: 12 },
  composer: { borderTopWidth: 1, borderTopColor: TOKENS.border, backgroundColor: TOKENS.bg, paddingHorizontal: 14, paddingTop: 10, flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  inputWrap: { flex: 1, backgroundColor: TOKENS.bgElevated, borderWidth: 1, borderColor: TOKENS.border, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 10 },
  input: { fontSize: 15, color: TOKENS.ink, fontFamily: FONTS.regular },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
