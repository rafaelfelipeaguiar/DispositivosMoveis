import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

export default function ModalComponent({ 
  visible, 
  onRequestClose, 
  children,
  animationType = 'slide',
  transparent = true,
  ...props 
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      transparent={transparent}
      {...props}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
});
