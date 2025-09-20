import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import FormularioCompleto from './components/FormularioCompleto';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <FormularioCompleto />
      <StatusBar style="auto" />
    </View>
  );
}
