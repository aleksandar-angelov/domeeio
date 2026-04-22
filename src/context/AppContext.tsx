import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from '../i18n';

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  votes: Record<string, string>;
  castVote: (pollId: string, optionId: string) => void;
  resetVotes: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('mk');
  const [votes, setVotes] = useState<Record<string, string>>({});

  useEffect(() => {
    AsyncStorage.getItem('domeeio-lang').then(v => { if (v === 'mk' || v === 'en') setLangState(v); });
    AsyncStorage.getItem('domeeio-votes').then(v => { if (v) setVotes(JSON.parse(v)); });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem('domeeio-lang', l);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'mk' ? 'en' : 'mk');
  }, [lang, setLang]);

  const castVote = useCallback((pollId: string, optionId: string) => {
    const next = { ...votes, [pollId]: optionId };
    setVotes(next);
    AsyncStorage.setItem('domeeio-votes', JSON.stringify(next));
  }, [votes]);

  const resetVotes = useCallback(() => {
    setVotes({});
    AsyncStorage.removeItem('domeeio-votes');
  }, []);

  return (
    <AppContext.Provider value={{ lang, setLang, toggleLang, votes, castVote, resetVotes }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
