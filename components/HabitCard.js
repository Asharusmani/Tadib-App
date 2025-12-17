// ============================================
// FILE 2: components/ui/HabitCard.jsx
// ============================================
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HabitCard = ({ title, progress, icon, color }) => {
  return (
    <TouchableOpacity style={styles.habitCard} activeOpacity={0.7}>
      <View style={styles.habitLeft}>
        <View style={[styles.habitIcon, { backgroundColor: color + '20' }]}>
          <Text style={styles.habitEmoji}>{icon}</Text>
        </View>
        <View style={styles.habitInfo}>
          <Text style={styles.habitTitle}>{title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.checkButton}>
        <Ionicons name="checkmark-circle-outline" size={28} color={color} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default HabitCard;

const styles = StyleSheet.create({
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  habitLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  habitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  habitEmoji: {
    fontSize: 24,
  },
  habitInfo: {
    marginLeft: 12,
    flex: 1,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginLeft: 8,
    width: 35,
  },
  checkButton: {
    marginLeft: 12,
  },
});