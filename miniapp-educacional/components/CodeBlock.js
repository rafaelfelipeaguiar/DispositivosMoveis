import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CodeBlock({ code }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: "#FF5F56" }]} />
        <View style={[styles.dot, { backgroundColor: "#FFBD2E" }]} />
        <View style={[styles.dot, { backgroundColor: "#27C93F" }]} />
        <Text style={styles.headerText}>código.js</Text>
      </View>
      <ScrollView
        horizontal
        style={styles.codeContainer}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.code}>{code}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D1117",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.2)",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  headerText: {
    color: "#A5B4FC",
    fontSize: 12,
    marginLeft: 10,
    fontFamily: "monospace",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  codeContainer: {
    padding: 20,
  },
  code: {
    color: "#E2E8F0",
    fontSize: 13,
    fontFamily: "monospace",
    lineHeight: 22,
    letterSpacing: 0.3,
  },
});
