import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import TextMirror from './TextMirror';

function ExampleApp() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <TextMirror placeholder="Digite algo aqui..." />
          
          <View style={{ height: 30 }} />
          
          <TextMirror 
            placeholder="Seu nome completo" 
            label="Nome informado:"
          />
          
          <View style={{ height: 30 }} />
          
          <TextMirror 
            placeholder="Escreva uma mensagem" 
            label="Sua mensagem é:"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ExampleApp;
