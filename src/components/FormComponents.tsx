import React from 'react';
import {
  View, Text, TextInput as RNTextInput, TouchableOpacity, StyleSheet, ViewStyle,
} from 'react-native';
import { TOKENS, FONTS } from '../constants/tokens';

export const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChangeText, placeholder }) => (
  <RNTextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={TOKENS.inkMuted}
    style={styles.input}
  />
);

interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({ value, onChangeText, placeholder, rows = 4 }) => (
  <RNTextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={TOKENS.inkMuted}
    multiline
    numberOfLines={rows}
    textAlignVertical="top"
    style={[styles.input, styles.textArea]}
  />
);

interface PrimaryButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onPress, children, disabled, style }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
    style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled, style]}
  >
    <Text style={styles.primaryBtnText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: TOKENS.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: TOKENS.bgElevated,
    borderWidth: 1.5,
    borderColor: TOKENS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: TOKENS.ink,
  },
  textArea: {
    height: 100,
  },
  primaryBtn: {
    backgroundColor: TOKENS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: TOKENS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: FONTS.bold,
  },
});
