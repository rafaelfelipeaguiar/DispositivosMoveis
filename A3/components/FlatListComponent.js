import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function FlatListComponent({ 
  data, 
  renderItem, 
  keyExtractor,
  style,
  showsVerticalScrollIndicator = false,
  ...props 
}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[styles.list, style]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
  },
});
