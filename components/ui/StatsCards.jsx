// components/StatsCards.jsx - FIXED CONSISTENT LAYOUT
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width: screenWidth } = Dimensions.get('window');

export default function StatsCards({ daysCount, habitsCount }) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <LinearGradient
          colors={["#fef3c7", "#fde68a"]}
          style={styles.statGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statIcon}>
            <Ionicons name="calendar" size={24} color="#f59e0b" />
          </View>
          <Text style={styles.statValue}>{daysCount}</Text>
          <Text style={styles.statLabel}>Days Selected</Text>
        </LinearGradient>
      </View>

      <View style={styles.statCard}>
        <LinearGradient
          colors={["#dbeafe", "#bfdbfe"]}
          style={styles.statGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statIcon}>
            <Ionicons name="trophy" size={24} color="#3b82f6" />
          </View>
          <Text style={styles.statValue}>{habitsCount}</Text>
          <Text style={styles.statLabel}>Active Habits</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  statCard: {
    width: (screenWidth - 52) / 2, // (full width - padding - gap) / 2 cards
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  statGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    minHeight: 130, // Minimum height to keep consistent
  },
  statIcon: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
    lineHeight: 36,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    textAlign: "center",
  },
});