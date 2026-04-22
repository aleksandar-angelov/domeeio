import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { TabNavigator } from './TabNavigator';

import { CaseDetailScreen } from '../screens/CaseDetailScreen';
import { NewCaseScreen } from '../screens/NewCaseScreen';
import { PollDetailScreen } from '../screens/PollDetailScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { DirectoryScreen } from '../screens/DirectoryScreen';
import { CraftsmenScreen } from '../screens/CraftsmenScreen';
import { CraftsmanDetailScreen } from '../screens/CraftsmanDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="CaseDetail" component={CaseDetailScreen} />
      <Stack.Screen name="NewCase" component={NewCaseScreen} />
      <Stack.Screen name="PollDetail" component={PollDetailScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Directory" component={DirectoryScreen} />
      <Stack.Screen name="Craftsmen" component={CraftsmenScreen} />
      <Stack.Screen name="CraftsmanDetail" component={CraftsmanDetailScreen} />
    </Stack.Navigator>
  );
}
