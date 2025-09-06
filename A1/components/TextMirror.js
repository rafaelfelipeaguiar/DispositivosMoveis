import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function TextMirror({ placeholder, label = "Você digitou:" }) {
  const [text, setText] = useState('');

  const handleClear = () => {
    setText('');
  };

  return (
    <View style={{
      width: '100%',
      maxWidth: 400,
      alignItems: 'center'
    }}>
      <TextInput
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          fontSize: 16
        }}
      />
      <Text style={{
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
      }}>
        {text.length > 0 ? `${label} ${text}` : 'Nada digitado ainda.'}
      </Text>
      <Button
        title="Limpar"
        onPress={handleClear}
      />
    </View>
  );
}
