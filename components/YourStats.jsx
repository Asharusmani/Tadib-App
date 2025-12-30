// ============================================
// 1. YourStats.jsx
// ============================================
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StatCard = ({ label, value, emoji, gradientColors, iconName }) => (
  <LinearGradient
    colors={gradientColors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.statCard}
  >
    <View style={styles.cardContent}>
      <View style={styles.statHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.statValue}>{value}</Text>
        {iconName && (
          <Icon name={iconName} size={28} color="rgba(255,255,255,0.3)" />
        )}
      </View>
    </View>
    {/* Decorative blur effect */}
    <View style={styles.decorativeBlur} />
  </LinearGradient>
);

const YourStats = () => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Your Stats</Text>

    <View style={styles.statsRow}>
      <StatCard
        label="Current Streak"
        value="12"
        emoji="🔥"
        iconName="trending-up"
        gradientColors={["#10B981", "#059669", "#047857"]}
      />
      <StatCard
        label="Best Streak"
        value="15"
        emoji="⭐"
        iconName="medal"
        gradientColors={["#F59E0B", "#D97706", "#B45309"]}
      />
    </View>

    <View style={styles.statsRow}>
      <StatCard
        label="Active Habits"
        value="8"
        emoji="🎯"
        iconName="target"
        gradientColors={["#10B981", "#059669", "#047857"]}
      />
      <StatCard
        label="Total Points"
        value="340"
        emoji="⚡"
        iconName="lightning-bolt"
        gradientColors={["#10B981", "#059669", "#047857"]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111827",
    paddingHorizontal: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  statCard: {
    width: "48%",
    borderRadius: 20,
    padding: 16,
    minHeight: 110,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.95)",
    letterSpacing: 0.3,
  },
  emoji: {
    fontSize: 22,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  decorativeBlur: {
    position: "absolute",
    right: -20,
    bottom: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
});

export default YourStats;
