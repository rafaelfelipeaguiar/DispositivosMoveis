import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ModuleCard({ module, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: module.color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{module.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {module.description}
        </Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icon: {
    fontSize: 30,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    color: "#6366F1",
    marginLeft: 8,
  },
});
