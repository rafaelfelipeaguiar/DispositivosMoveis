import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { modules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("learning");

  const handleModulePress = (moduleId, mode) => {
    navigation.navigate(`Module${moduleId}`, { mode });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bem-vindo! 👋</Text>
        <Text style={styles.headerSubtitle}>
          Escolha um módulo para começar sua jornada
        </Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "learning" && styles.tabActive]}
            onPress={() => setActiveTab("learning")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "learning" && styles.tabTextActive,
              ]}
            >
              📚 Aprender
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "solutions" && styles.tabActive]}
            onPress={() => setActiveTab("solutions")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "solutions" && styles.tabTextActive,
              ]}
            >
              💡 Soluções
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "learning" ? (
          <>
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onPress={() => handleModulePress(module.id, "learning")}
              />
            ))}

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                📚 Cada módulo contém explicações, código e exemplos interativos
              </Text>
            </View>
          </>
        ) : (
          <>
            {modules.map((module) => (
              <TouchableOpacity
                key={module.id}
                style={[styles.solutionCard, { borderLeftColor: module.color }]}
                onPress={() => handleModulePress(module.id, "solutions")}
              >
                <View style={styles.solutionIcon}>
                  <Text style={styles.solutionEmoji}>{module.icon}</Text>
                </View>
                <View style={styles.solutionContent}>
                  <Text style={styles.solutionTitle}>{module.title}</Text>
                  <Text style={styles.solutionSubtitle}>
                    💡 Ver soluções dos desafios
                  </Text>
                  <Text style={styles.solutionChallenge} numberOfLines={2}>
                    Desafio: {module.challenge}
                  </Text>
                </View>
                <Text style={styles.solutionArrow}>→</Text>
              </TouchableOpacity>
            ))}

            <View style={[styles.footer, { backgroundColor: "#FEF3C7" }]}>
              <Text style={[styles.footerText, { color: "#92400E" }]}>
                💡 Toque em um módulo para ver as soluções completas dos
                desafios
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F23",
  },
  header: {
    backgroundColor: "#1A1A2E",
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#94A3B8",
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    borderRadius: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  solutionCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  solutionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  solutionEmoji: {
    fontSize: 28,
  },
  solutionContent: {
    flex: 1,
  },
  solutionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  solutionSubtitle: {
    fontSize: 13,
    color: "#FBBF24",
    fontWeight: "600",
    marginBottom: 6,
  },
  solutionChallenge: {
    fontSize: 12,
    color: "#94A3B8",
    lineHeight: 18,
  },
  solutionArrow: {
    fontSize: 24,
    color: "#FBBF24",
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    marginTop: 12,
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  footerText: {
    fontSize: 14,
    color: "#A5B4FC",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
});
