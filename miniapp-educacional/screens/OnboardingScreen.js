import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    icon: "🚀",
    title: "Bem-vindo ao\nReact Native Learning",
    subtitle: "Seu guia interativo para dominar React Native",
    description:
      "Aprenda os fundamentos do desenvolvimento mobile de forma prática e divertida!",
    color: "#6366F1",
    gradient: ["#6366F1", "#8B5CF6"],
  },
  {
    id: 2,
    icon: "📚",
    title: "5 Módulos\nCompletos",
    subtitle: "Do básico ao avançado",
    description:
      "Componentes, Hooks, Estilos, Navegação e APIs Nativas - tudo que você precisa para criar apps incríveis!",
    color: "#EC4899",
    features: [
      "🧩 Componentes & JSX",
      "🎣 Hooks (useState/useEffect)",
      "🎨 Estilos & Flexbox",
    ],
  },
  {
    id: 3,
    icon: "✨",
    title: "Exemplos\nInterativos",
    subtitle: "Aprenda fazendo",
    description:
      "Cada módulo tem exemplos práticos que você pode interagir e ver o resultado em tempo real!",
    color: "#10B981",
    features: [
      "👆 Toque e experimente",
      "📝 Veja o código",
      "🎯 Entenda na prática",
    ],
  },
  {
    id: 4,
    icon: "💡",
    title: "Explicações\nDetalhadas",
    subtitle: "Entenda cada conceito",
    description:
      "Não apenas código - explicações claras sobre o que cada elemento faz e por que usá-lo.",
    color: "#F59E0B",
    features: [
      "📖 Teoria simplificada",
      "🔍 Elementos explicados",
      "💻 Código comentado",
    ],
  },
  {
    id: 5,
    icon: "🎯",
    title: "Desafios &\nSoluções",
    subtitle: "Teste seus conhecimentos",
    description:
      "Pratique com desafios ao final de cada módulo e confira as soluções quando precisar!",
    color: "#8B5CF6",
    features: [
      "🏆 Desafios práticos",
      "✅ Soluções explicadas",
      "📈 Evolua seu nível",
    ],
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        scrollViewRef.current?.scrollTo({
          x: width * (currentIndex + 1),
          animated: false,
        });
        setCurrentIndex(currentIndex + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    } else {
      navigation.replace("Home");
    }
  };

  const handleSkip = () => {
    navigation.replace("Home");
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentIndex) {
      setCurrentIndex(slideIndex);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <View style={[styles.container, { backgroundColor: "#0F0F23" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <Animated.View
            key={slide.id}
            style={[
              styles.slide,
              { opacity: index === currentIndex ? fadeAnim : 1 },
            ]}
          >
            <View
              style={[
                styles.backgroundCircle,
                { backgroundColor: slide.color + "15" },
              ]}
            />

            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: slide.color + "20",
                  borderColor: slide.color,
                },
              ]}
            >
              <Text style={styles.icon}>{slide.icon}</Text>
            </View>

            <Text style={styles.title}>{slide.title}</Text>

            <View
              style={[styles.subtitleBadge, { backgroundColor: slide.color }]}
            >
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>

            <Text style={styles.description}>{slide.description}</Text>

            {slide.features && (
              <View style={styles.featuresContainer}>
                {slide.features.map((feature, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.featureItem,
                      { borderColor: slide.color + "40" },
                    ]}
                  >
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            )}
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? currentSlide.color : "#374151",
                width: index === currentIndex ? 32 : 10,
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentSlide.color }]}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? "Começar! 🚀" : "Próximo"}
        </Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentIndex + 1) / slides.length) * 100}%`,
                backgroundColor: currentSlide.color,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} de {slides.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 10,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "600",
  },
  slide: {
    width: width,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  backgroundCircle: {
    position: "absolute",
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width,
    top: -width * 0.5,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 3,
  },
  icon: {
    fontSize: 72,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#F8FAFC",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  subtitleBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 17,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featuresContainer: {
    width: "100%",
    gap: 12,
  },
  featureItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
  featureText: {
    fontSize: 16,
    color: "#E2E8F0",
    textAlign: "center",
    fontWeight: "500",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  button: {
    marginHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 24,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#1F2937",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
});
