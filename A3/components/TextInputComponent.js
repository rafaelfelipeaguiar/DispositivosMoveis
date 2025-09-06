import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function TextInputComponent({ 
  placeholder, 
  value, 
  onChangeText, 
  style,
  multiline = false,
  ...props 
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]}
      multiline={multiline}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
