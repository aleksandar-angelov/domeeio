import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabParamList } from '../types/navigation';
import { TOKENS, FONTS } from '../constants/tokens';
import { useApp } from '../context/AppContext';
import { T } from '../i18n';
import { HomeIcon, CasesIcon, ChatIcon, PollsIcon, DocsIcon } from '../components/Icon';

import { HomeScreen } from '../screens/HomeScreen';
import { CasesScreen } from '../screens/CasesScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { PollsScreen } from '../screens/PollsScreen';
import { DocsScreen } from '../screens/DocsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_HEIGHT = 72;
const TAB_BOTTOM_MARGIN = 18;

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { lang } = useApp();
  const t = T[lang];

  const items = [
    { name: 'Home' as const, label: t.tabs.home, Icon: HomeIcon },
    { name: 'Cases' as const, label: t.tabs.cases, Icon: CasesIcon },
    { name: 'Chat' as const, label: t.tabs.chat, Icon: ChatIcon },
    { name: 'Polls' as const, label: t.tabs.polls, Icon: PollsIcon },
    { name: 'Docs' as const, label: t.tabs.docs, Icon: DocsIcon },
  ];

  return (
    <View style={[styles.wrapper, { bottom: TAB_BOTTOM_MARGIN + insets.bottom }]}>
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,253,249,0.94)' }]} />
        )}
        <View style={styles.inner}>
          {items.map((item, index) => {
            const active = state.index === index;
            const color = active ? TOKENS.primary : TOKENS.inkSoft;
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => navigation.navigate(item.name)}
                activeOpacity={0.7}
                style={styles.tab}
              >
                <item.Icon color={color} size={22} />
                <Text style={[styles.tabLabel, { color, fontFamily: active ? FONTS.bold : FONTS.medium }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cases" component={CasesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Polls" component={PollsScreen} />
      <Tab.Screen name="Docs" component={DocsScreen} />
    </Tab.Navigator>
  );
}

export const TAB_BAR_HEIGHT = TAB_HEIGHT + TAB_BOTTOM_MARGIN;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 12,
    right: 12,
    height: TAB_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: TOKENS.border,
    shadowColor: '#2a241c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10.5,
    letterSpacing: 0.2,
  },
});
