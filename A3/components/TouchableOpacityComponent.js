import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function TouchableOpacityComponent({ 
  children, 
  onPress, 
  style,
  activeOpacity = 0.7,
  disabled = false,
  ...props 
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchable, style, disabled && styles.disabled]}
      activeOpacity={activeOpacity}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
