import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS } from '../constants/tokens';
import { Resident } from '../data';

interface AvatarProps {
  user?: Pick<Resident, 'avatar' | 'color'> | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ user, size = 36 }) => {
  const bg = user?.color || '#9a8d7c';
  const initials = user?.avatar || '?';
  const fontSize = Math.round(size * 0.38);

  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.text, { fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  text: {
    color: 'white',
    fontFamily: FONTS.semiBold,
    letterSpacing: 0.2,
  },
});
