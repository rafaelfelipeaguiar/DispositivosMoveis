import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { modules, codeExamples } from "../data/modules";
import CodeBlock from "../components/CodeBlock";
import ChallengeBox from "../components/ChallengeBox";

export default function Module3Screen({ route }) {
  const module = modules[2];
  const scrollViewRef = React.useRef(null);
  const solutionsRef = React.useRef(null);
  const [selectedStyle, setSelectedStyle] = useState("default");
  const [fadeAnim] = useState(new Animated.Value(1));
  const [borderRadius, setBorderRadius] = useState(12);
  const [shadowEnabled, setShadowEnabled] = useState(true);

  const animateCard = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const styleOptions = [
    { id: "default", name: "Padrão", colors: ["#6366F1", "#8B5CF6"] },
    { id: "sunset", name: "Pôr do Sol", colors: ["#F59E0B", "#EF4444"] },
    { id: "ocean", name: "Oceano", colors: ["#06B6D4", "#3B82F6"] },
    { id: "forest", name: "Floresta", colors: ["#10B981", "#059669"] },
  ];

  const currentStyle = styleOptions.find((s) => s.id === selectedStyle);

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
            <CodeBlock code={codeExamples[3]} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Exemplo Interativo</Text>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                🎓 O que é StyleSheet e Flexbox?
              </Text>
              <Text style={styles.explanationText}>
                <Text style={styles.highlight}>StyleSheet</Text> é a forma
                otimizada de criar estilos no React Native - similar ao CSS.
                <Text style={styles.highlight}> Flexbox</Text> é o sistema de
                layout para organizar elementos na tela de forma responsiva.
              </Text>
            </View>

            <View style={styles.conceptBox}>
              <Text style={styles.conceptTitle}>
                💡 Neste exemplo você aprende:
              </Text>
              <Text style={styles.conceptItem}>
                • <Text style={styles.highlight}>StyleSheet.create()</Text> -
                cria estilos otimizados
              </Text>
              <Text style={styles.conceptItem}>
                • <Text style={styles.highlight}>Estilos dinâmicos</Text> -
                combinar estilos fixos com variáveis
              </Text>
              <Text style={styles.conceptItem}>
                • <Text style={styles.highlight}>Animated.View</Text> -
                animações fluidas e performáticas
              </Text>
            </View>

            <Text style={styles.label}>Escolha um tema:</Text>
            <View style={styles.themeSelector}>
              {styleOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.themeButton,
                    selectedStyle === option.id && styles.themeButtonActive,
                  ]}
                  onPress={() => {
                    setSelectedStyle(option.id);
                    animateCard();
                  }}
                >
                  <View
                    style={[
                      styles.themePreview,
                      { backgroundColor: option.colors[0] },
                    ]}
                  />
                  <Text style={styles.themeName}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Animated.View
              style={[
                styles.styledCard,
                {
                  opacity: fadeAnim,
                  backgroundColor: currentStyle.colors[0],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>✨</Text>
                <View>
                  <Text style={styles.cardTitle}>Card Estilizado</Text>
                  <Text style={styles.cardSubtitle}>Com StyleSheet</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardText}>
                  Este card usa StyleSheet e Flexbox para criar um layout
                  responsivo e atraente.
                </Text>

                <View style={styles.tags}>
                  <View
                    style={[
                      styles.tag,
                      { backgroundColor: currentStyle.colors[1] },
                    ]}
                  >
                    <Text style={styles.tagText}>Flexbox</Text>
                  </View>
                  <View
                    style={[
                      styles.tag,
                      { backgroundColor: currentStyle.colors[1] },
                    ]}
                  >
                    <Text style={styles.tagText}>StyleSheet</Text>
                  </View>
                  <View
                    style={[
                      styles.tag,
                      { backgroundColor: currentStyle.colors[1] },
                    ]}
                  >
                    <Text style={styles.tagText}>Animação</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>
                  👆 Toque em um tema acima
                </Text>
              </View>

              <View style={styles.cardElementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Elementos utilizados:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>Animated.View</Text>
                  <Text style={styles.elementDesc}>
                    View com suporte a animações (opacity, transform, etc)
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    style={"{[style1, style2]}"}
                  </Text>
                  <Text style={styles.elementDesc}>
                    Combina múltiplos estilos em um array
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>Animated.timing()</Text>
                  <Text style={styles.elementDesc}>
                    Cria animação baseada em tempo
                  </Text>
                </View>
              </View>

              <View style={styles.cardCodeBlock}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const [theme, setTheme] = useState("${selectedStyle}");

<Animated.View style={[
  styles.styledCard,
  {
    opacity: fadeAnim,
    backgroundColor: "${currentStyle.colors[0]}"
  }
]}>
  <Text>Card Estilizado</Text>
</Animated.View>`}
                  </Text>
                </View>
              </View>
            </Animated.View>

            <View style={styles.flexDemo}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 Flexbox - Sistema de Layout
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>flexDirection</Text> - row
                  (horizontal) ou column (vertical)
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>justifyContent</Text> -
                  distribui espaço no eixo principal
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>flex: 1</Text> - ocupa todo
                  espaço disponível
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>gap</Text> - espaçamento
                  entre elementos
                </Text>
              </View>

              <Text style={styles.demoTitle}>Layout Flexbox:</Text>

              <View style={styles.flexRow}>
                <View
                  style={[
                    styles.flexBox,
                    { backgroundColor: currentStyle.colors[0] },
                  ]}
                >
                  <Text style={styles.flexText}>1</Text>
                </View>
                <View
                  style={[
                    styles.flexBox,
                    { backgroundColor: currentStyle.colors[1] },
                  ]}
                >
                  <Text style={styles.flexText}>2</Text>
                </View>
                <View
                  style={[
                    styles.flexBox,
                    { backgroundColor: currentStyle.colors[0] },
                  ]}
                >
                  <Text style={styles.flexText}>3</Text>
                </View>
              </View>

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Propriedades Flexbox:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>flexDirection: "row"</Text>
                  <Text style={styles.elementDesc}>
                    Elementos lado a lado (horizontal)
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    justifyContent: "space-between"
                  </Text>
                  <Text style={styles.elementDesc}>
                    Distribui espaço igual entre elementos
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>alignItems: "center"</Text>
                  <Text style={styles.elementDesc}>
                    Centraliza no eixo perpendicular
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`<View style={styles.flexRow}>
  <View style={[styles.flexBox, 
    { backgroundColor: "${currentStyle.colors[0]}" }]}>
    <Text>1</Text>
  </View>
</View>

flexRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 12
}`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.flexDemo, { marginTop: 16 }]}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>💡 Estilos Condicionais</Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>Operador ternário</Text> -
                  condição ? valorTrue : valorFalse
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>Sombras iOS</Text> -
                  shadowColor, shadowOffset, shadowOpacity
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>Sombras Android</Text> -
                  elevation (único necessário)
                </Text>
              </View>

              <Text style={styles.demoTitle}>Estilos Dinâmicos:</Text>

              <View
                style={[
                  styles.dynamicBox,
                  {
                    borderRadius: borderRadius,
                    backgroundColor: currentStyle.colors[0],
                    shadowColor: shadowEnabled ? "#000" : "transparent",
                    shadowOffset: shadowEnabled
                      ? { width: 0, height: 4 }
                      : { width: 0, height: 0 },
                    shadowOpacity: shadowEnabled ? 0.2 : 0,
                    shadowRadius: shadowEnabled ? 8 : 0,
                    elevation: shadowEnabled ? 5 : 0,
                  },
                ]}
              >
                <Text style={styles.dynamicBoxText}>
                  BorderRadius: {borderRadius}px
                </Text>
                <Text style={styles.dynamicBoxText}>
                  Sombra: {shadowEnabled ? "Sim" : "Não"}
                </Text>
              </View>

              <View style={styles.controlsRow}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => setBorderRadius(Math.max(0, borderRadius - 4))}
                >
                  <Text style={styles.controlButtonText}>◀ Menos Borda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() =>
                    setBorderRadius(Math.min(50, borderRadius + 4))
                  }
                >
                  <Text style={styles.controlButtonText}>Mais Borda ▶</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.controlButton,
                  { backgroundColor: shadowEnabled ? "#EF4444" : "#10B981" },
                ]}
                onPress={() => setShadowEnabled(!shadowEnabled)}
              >
                <Text style={styles.controlButtonText}>
                  {shadowEnabled ? "Desativar Sombra" : "Ativar Sombra"}
                </Text>
              </TouchableOpacity>

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Propriedades de Estilo:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>borderRadius</Text>
                  <Text style={styles.elementDesc}>
                    Arredondamento das bordas (px)
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    shadowColor / shadowOffset
                  </Text>
                  <Text style={styles.elementDesc}>
                    Cor e posição da sombra (iOS)
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>elevation</Text>
                  <Text style={styles.elementDesc}>
                    Intensidade da sombra (Android)
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const [borderRadius, setBorderRadius] = useState(${borderRadius});
const [shadowEnabled, setShadowEnabled] = useState(${shadowEnabled});

<View style={{
  borderRadius: borderRadius,
  shadowColor: shadowEnabled ? "#000" : "transparent",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: shadowEnabled ? 0.2 : 0,
  elevation: shadowEnabled ? 5 : 0,
}}>
  <Text>Estilos Dinâmicos!</Text>
</View>`}
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
                  Solução: Mudar Cores do Gradiente
                </Text>
                <Text style={styles.solutionText}>
                  Use o theme selector acima para trocar as cores dinamicamente.
                  Combine com state para aplicar estilos!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const [theme, setTheme] = useState('default');\n\n<View style={{\n  backgroundColor: currentTheme.color\n}}>`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>
                  Solução: Borda Arredondada
                </Text>
                <Text style={styles.solutionText}>
                  Use borderRadius nos estilos. Valores maiores = cantos mais
                  arredondados. Experimente os controles acima!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`card: {\n  borderRadius: 12,\n  // ou\n  borderRadius: 20,\n  // ou dinâmico\n  borderRadius: radius,\n}`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Estilos Dinâmicos</Text>
                <Text style={styles.solutionText}>
                  Combine StyleSheet com estilos inline para criar componentes
                  dinâmicos baseados em state!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`<View style={[\n  styles.card,\n  {\n    backgroundColor: color,\n    borderRadius: radius\n  }\n]}>`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Sombras Cross-Platform</Text>
                <Text style={styles.solutionText}>
                  iOS usa shadowColor/shadowOffset. Android usa elevation.
                  Combine ambos para funcionar em todas as plataformas!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`shadowColor: '#000',\nshadowOffset: {\n  width: 0,\n  height: 4\n},\nshadowOpacity: 0.2,\nshadowRadius: 8,\nelevation: 5, // Android`}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Dicas</Text>
            <Text style={styles.tipText}>• StyleSheet otimiza performance</Text>
            <Text style={styles.tipText}>
              • Flexbox cria layouts responsivos
            </Text>
            <Text style={styles.tipText}>
              • Combine estilos com array [style1, style2]
            </Text>
            <Text style={styles.tipText}>
              • Use Animated para animações suaves
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
    backgroundColor: "#10B981",
    padding: 28,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#10B981",
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
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.25)",
  },
  explanationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#34D399",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: "#A7F3D0",
    lineHeight: 24,
  },
  highlight: {
    color: "#10B981",
    fontWeight: "700",
  },
  conceptBox: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#6366F1",
  },
  conceptTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#A5B4FC",
    marginBottom: 10,
  },
  conceptItem: {
    fontSize: 14,
    color: "#C7D2FE",
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
  cardElementsBox: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 14,
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.25)",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34D399",
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  themeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  themeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 14,
    padding: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  themeButtonActive: {
    borderColor: "#10B981",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
  },
  themePreview: {
    width: 28,
    height: 28,
    borderRadius: 8,
    marginRight: 10,
  },
  themeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F8FAFC",
  },
  styledCard: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  cardIcon: {
    fontSize: 36,
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  cardContent: {
    padding: 20,
  },
  cardText: {
    fontSize: 15,
    color: "white",
    lineHeight: 24,
    marginBottom: 20,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.3,
  },
  cardFooter: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    alignItems: "center",
  },
  cardFooterText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  flexDemo: {
    marginTop: 28,
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
  demoTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#34D399",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  flexBox: {
    flex: 1,
    height: 70,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  flexText: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
  },
  dynamicBox: {
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    minHeight: 120,
  },
  dynamicBoxText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 4,
  },
  controlsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  controlButton: {
    flex: 1,
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  controlButtonText: {
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
    color: "#34D399",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardCodeBlock: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
    borderColor: "rgba(16, 185, 129, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
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
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  codeSnippetText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#34D399",
    lineHeight: 20,
  },
  tips: {
    margin: 24,
    marginTop: 0,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#34D399",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: "#6EE7B7",
    lineHeight: 24,
    marginVertical: 4,
  },
  spacing: {
    height: 24,
  },
});
