import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChallengeBox({ challenge }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={styles.title}>Desafio</Text>
      </View>
      <Text style={styles.challenge}>{challenge}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FBBF24",
    letterSpacing: 0.3,
  },
  challenge: {
    fontSize: 15,
    color: "#FDE68A",
    lineHeight: 24,
    fontWeight: "500",
  },
});
