import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { modules, codeExamples } from "../data/modules";
import CodeBlock from "../components/CodeBlock";
import ChallengeBox from "../components/ChallengeBox";

export default function Module4Screen({ navigation, route }) {
  const module = modules[3];
  const [userName, setUserName] = useState("");
  const [visitCount, setVisitCount] = useState(route.params?.visitCount || 0);
  const scrollViewRef = React.useRef(null);
  const solutionsRef = React.useRef(null);

  // Rola automaticamente para soluções se mode === 'solutions'
  React.useEffect(() => {
    if (route.params?.mode === "solutions" && solutionsRef.current) {
      setTimeout(() => {
        solutionsRef.current.measureLayout(scrollViewRef.current, (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
        });
      }, 300);
    }
  }, [route.params?.mode]);

  // Simula navegação para uma tela de detalhes
  const navigateToDetails = () => {
    navigation.push("Module4", {
      userName: userName || "Visitante",
      visitCount: visitCount + 1,
      from: "Module4",
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

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
            <CodeBlock code={codeExamples[4]} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Exemplo Interativo</Text>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>🎓 O que é Navegação?</Text>
              <Text style={styles.explanationText}>
                Navegação permite{" "}
                <Text style={styles.highlight}>transitar entre telas</Text> do
                app. Funciona como uma{" "}
                <Text style={styles.highlight}>pilha de cartas</Text>: cada tela
                nova é colocada no topo, e voltar remove a tela do topo
                revelando a anterior.
              </Text>
            </View>

            <View style={styles.navigationBox}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 Neste exemplo você aprende:
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>navigation.push()</Text> -
                  adiciona tela na pilha
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>navigation.goBack()</Text> -
                  volta para tela anterior
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>route.params</Text> - recebe
                  dados da navegação
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>📦 Parâmetros Recebidos:</Text>
                {route.params?.userName && (
                  <Text style={styles.infoText}>
                    👤 Nome: {route.params.userName}
                  </Text>
                )}
                <Text style={styles.infoText}>🔢 Visitas: {visitCount}</Text>
                {route.params?.from && (
                  <Text style={styles.infoText}>
                    🔙 Origem: {route.params.from}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Digite seu nome:</Text>
                <TextInput
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Seu nome aqui"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <TouchableOpacity
                style={[styles.navButton, styles.navButtonPrimary]}
                onPress={navigateToDetails}
              >
                <Text style={styles.navButtonText}>
                  ➡️ Navegar (push) com Parâmetros
                </Text>
              </TouchableOpacity>

              {visitCount > 0 && (
                <TouchableOpacity
                  style={[styles.navButton, styles.navButtonSecondary]}
                  onPress={goBack}
                >
                  <Text style={styles.navButtonText}>⬅️ Voltar (goBack)</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.navButton, styles.navButtonTertiary]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.navButtonText}>
                  🏠 Ir para Home (navigate)
                </Text>
              </TouchableOpacity>

              <View style={styles.stackInfo}>
                <Text style={styles.stackTitle}>📚 Stack de Navegação</Text>
                <Text style={styles.stackText}>
                  Profundidade atual: {visitCount + 1} tela(s)
                </Text>
                <Text style={styles.stackHint}>
                  Use push() para adicionar à pilha ou navigate() para navegar
                </Text>
              </View>

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Métodos de Navegação:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    navigation.navigate("Tela")
                  </Text>
                  <Text style={styles.elementDesc}>
                    Vai para tela (reutiliza se já existir na pilha)
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    navigation.push("Tela")
                  </Text>
                  <Text style={styles.elementDesc}>
                    Sempre adiciona nova tela na pilha
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>navigation.goBack()</Text>
                  <Text style={styles.elementDesc}>
                    Volta para a tela anterior na pilha
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`// Navegar com parâmetros
navigation.push("Details", {
  userName: "${userName || "Visitante"}",
  visitCount: ${visitCount + 1}
});

// Voltar para tela anterior
navigation.goBack();

// Acessar parâmetros recebidos
const { userName, visitCount } = route.params;`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.navigationBox, { marginTop: 16 }]}>
              <Text style={styles.navTitle}>🧭 Navegue entre módulos:</Text>

              <View style={styles.moduleGrid}>
                <TouchableOpacity
                  style={[styles.moduleButton, { backgroundColor: "#6366F1" }]}
                  onPress={() => navigation.navigate("Module1")}
                >
                  <Text style={styles.moduleEmoji}>🧩</Text>
                  <Text style={styles.moduleButtonText}>Componentes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.moduleButton, { backgroundColor: "#EC4899" }]}
                  onPress={() => navigation.navigate("Module2")}
                >
                  <Text style={styles.moduleEmoji}>🎣</Text>
                  <Text style={styles.moduleButtonText}>Hooks</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.moduleButton, { backgroundColor: "#10B981" }]}
                  onPress={() => navigation.navigate("Module3")}
                >
                  <Text style={styles.moduleEmoji}>🎨</Text>
                  <Text style={styles.moduleButtonText}>Estilos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.moduleButton, { backgroundColor: "#8B5CF6" }]}
                  onPress={() => navigation.navigate("Module5")}
                >
                  <Text style={styles.moduleEmoji}>📱</Text>
                  <Text style={styles.moduleButtonText}>APIs</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`// Navegar para outro módulo
navigation.navigate("Module1");
navigation.navigate("Module2");

// Com parâmetros
navigation.navigate("Module3", {
  mode: "learning"
});`}
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
                <Text style={styles.solutionTitle}>Solução: Botão Voltar</Text>
                <Text style={styles.solutionText}>
                  Use navigation.goBack() para voltar à tela anterior. Simples e
                  eficaz!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`<TouchableOpacity\n  onPress={() => \n    navigation.goBack()\n  }\n>\n  <Text>⬅️ Voltar</Text>\n</TouchableOpacity>`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>
                  Solução: Passar Parâmetros
                </Text>
                <Text style={styles.solutionText}>
                  Use o segundo argumento de navigate() para passar dados entre
                  telas!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`navigation.navigate('Tela', {\n  nome: userName,\n  id: 123\n});\n\n// Receber:\nroute.params.nome`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>push() vs navigate()</Text>
                <Text style={styles.solutionText}>
                  push() sempre adiciona nova tela na pilha. navigate()
                  reutiliza se já existir!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`// Sempre nova tela\nnavigation.push('Details');\n\n// Reutiliza existente\nnavigation.navigate('Details');`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Stack Navigation</Text>
                <Text style={styles.solutionText}>
                  A navegação funciona como uma pilha de pratos. Você adiciona
                  no topo e remove do topo!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`Home -> Details -> Settings\n         ↑         ↑\n      push()   push()\n\nSettings -> Details -> Home\n            ↓         ↓\n        goBack()  goBack()`}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Dicas</Text>
            <Text style={styles.tipText}>
              • navigate() - vai para tela (reutiliza se existir)
            </Text>
            <Text style={styles.tipText}>
              • push() - sempre adiciona nova tela na pilha
            </Text>
            <Text style={styles.tipText}>
              • goBack() - volta para tela anterior
            </Text>
            <Text style={styles.tipText}>• Passe dados via route.params</Text>
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
    backgroundColor: "#F59E0B",
    padding: 28,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#F59E0B",
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
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.25)",
  },
  explanationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: "#FDE68A",
    lineHeight: 24,
  },
  highlight: {
    color: "#F59E0B",
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
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.25)",
  },
  elementsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#A78BFA",
    marginBottom: 12,
  },
  elementItem: {
    marginVertical: 6,
  },
  elementName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C4B5FD",
    fontFamily: "monospace",
  },
  elementDesc: {
    fontSize: 13,
    color: "#DDD6FE",
    marginTop: 2,
  },
  navigationBox: {},
  description: {
    fontSize: 16,
    color: "#94A3B8",
    lineHeight: 26,
  },
  navigationBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  infoCard: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: "#FDE68A",
    lineHeight: 24,
    marginVertical: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FBBF24",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#F8FAFC",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  navButton: {
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  navButtonPrimary: {
    backgroundColor: "#F59E0B",
  },
  navButtonSecondary: {
    backgroundColor: "#64748B",
  },
  navButtonTertiary: {
    backgroundColor: "#8B5CF6",
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  stackInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  stackTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 8,
  },
  stackText: {
    fontSize: 15,
    color: "#F8FAFC",
    lineHeight: 22,
  },
  stackHint: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 8,
    fontStyle: "italic",
  },
  navTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  moduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  moduleButton: {
    flex: 1,
    minWidth: "45%",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  moduleEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  moduleButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
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
    color: "#FBBF24",
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
    borderColor: "rgba(245, 158, 11, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
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
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  codeSnippetText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#FBBF24",
    lineHeight: 20,
  },
  tips: {
    margin: 24,
    marginTop: 0,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: "#FDE68A",
    lineHeight: 24,
    marginVertical: 4,
  },
  spacing: {
    height: 24,
  },
});
