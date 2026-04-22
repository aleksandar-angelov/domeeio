import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { TOKENS } from '../constants/tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, padding = 16 }) => {
  const inner = [styles.card, { padding }, style];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={inner}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={inner}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: TOKENS.bgElevated,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: TOKENS.border,
    shadowColor: '#2a241c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
