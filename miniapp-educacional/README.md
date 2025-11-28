# 🚀 Aprenda React Native - Miniapp Educativo

Um aplicativo interativo e educativo para ensinar iniciantes a usar React Native de forma simples, visual e prática.

## 📱 Sobre o App

Este miniapp contém **5 módulos** completos de ensino, cada um com:

- ✅ Explicação clara e concisa
- ✅ Código de exemplo em destaque
- ✅ Demonstração interativa funcional
- ✅ Mini desafio prático
- ✅ Soluções explicadas

---

## 🎯 Módulos de Ensino

### 1. 🧩 Componentes & JSX

**O que é:** Componentes são os blocos de construção fundamentais do React Native. São como peças de LEGO que você combina para criar sua interface. JSX é a sintaxe que mistura JavaScript com elementos visuais.

**O que você aprende:**

- `View` - Container básico (equivalente a uma `<div>` no HTML)
- `Text` - Exibe texto na tela (obrigatório para qualquer texto)
- `TextInput` - Campo de entrada para capturar texto do usuário
- `TouchableOpacity` - Área tocável com feedback de opacidade
- `Props` - Dados passados de um componente pai para filho
- `Composição` - Combinar componentes menores para criar maiores
- `map()` - Renderizar listas de componentes dinamicamente

**Exemplo prático:** Componente de saudação personalizada com cor dinâmica

**Desafio:** Mude a cor do texto e adicione um novo componente de saudação personalizada!

---

### 2. 🎣 Estado & Hooks

**O que é:** Hooks são funções especiais que permitem usar recursos do React em componentes funcionais. `useState` gerencia dados que mudam ao longo do tempo, e `useEffect` executa ações quando algo acontece (efeitos colaterais).

**O que você aprende:**

- `useState(valorInicial)` - Cria uma variável de estado e função para atualizá-la
- `setEstado(novoValor)` - Atualiza o valor do estado e re-renderiza o componente
- `useEffect(callback, [deps])` - Executa código quando dependências mudam
- `setInterval / clearInterval` - Timer para executar código repetidamente
- `prev => prev + 1` - Função que recebe valor anterior (evita bugs de estado)
- `Cleanup (return)` - Limpa recursos quando componente desmonta
- `Array de dependências []` - Controla quando o efeito re-executa

**Exemplo prático:** Contador manual, contador automático e lista de tarefas

**Desafio:** Crie um contador que incrementa automaticamente a cada 2 segundos usando useEffect!

---

### 3. 🎨 Estilos & Flexbox

**O que é:** StyleSheet é a forma otimizada de criar estilos no React Native, similar ao CSS. Flexbox é o sistema de layout para organizar elementos na tela de forma responsiva.

**O que você aprende:**

- `StyleSheet.create()` - Cria estilos otimizados para performance
- `flexDirection: "row" | "column"` - Define direção dos elementos (horizontal ou vertical)
- `justifyContent` - Distribui espaço no eixo principal
- `alignItems` - Alinha elementos no eixo perpendicular
- `flex: 1` - Elemento ocupa todo espaço disponível
- `gap` - Espaçamento entre elementos
- `borderRadius` - Arredondamento das bordas
- `shadowColor / elevation` - Sombras (iOS / Android)
- `Animated.View` - View com suporte a animações
- `style={[style1, style2]}` - Combina múltiplos estilos

**Exemplo prático:** Card com temas dinâmicos, layout Flexbox e controles de estilo

**Desafio:** Altere as cores do gradiente e adicione uma borda arredondada aos cards!

---

### 4. 🧭 Navegação

**O que é:** Navegação permite transitar entre telas do app. Funciona como uma pilha de cartas: cada tela nova é colocada no topo, e voltar remove a tela do topo revelando a anterior.

**O que você aprende:**

- `navigation.navigate("Tela")` - Vai para tela (reutiliza se já existir na pilha)
- `navigation.push("Tela")` - Sempre adiciona nova tela na pilha
- `navigation.goBack()` - Volta para a tela anterior
- `navigation.replace("Tela")` - Substitui a tela atual (sem voltar)
- `route.params` - Recebe dados passados na navegação
- `Passagem de parâmetros` - Enviar dados entre telas
- `Stack Navigator` - Navegação em pilha (mais comum)

**Exemplo prático:** Navegação com parâmetros e visualização da pilha

**Desafio:** Adicione um botão "Voltar" personalizado e passe seu nome como parâmetro!

---

### 5. 📱 APIs Nativas

**O que é:** APIs nativas permitem acessar recursos do dispositivo como armazenamento, clipboard, câmera, etc. No React Native, usamos bibliotecas como AsyncStorage (salvar dados) e Clipboard (copiar/colar).

**O que você aprende:**

- `AsyncStorage.setItem(key, value)` - Salva string no dispositivo (persiste após fechar app)
- `AsyncStorage.getItem(key)` - Recupera valor salvo (retorna null se não existir)
- `AsyncStorage.removeItem(key)` - Remove valor do armazenamento
- `Clipboard.setStringAsync(text)` - Copia texto para área de transferência
- `Clipboard.getStringAsync()` - Lê texto do clipboard
- `Alert.alert(titulo, msg)` - Exibe alerta nativo do sistema
- `try/catch` - Tratamento de erros em operações assíncronas
- `async/await` - Sintaxe para código assíncrono

**Exemplo prático:** Salvar e recuperar mensagens + copiar/colar

**Desafio:** Salve uma mensagem no AsyncStorage e copie para o clipboard!

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js 16+** instalado ([baixar aqui](https://nodejs.org/))
- **npm** ou **yarn**
- **Expo Go** app no celular (para testar no dispositivo físico)

### Instalação

```bash
# 1. Navegue até a pasta do projeto
cd c:\Dev\app-react-native

# 2. Instale as dependências
npm install
```

---

### 🌐 Rodar na WEB (Navegador)

A forma mais rápida de testar o app:

```bash
# Opção 1: Iniciar direto na web
npm run web

# Opção 2: Iniciar o Expo e depois pressionar 'w'
npm start
# Quando aparecer o menu, pressione: w
```

O app abrirá automaticamente em `http://localhost:8081`

---

### 📱 Rodar no CELULAR (Expo Go)

**Passo 1:** Instale o app **Expo Go** no seu celular:

- [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

**Passo 2:** Inicie o projeto:

```bash
npm start
```

**Passo 3:** Escaneie o QR Code:

- **Android:** Abra o Expo Go e escaneie o QR code
- **iOS:** Use a câmera do iPhone para escanear o QR code

> ⚠️ **Importante:** Celular e computador devem estar na mesma rede Wi-Fi!

---

### 🤖 Rodar no Emulador ANDROID

**Pré-requisito:** Android Studio instalado com emulador configurado

```bash
# Inicie o emulador Android primeiro, depois:
npm run android

# Ou pressione 'a' após npm start
```

---

### 🍎 Rodar no Simulador iOS (apenas Mac)

**Pré-requisito:** Xcode instalado

```bash
npm run ios

# Ou pressione 'i' após npm start
```

---

## 🏗️ Estrutura do Projeto

```
app-react-native/
├── App.js                      # Ponto de entrada do app
├── app.json                    # Configurações do Expo
├── package.json                # Dependências
├── navigation/
│   └── AppNavigator.js         # Configuração de navegação
├── screens/
│   ├── OnboardingScreen.js     # Tela de apresentação inicial
│   ├── HomeScreen.js           # Tela inicial com menu
│   ├── Module1Screen.js        # Componentes & JSX
│   ├── Module2Screen.js        # Estado & Hooks
│   ├── Module3Screen.js        # Estilos & Flexbox
│   ├── Module4Screen.js        # Navegação
│   └── Module5Screen.js        # APIs Nativas
├── components/
│   ├── ModuleCard.js           # Card de módulo
│   ├── CodeBlock.js            # Exibição de código
│   └── ChallengeBox.js         # Caixa de desafio
├── styles/
│   └── theme.js                # Tema visual do app
└── data/
    └── modules.js              # Dados dos módulos
```

## 🛠️ Tecnologias Utilizadas

| Tecnologia       | Versão  | Descrição                     |
| ---------------- | ------- | ----------------------------- |
| React Native     | 0.72.6  | Framework mobile              |
| Expo             | ~49.0.0 | Plataforma de desenvolvimento |
| React Navigation | 6.x     | Navegação entre telas         |
| AsyncStorage     | 1.18.2  | Armazenamento local           |
| Expo Clipboard   | 4.3.1   | Área de transferência         |

---

## 🎮 Como Usar o App

1. **Apresentação:** Veja os slides de introdução ao iniciar
2. **Tela Inicial:** Escolha entre modo "Aprender" ou "Soluções"
3. **Escolha um Módulo:** Toque em qualquer card para acessar
4. **Leia a Explicação:** Entenda o conceito com as caixas coloridas
5. **Veja o Código:** Código real abaixo de cada exemplo
6. **Interaja:** Use os controles interativos
7. **Complete o Desafio:** Pratique o que aprendeu

---

## 🐛 Solução de Problemas

### Erro de dependências

```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules; npm install

# Mac/Linux
rm -rf node_modules && npm install
```

### Limpar cache do Expo

```bash
npx expo start -c
```

### Porta 8081 em uso

```bash
# Matar processo na porta (Windows)
npx kill-port 8081

# Ou usar outra porta
npx expo start --port 8082
```

### Erro de rede no celular

- Verifique se celular e PC estão na mesma rede Wi-Fi
- Desative o firewall temporariamente
- Use `npx expo start --tunnel` para conexão via internet

---

## 📚 Resumo dos Conceitos por Módulo

| Módulo         | Conceitos Principais                                      |
| -------------- | --------------------------------------------------------- |
| 1. Componentes | View, Text, TextInput, TouchableOpacity, Props, map()     |
| 2. Hooks       | useState, useEffect, setInterval, cleanup, dependências   |
| 3. Estilos     | StyleSheet, Flexbox, Animated, sombras, estilos dinâmicos |
| 4. Navegação   | navigate, push, goBack, route.params, Stack               |
| 5. APIs        | AsyncStorage, Clipboard, Alert, async/await, try/catch    |

---

## 🚀 Próximos Passos

Depois de completar todos os módulos, você pode:

1. 🏗️ **Criar seu próprio app** do zero
2. 📦 **Adicionar novos módulos** ao app de aprendizado
3. 📑 **Explorar Tab Navigator** (navegação por abas)
4. 🌐 **Aprender Context API** (estado global)
5. 🔗 **Integrar APIs externas** (fetch, axios)
6. 🚀 **Publicar seu app** na Play Store ou App Store

---

## 📖 Recursos Adicionais

- 📚 [Documentação React Native](https://reactnative.dev/)
- 📱 [Documentação Expo](https://docs.expo.dev/)
- 🧭 [React Navigation](https://reactnavigation.org/)
- 🎣 [React Hooks](https://react.dev/reference/react)
- 🎨 [Flexbox Guide](https://reactnative.dev/docs/flexbox)

---

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

---

<div align="center">

**🎉 Divirta-se aprendendo React Native!**

💡 _Complete os desafios de cada módulo para fixar o aprendizado!_

</div>
