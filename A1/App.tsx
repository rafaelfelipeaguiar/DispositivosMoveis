import React from 'react';
import { View, SafeAreaView } from 'react-native';
import TextMirror from '../TextMirror';

function App() {
  return (
    <SafeAreaView>
      <View>
        <TextMirror placeholder="Digite algo aqui..." />
      </View>
    </SafeAreaView>
  );
}

export default App;
