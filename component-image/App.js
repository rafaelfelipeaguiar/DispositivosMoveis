import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import ImageComponent from './components/ImageComponent';

export default function App() {
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10
    }}>
      <ImageComponent />
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}
