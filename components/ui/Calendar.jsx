// ============================================
// components/Calendar.jsx
// ============================================
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ startDate, endDate, onDateClick }) {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDayOffset = getFirstDayOfMonth(selectedMonth, selectedYear);
  const DATES = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const createDateKey = (day, month, year) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isInRange = (date) => {
    if (!startDate) return false;
    const currentDateKey = createDateKey(date, selectedMonth, selectedYear);
    
    if (!endDate) {
      return currentDateKey === startDate;
    }
    
    return currentDateKey >= startDate && currentDateKey <= endDate;
  };

  const isRangeEdge = (date) => {
    const currentDateKey = createDateKey(date, selectedMonth, selectedYear);
    return currentDateKey === startDate || currentDateKey === endDate;
  };

  const handleDateClick = (date) => {
    const dateKey = createDateKey(date, selectedMonth, selectedYear);
    onDateClick(dateKey);
  };

  const getHelperText = () => {
    if (!startDate) return "Click a date to start selecting range";
    if (startDate && !endDate) return "Click another date to complete the range";
    return "Range selected! Click 'Create Habit' button";
  };

  return (
    <View style={styles.calendarCard}>
      <View style={styles.monthNavigationContainer}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToPreviousMonth}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#8b5cf6" />
        </TouchableOpacity>

        <View style={styles.monthBadgeContainer}>
          <LinearGradient
            colors={["#8b5cf6", "#7c3aed"]}
            style={styles.monthBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.monthText}>
              {MONTHS[selectedMonth]} {selectedYear}
            </Text>
          </LinearGradient>
        </View>

        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToNextMonth}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={24} color="#8b5cf6" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysRow}>
        {DAYS.map((day) => (
          <Text key={day} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.datesGrid}>
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.dateContainer} />
        ))}
        
        {DATES.map((date) => {
          const inRange = isInRange(date);
          const isEdge = isRangeEdge(date);

          return (
            <TouchableOpacity
              key={date}
              onPress={() => handleDateClick(date)}
              activeOpacity={0.7}
              style={styles.dateContainer}
            >
              {isEdge ? (
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={[styles.dateCircle, styles.edgeDate]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.edgeDateText}>{date}</Text>
                  <View style={styles.edgeDot} />
                </LinearGradient>
              ) : inRange ? (
                <View style={[styles.dateCircle, styles.rangeDate]}>
                  <Text style={styles.rangeDateText}>{date}</Text>
                </View>
              ) : (
                <View style={[styles.dateCircle, styles.normalDate]}>
                  <Text style={styles.normalDateText}>{date}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.helperText}>{getHelperText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  monthNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  monthBadgeContainer: {
    alignItems: "center",
    flex: 1,
  },
  monthBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 16,
  },
  monthText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    width: 40,
    textAlign: "center",
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dateContainer: {
    width: "13%",
    aspectRatio: 1,
    marginBottom: 8,
  },
  dateCircle: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  normalDate: {
    backgroundColor: "#f8fafc",
  },
  normalDateText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  rangeDate: {
    borderWidth: 1,
    borderColor: "#10b981",
  },
  rangeDateText: {
    fontSize: 14,
    color: "#047857",
    fontWeight: "600",
  },
  edgeDate: {
    elevation: 3,
    shadowColor: "#10b981",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  edgeDateText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  edgeDot: {
    width: 4,
    height: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
    marginTop: 2,
  },
  helperText: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
});