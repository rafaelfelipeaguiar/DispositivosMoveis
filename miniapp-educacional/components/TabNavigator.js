import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const TabNavigator = ({
  tabs,
  activeTab,
  onTabPress,
  tabErrors = {},
  completedTabs = [],
}) => {
  const getTabStyle = (index) => {
    const isActive = activeTab === index;
    const hasError = tabErrors[index];
    const isCompleted = completedTabs.includes(index);

    if (isActive) {
      return [styles.tab, styles.activeTab];
    } else if (hasError) {
      return [styles.tab, styles.errorTab];
    } else if (isCompleted) {
      return [styles.tab, styles.completedTab];
    } else {
      return [styles.tab, styles.inactiveTab];
    }
  };

  const getTabTextStyle = (index) => {
    const isActive = activeTab === index;
    const hasError = tabErrors[index];
    const isCompleted = completedTabs.includes(index);

    if (isActive) {
      return [styles.tabText, styles.activeTabText];
    } else if (hasError) {
      return [styles.tabText, styles.errorTabText];
    } else if (isCompleted) {
      return [styles.tabText, styles.completedTabText];
    } else {
      return [styles.tabText, styles.inactiveTabText];
    }
  };

  const getTabIcon = (index) => {
    const hasError = tabErrors[index];
    const isCompleted = completedTabs.includes(index);

    if (hasError) {
      return "⚠️";
    } else if (isCompleted) {
      return "✅";
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={getTabStyle(index)}
            onPress={() => onTabPress(index)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              {getTabIcon(index) && (
                <Text style={styles.tabIcon}>{getTabIcon(index)}</Text>
              )}
              <Text style={getTabTextStyle(index)} numberOfLines={2}>
                {tab.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((activeTab + 1) / tabs.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {activeTab + 1} de {tabs.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  activeTab: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  inactiveTab: {
    backgroundColor: "#f8f9fa",
    borderColor: "#e9ecef",
  },
  errorTab: {
    backgroundColor: "#fff5f5",
    borderColor: "#ff4444",
  },
  completedTab: {
    backgroundColor: "#f0f9ff",
    borderColor: "#22c55e",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  activeTabText: {
    color: "#fff",
  },
  inactiveTabText: {
    color: "#6c757d",
  },
  errorTabText: {
    color: "#ff4444",
  },
  completedTabText: {
    color: "#22c55e",
  },
  progressContainer: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#e9ecef",
    borderRadius: 2,
    marginBottom: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#6c757d",
    fontWeight: "500",
  },
});

export default TabNavigator;
