import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  { id: "all", label: "All" },
  { id: "spiritual", label: "Spiritual" },
  { id: "health", label: "Health" },
];

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={[
            styles.tab,
            activeCategory === cat.id && styles.activeTab,
          ]}
          onPress={() => onCategoryChange(cat.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeCategory === cat.id && styles.activeTabText,
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#333",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
