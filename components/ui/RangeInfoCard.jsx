// ============================================
// components/RangeInfoCard.jsx
// ============================================
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RangeInfoCard({ startDate, endDate, daysCount, onCreateHabit }) {
  if (!startDate) return null;

  const formatDate = (dateKey) => {
    if (!dateKey) return "";
    const [year, month, day] = dateKey.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <LinearGradient
      colors={["#dbeafe", "#eff6ff"]}
      style={styles.rangeCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.rangeContent}>
        <View style={styles.rangeIcon}>
          <Text style={styles.rangeIconText}>📊</Text>
        </View>
        <View style={styles.rangeInfo}>
          <Text style={styles.rangeLabel}>Selected Range</Text>
          <Text style={styles.rangeText}>
            {formatDate(startDate)} {endDate ? `- ${formatDate(endDate)}` : "(Select end date)"}
          </Text>
          <Text style={styles.rangeDays}>
            {daysCount} day{daysCount > 1 ? "s" : ""} selected
          </Text>
        </View>
      </View>

      <View style={styles.createButtonWrapper}>
        <TouchableOpacity onPress={onCreateHabit}>
          <LinearGradient
            colors={["#8b5cf6", "#7c3aed"]}
            style={styles.createButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.createButtonText}>
              Create Habit for {daysCount} Day{daysCount > 1 ? "s" : ""}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rangeCard: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  rangeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  rangeIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rangeIconText: {
    fontSize: 20,
  },
  rangeInfo: {
    flex: 1,
  },
  rangeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 2,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  rangeDays: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  createButtonWrapper: {
    marginTop: 8,
  },
  createButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
