import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import FormularioCompleto from './components/FormularioCompleto';
import ConsultaCEP from './components/ConsultaCEP';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ConsultaCEP />
      <StatusBar style="auto" />
    </View>
  );
}
