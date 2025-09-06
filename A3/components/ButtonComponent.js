import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TouchableOpacityComponent from './TouchableOpacityComponent';

export default function ButtonComponent({ 
  title, 
  onPress, 
  style,
  textStyle,
  variant = 'primary',
  disabled = false,
  ...props 
}) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      case 'success':
        return styles.success;
      default:
        return styles.primary;
    }
  };

  const getTextVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'danger':
        return styles.dangerText;
      case 'success':
        return styles.successText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacityComponent
      onPress={onPress}
      style={[styles.button, getVariantStyle(), style]}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, getTextVariantStyle(), textStyle]}>
        {title}
      </Text>
    </TouchableOpacityComponent>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  primaryText: {
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryText: {
    color: '#333',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  dangerText: {
    color: '#fff',
  },
  success: {
    backgroundColor: '#34C759',
  },
  successText: {
    color: '#fff',
  },
});
