export const modules = [
  {
    id: 1,
    title: "Componentes & JSX",
    icon: "🧩",
    color: "#6366F1",
    description:
      "Aprenda a criar componentes reutilizáveis usando JSX, a sintaxe que combina JavaScript e XML para construir interfaces no React Native.",
    challenge:
      "Mude a cor do texto e adicione um novo componente de saudação personalizada!",
  },
  {
    id: 2,
    title: "Estado & Hooks",
    icon: "🎣",
    color: "#EC4899",
    description:
      "Domine useState e useEffect para gerenciar estado e efeitos colaterais. Hooks tornam seus componentes funcionais poderosos e reativos.",
    challenge:
      "Crie um contador que incrementa automaticamente a cada 2 segundos usando useEffect!",
  },
  {
    id: 3,
    title: "Estilos",
    icon: "🎨",
    color: "#10B981",
    description:
      "Estilize seus componentes com StyleSheet, Flexbox e estilos inline. Aprenda a criar layouts responsivos e interfaces atraentes.",
    challenge:
      "Altere as cores do gradiente e adicione uma borda arredondada aos cards!",
  },
  {
    id: 4,
    title: "Navegação",
    icon: "🧭",
    color: "#F59E0B",
    description:
      "Navegue entre telas usando React Navigation. Aprenda a criar stacks, passar parâmetros e gerenciar o fluxo do seu app.",
    challenge:
      'Adicione um botão "Voltar" personalizado e passe seu nome como parâmetro para a próxima tela!',
  },
  {
    id: 5,
    title: "APIs Nativas",
    icon: "📱",
    color: "#8B5CF6",
    description:
      "Interaja com recursos do dispositivo: clipboard e AsyncStorage para armazenamento local. Deixe seu app mais dinâmico e funcional.",
    challenge:
      "Salve uma mensagem no AsyncStorage e copie ela para o clipboard!",
  },
];

export const codeExamples = {
  1: `function Greeting({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Olá, {name}! 👋
      </Text>
    </View>
  );
}

<Greeting name="Maria" />`,

  2: `const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Contador:', count);
}, [count]);

<Button 
  title="+" 
  onPress={() => setCount(count + 1)} 
/>`,

  3: `const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  }
});`,

  4: `const Stack = createNativeStackNavigator();

<Stack.Navigator>
  <Stack.Screen 
    name="Home" 
    component={HomeScreen} 
  />
  <Stack.Screen 
    name="Details" 
    component={DetailsScreen} 
  />
</Stack.Navigator>

navigation.navigate('Details', { id: 1 });`,

  5: `import * as Clipboard from 'expo-clipboard';
await Clipboard.setStringAsync('Texto');
const texto = await Clipboard.getStringAsync();

import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', 'value');
const value = await AsyncStorage.getItem('key');
await AsyncStorage.removeItem('key');`,
};
