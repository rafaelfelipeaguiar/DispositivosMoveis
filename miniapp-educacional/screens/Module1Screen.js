import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { modules, codeExamples } from "../data/modules";
import CodeBlock from "../components/CodeBlock";
import ChallengeBox from "../components/ChallengeBox";

function CustomGreeting({ name, color }) {
  return (
    <View style={[styles.greetingBox, { backgroundColor: color }]}>
      <Text style={styles.greetingText}>Olá, {name}! 👋</Text>
    </View>
  );
}

function InfoCard({ emoji, title, description }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoEmoji}>{emoji}</Text>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function Module1Screen({ route }) {
  const module = modules[0];
  const [userName, setUserName] = useState("Visitante");
  const [greetingColor, setGreetingColor] = useState("#6366F1");
  const [showCards, setShowCards] = useState(true);
  const scrollViewRef = React.useRef(null);
  const solutionsRef = React.useRef(null);

  const colors = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"];

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
            <CodeBlock code={codeExamples[1]} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Exemplo Interativo</Text>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                🎓 O que são Componentes?
              </Text>
              <Text style={styles.explanationText}>
                Componentes são como{" "}
                <Text style={styles.highlight}>blocos de LEGO</Text> para
                construir interfaces. Cada componente é uma função que retorna
                elementos visuais (JSX). Eles podem receber dados via{" "}
                <Text style={styles.highlight}>props</Text> e serem reutilizados
                em qualquer lugar do app!
              </Text>
            </View>

            <View style={styles.interactiveBox}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 Neste exemplo você aprende:
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>Props</Text> - como passar
                  dados para componentes (name, color)
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>TextInput</Text> - campo de
                  entrada de texto do usuário
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>TouchableOpacity</Text> -
                  botão tocável com feedback visual
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>Estado dinâmico</Text> - o
                  componente atualiza quando você digita
                </Text>
              </View>

              <Text style={styles.label}>Digite seu nome:</Text>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="Seu nome aqui"
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.label}>Escolha uma cor:</Text>
              <View style={styles.colorPicker}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color },
                      greetingColor === color && styles.selectedColor,
                    ]}
                    onPress={() => setGreetingColor(color)}
                  />
                ))}
              </View>

              <View style={styles.preview}>
                <CustomGreeting name={userName} color={greetingColor} />
              </View>

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Elementos utilizados:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>View</Text>
                  <Text style={styles.elementDesc}>
                    Container básico - equivalente a uma div no HTML
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>Text</Text>
                  <Text style={styles.elementDesc}>
                    Exibe texto na tela - obrigatório para qualquer texto
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>TextInput</Text>
                  <Text style={styles.elementDesc}>
                    Campo de entrada - captura texto do usuário
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>TouchableOpacity</Text>
                  <Text style={styles.elementDesc}>
                    Área tocável - fica translúcida ao tocar
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`function CustomGreeting({ name, color }) {
  return (
    <View style={{ backgroundColor: color }}>
      <Text>Olá, {name}! 👋</Text>
    </View>
  );
}

// Uso:
<CustomGreeting 
  name="${userName}" 
  color="${greetingColor}" 
/>`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.interactiveBox, { marginTop: 16 }]}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 Neste exemplo você aprende:
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>Composição</Text> - combinar
                  componentes menores para criar maiores
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>map()</Text> - renderizar
                  listas de componentes dinamicamente
                </Text>
                <Text style={styles.conceptItem}>
                  •{" "}
                  <Text style={styles.highlight}>Renderização condicional</Text>{" "}
                  - mostrar/ocultar com {`{condição && <Componente/>}`}
                </Text>
              </View>

              <Text style={styles.label}>Composição de Componentes:</Text>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowCards(!showCards)}
              >
                <Text style={styles.toggleButtonText}>
                  {showCards ? "🙈 Ocultar Cards" : "👀 Mostrar Cards"}
                </Text>
              </TouchableOpacity>

              {showCards && (
                <View style={styles.cardsContainer}>
                  <InfoCard
                    emoji="⚛️"
                    title="Componentes"
                    description="Blocos reutilizáveis de UI"
                  />
                  <InfoCard
                    emoji="🎯"
                    title="Props"
                    description="Dados passados entre componentes"
                  />
                  <InfoCard
                    emoji="🔄"
                    title="Reutilização"
                    description="Menos código, mais produtividade"
                  />
                </View>
              )}

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`function InfoCard({ emoji, title, description }) {
  return (
    <View style={styles.infoCard}>
      <Text>{emoji}</Text>
      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

// Uso com map():
{items.map(item => (
  <InfoCard 
    key={item.id}
    emoji={item.emoji}
    title={item.title}
    description={item.description}
  />
))}`}
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
                <Text style={styles.solutionTitle}>Solução 1: Mudar a Cor</Text>
                <Text style={styles.solutionText}>
                  Use o picker de cores acima para alterar a cor do componente
                  de saudação. As cores são aplicadas dinamicamente via props!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`<CustomGreeting\n  name="Maria"\n  color="#EC4899"\n/>`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>
                  Solução 2: Novo Componente
                </Text>
                <Text style={styles.solutionText}>
                  Crie componentes como InfoCard que recebem props (emoji,
                  title, description) e podem ser reutilizados!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`function InfoCard(props) {\n  return (\n    <View>\n      <Text>{props.emoji}</Text>\n      <Text>{props.title}</Text>\n    </View>\n  );\n}`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Solução 3: Composição</Text>
                <Text style={styles.solutionText}>
                  Combine múltiplos componentes dentro de um container. Use
                  map() para renderizar listas de componentes!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`{items.map(item => (\n  <InfoCard\n    key={item.id}\n    emoji={item.emoji}\n    title={item.title}\n  />\n))}`}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Dicas</Text>
            <Text style={styles.tipText}>• JSX combina JavaScript e XML</Text>
            <Text style={styles.tipText}>
              • Props passam dados entre componentes
            </Text>
            <Text style={styles.tipText}>• Componentes são reutilizáveis</Text>
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
    backgroundColor: "#6366F1",
    padding: 28,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#6366F1",
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
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.25)",
  },
  explanationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#A5B4FC",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: "#C7D2FE",
    lineHeight: 24,
  },
  highlight: {
    color: "#818CF8",
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
  interactiveBox: {
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A5B4FC",
    marginBottom: 10,
    marginTop: 16,
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
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  colorPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "#FFFFFF",
    transform: [{ scale: 1.1 }],
  },
  preview: {
    marginTop: 20,
    alignItems: "center",
  },
  greetingBox: {
    padding: 24,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.3,
  },
  toggleButton: {
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cardsContainer: {
    gap: 14,
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
    color: "#A5B4FC",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
  },
  infoEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 20,
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
    borderColor: "rgba(99, 102, 241, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#6366F1",
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
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  codeSnippetText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#A5B4FC",
    lineHeight: 20,
  },
  tips: {
    margin: 24,
    marginTop: 0,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A5B4FC",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: "#818CF8",
    lineHeight: 24,
    marginVertical: 4,
  },
  spacing: {
    height: 24,
  },
});
