import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface TextMirrorProps {
  placeholder?: string;
  label?: string;
}

const TextMirror: React.FC<TextMirrorProps> = ({ placeholder, label = "Você digitou:" }) => {
  const [text, setText] = useState<string>('');

  const handleClear = () => {
    setText('');
  };

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
      />
      <Text>
        {text.length > 0 ? `${label} ${text}` : 'Nada digitado ainda.'}
      </Text>
      <Button
        title="Limpar"
        onPress={handleClear}
      />
    </View>
  );
};

export default TextMirror;
