import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import TextMirror from './TextMirror';

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      <TextMirror placeholder="Digite algo aqui..." />
      <StatusBar style="auto" />
    </View>
  );
}
