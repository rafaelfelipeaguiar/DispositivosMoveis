import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { modules, codeExamples } from "../data/modules";
import CodeBlock from "../components/CodeBlock";
import ChallengeBox from "../components/ChallengeBox";

const STORAGE_KEY = "@learning_app:message";

export default function Module5Screen({ route }) {
  const module = modules[4];
  const scrollViewRef = React.useRef(null);
  const solutionsRef = React.useRef(null);
  const [message, setMessage] = useState("");
  const [storedMessage, setStoredMessage] = useState("");
  const [clipboardText, setClipboardText] = useState("");

  // Carrega mensagem salva ao montar o componente
  useEffect(() => {
    loadStoredMessage();
  }, []);

  const loadStoredMessage = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setStoredMessage(value);
      }
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  const saveMessage = async () => {
    if (!message.trim()) {
      Alert.alert("Ops!", "Digite uma mensagem primeiro!");
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, message);
      setStoredMessage(message);
      setMessage("");

      Alert.alert("Sucesso! ✅", "Mensagem salva no AsyncStorage");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar a mensagem");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setStoredMessage("");

      Alert.alert("Limpo! 🗑️", "Mensagem removida do AsyncStorage");
    } catch (error) {
      console.error("Erro ao limpar:", error);
    }
  };

  const copyToClipboard = async () => {
    if (!storedMessage) {
      Alert.alert("Ops!", "Nenhuma mensagem para copiar!");
      return;
    }

    try {
      await Clipboard.setStringAsync(storedMessage);

      Alert.alert(
        "Copiado! 📋",
        "Mensagem copiada para a área de transferência"
      );
    } catch (error) {
      console.error("Erro ao copiar:", error);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setClipboardText(text);

      if (text) {
        Alert.alert("Colado! 📋", `Texto: "${text}"`);
      } else {
        Alert.alert("Vazio", "Clipboard está vazio");
      }
    } catch (error) {
      console.error("Erro ao colar:", error);
    }
  };

  React.useEffect(() => {
    if (route.params?.mode === "solutions" && solutionsRef.current) {
      setTimeout(() => {
        solutionsRef.current.measureLayout(scrollViewRef.current, (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
        });
      }, 300);
    }
  }, [route.params?.mode]);

  const showLearning = route.params?.mode !== "solutions";
  const showSolutions = route.params?.mode === "solutions";

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{module.icon}</Text>
        <Text style={styles.title}>{module.title}</Text>
      </View>

      {showLearning && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📖 O que você vai aprender</Text>
            <Text style={styles.description}>{module.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💻 Código</Text>
            <CodeBlock code={codeExamples[5]} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Exemplo Interativo</Text>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                🎓 O que são APIs Nativas?
              </Text>
              <Text style={styles.explanationText}>
                APIs nativas permitem acessar{" "}
                <Text style={styles.highlight}>recursos do dispositivo</Text>{" "}
                como armazenamento, clipboard, câmera, etc. No React Native,
                usamos bibliotecas como{" "}
                <Text style={styles.highlight}>AsyncStorage</Text> (salvar
                dados) e <Text style={styles.highlight}>Clipboard</Text>{" "}
                (copiar/colar).
              </Text>
            </View>

            <View style={styles.apiBox}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 AsyncStorage - Persistir Dados
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>setItem(key, value)</Text> -
                  salva string no dispositivo
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>getItem(key)</Text> -
                  recupera valor salvo
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>removeItem(key)</Text> -
                  remove valor
                </Text>
                <Text style={styles.conceptItem}>
                  • Dados <Text style={styles.highlight}>persistem</Text> mesmo
                  fechando o app!
                </Text>
              </View>

              <Text style={styles.apiTitle}>💾 AsyncStorage</Text>

              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Digite uma mensagem para salvar"
                placeholderTextColor="#9CA3AF"
                multiline
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={saveMessage}
                >
                  <Text style={styles.buttonText}>💾 Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonDanger]}
                  onPress={clearStorage}
                >
                  <Text style={styles.buttonText}>🗑️ Limpar</Text>
                </TouchableOpacity>
              </View>

              {storedMessage ? (
                <View style={styles.storedBox}>
                  <Text style={styles.storedLabel}>Mensagem salva:</Text>
                  <Text style={styles.storedText}>{storedMessage}</Text>
                </View>
              ) : (
                <Text style={styles.emptyText}>
                  Nenhuma mensagem salva ainda
                </Text>
              )}

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Métodos AsyncStorage:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    await AsyncStorage.setItem()
                  </Text>
                  <Text style={styles.elementDesc}>
                    Salva dados - sempre use await (é assíncrono)
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    await AsyncStorage.getItem()
                  </Text>
                  <Text style={styles.elementDesc}>
                    Retorna valor ou null se não existir
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>try/catch</Text>
                  <Text style={styles.elementDesc}>
                    Sempre trate erros em operações assíncronas
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`import AsyncStorage from 
  '@react-native-async-storage/async-storage';

// Salvar dados
const saveMessage = async () => {
  await AsyncStorage.setItem(
    '@app:message', 
    "${message || "sua mensagem"}"
  );
};

// Carregar dados
const loadMessage = async () => {
  const value = await AsyncStorage.getItem('@app:message');
  if (value !== null) {
    setStoredMessage(value);
  }
};

// Remover dados
await AsyncStorage.removeItem('@app:message');`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.apiBox}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 Clipboard - Área de Transferência
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>setStringAsync()</Text> -
                  copia texto para clipboard
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>getStringAsync()</Text> - lê
                  texto do clipboard
                </Text>
                <Text style={styles.conceptItem}>
                  • Permite <Text style={styles.highlight}>compartilhar</Text>{" "}
                  dados entre apps
                </Text>
              </View>

              <Text style={styles.apiTitle}>📋 Clipboard</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSuccess]}
                  onPress={copyToClipboard}
                >
                  <Text style={styles.buttonText}>📋 Copiar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonInfo]}
                  onPress={pasteFromClipboard}
                >
                  <Text style={styles.buttonText}>📄 Colar</Text>
                </TouchableOpacity>
              </View>

              {clipboardText ? (
                <View style={styles.clipboardBox}>
                  <Text style={styles.clipboardLabel}>Clipboard:</Text>
                  <Text style={styles.clipboardText}>{clipboardText}</Text>
                </View>
              ) : null}

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>📚 Métodos Clipboard:</Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    Clipboard.setStringAsync()
                  </Text>
                  <Text style={styles.elementDesc}>
                    Copia texto para área de transferência
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    Clipboard.getStringAsync()
                  </Text>
                  <Text style={styles.elementDesc}>
                    Retorna texto atual do clipboard
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    Alert.alert(título, msg)
                  </Text>
                  <Text style={styles.elementDesc}>
                    Exibe alerta nativo do sistema
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`import * as Clipboard from 'expo-clipboard';

// Copiar para clipboard
const copyToClipboard = async () => {
  await Clipboard.setStringAsync(
    "${storedMessage || "texto para copiar"}"
  );
  Alert.alert('Copiado! 📋');
};

// Colar do clipboard
const pasteFromClipboard = async () => {
  const text = await Clipboard.getStringAsync();
  setClipboardText(text);
};`}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <ChallengeBox challenge={module.challenge} />
        </>
      )}

      {showSolutions && (
        <>
          <View ref={solutionsRef} style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Soluções do Desafio</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.solutionsScroll}
            >
              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>
                  Solução: Salvar no Storage
                </Text>
                <Text style={styles.solutionText}>
                  Use AsyncStorage.setItem() para salvar. É assíncrono, use
                  await!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const salvar = async () => {\n  await AsyncStorage.setItem(\n    'chave',\n    'valor'\n  );\n};`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>
                  Solução: Copiar Mensagem
                </Text>
                <Text style={styles.solutionText}>
                  Use Clipboard.setStringAsync() para copiar texto para área de
                  transferência!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`await Clipboard.setStringAsync(\n  storedMessage\n);\n\nAlert.alert(\n  'Copiado!',\n  'Mensagem copiada'\n);`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Carregar ao Iniciar</Text>
                <Text style={styles.solutionText}>
                  Use useEffect com array vazio [] para carregar dados ao montar
                  o componente!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`useEffect(() => {\n  const load = async () => {\n    const value = await\n      AsyncStorage.getItem('key');\n    setData(value);\n  };\n  load();\n}, []);`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Tratamento de Erros</Text>
                <Text style={styles.solutionText}>
                  Sempre use try/catch em operações assíncronas para capturar
                  erros!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`try {\n  await AsyncStorage.setItem(\n    'key', 'value'\n  );\n  Alert.alert('Sucesso!');\n} catch (error) {\n  console.error(error);\n  Alert.alert('Erro!');\n}`}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Dicas</Text>
            <Text style={styles.tipText}>
              • AsyncStorage é assíncrono (use await)
            </Text>
            <Text style={styles.tipText}>
              • Clipboard permite copiar/colar texto
            </Text>
            <Text style={styles.tipText}>
              • Sempre trate erros com try/catch
            </Text>
            <Text style={styles.tipText}>
              • Use localStorage no web, AsyncStorage no mobile
            </Text>
          </View>

          <View style={styles.spacing} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F23",
  },
  header: {
    backgroundColor: "#8B5CF6",
    padding: 28,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    letterSpacing: -0.5,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 16,
    color: "#94A3B8",
    lineHeight: 26,
  },
  explanationBox: {
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.25)",
  },
  explanationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#A78BFA",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: "#DDD6FE",
    lineHeight: 24,
  },
  highlight: {
    color: "#8B5CF6",
    fontWeight: "700",
  },
  conceptBox: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  conceptTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#34D399",
    marginBottom: 10,
  },
  conceptItem: {
    fontSize: 14,
    color: "#A7F3D0",
    lineHeight: 22,
    marginVertical: 3,
  },
  elementsBox: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.25)",
  },
  elementsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 12,
  },
  elementItem: {
    marginVertical: 6,
  },
  elementName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FDE68A",
    fontFamily: "monospace",
  },
  elementDesc: {
    fontSize: 13,
    color: "#FCD34D",
    marginTop: 2,
  },
  apiBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  apiTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#A78BFA",
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#F8FAFC",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
    marginBottom: 16,
    minHeight: 70,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: "#8B5CF6",
  },
  buttonDanger: {
    backgroundColor: "#EF4444",
  },
  buttonSuccess: {
    backgroundColor: "#10B981",
  },
  buttonInfo: {
    backgroundColor: "#3B82F6",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  storedBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  storedLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#34D399",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  storedText: {
    fontSize: 15,
    color: "#6EE7B7",
    lineHeight: 22,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    fontStyle: "italic",
  },
  clipboardBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  clipboardLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#60A5FA",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  clipboardText: {
    fontSize: 15,
    color: "#93C5FD",
    lineHeight: 22,
  },
  exampleCode: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  exampleCodeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A78BFA",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  solutionsScroll: {
    marginTop: 16,
  },
  solutionCard: {
    width: 320,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 24,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#8B5CF6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  solutionText: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 24,
    marginBottom: 16,
  },
  codeSnippet: {
    backgroundColor: "#0D1117",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.2)",
  },
  codeSnippetText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#A78BFA",
    lineHeight: 20,
  },
  tips: {
    margin: 24,
    marginTop: 0,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.2)",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A78BFA",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: "#C4B5FD",
    lineHeight: 24,
    marginVertical: 4,
  },
  spacing: {
    height: 24,
  },
});
