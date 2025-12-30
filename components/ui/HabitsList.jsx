// ============================================
// components/HabitsList.jsx
// ============================================
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HabitsList({ habits }) {
  if (habits.length === 0) return null;

  const formatDate = (dateKey) => {
    if (!dateKey) return "";
    const [year, month, day] = dateKey.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <View style={styles.habitsSection}>
      <Text style={styles.habitsSectionTitle}>Your Habits</Text>

      {habits.map((habit) => (
        <View key={habit.id} style={styles.habitCard}>
          <LinearGradient
            colors={["#ffffff", "#f9fafb"]}
            style={styles.habitCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.habitHeader}>
              <View style={styles.habitIconWrapper}>
                <Image source={habit.icon} style={styles.habitIcon} />
              </View>

              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>{habit.name}</Text>
                <Text style={styles.habitDates}>
                  {formatDate(habit.startDate)} - {formatDate(habit.endDate)}
                </Text>
              </View>

              <View style={styles.habitBadge}>
                <Text style={styles.habitBadgeText}>{habit.daysCount}d</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  habitsSection: {
    marginBottom: 20,
  },
  habitsSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  habitCard: {
    marginBottom: 12,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  habitCardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
  },
  habitHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  habitIconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "#f0fdf4",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  habitIcon: {
    width: 28,
    height: 28,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 2,
  },
  habitDates: {
    fontSize: 12,
    color: "#64748b",
  },
  habitBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  habitBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
