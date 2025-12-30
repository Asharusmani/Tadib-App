import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
// Screen ki width se padding nikaal kar 7 se divide kiya taake 7 columns barabar banein
const CALENDAR_PADDING = 40;
const CELL_SIZE = (width - CALENDAR_PADDING) / 7;

const COLORS = {
  empty: "transparent",
  zero: "#EDEDED",
  low: "#3D8246D4",
  medium: "#F3A947",
  high: "#3D8246",
  veryHigh: "#437BA1",
  textLight: "#FFFFFF",
  textDark: "#333333",
};

export default function DynamicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getDaysArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let days = [];

    // Pehle din se pehle ki khali jaghen (Empty slots)
    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: "",
        ratio: "",
        color: COLORS.empty,
        isPlaceholder: true,
      });
    }

    // Mahine ki dates
    for (let i = 1; i <= daysInMonth; i++) {
      const completed = Math.floor(Math.random() * 9);
      const total = 8;
      const percentage = (completed / total) * 100;

      let dayColor;
      if (percentage === 0) dayColor = COLORS.zero;
      else if (percentage <= 30) dayColor = COLORS.low;
      else if (percentage <= 60) dayColor = COLORS.medium;
      else if (percentage <= 85) dayColor = COLORS.high;
      else dayColor = COLORS.veryHigh;

      days.push({
        day: i,
        ratio: `${completed}/${total}`,
        color: dayColor,
        isPlaceholder: false,
      });
    }
    return days;
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const yearName = currentDate.getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Calendar</Text>

        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={prevMonth} style={styles.arrowBtn}>
            <ChevronLeft size={20} color="#555" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {monthName} {yearName}
          </Text>
          <TouchableOpacity onPress={nextMonth} style={styles.arrowBtn}>
            <ChevronRight size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          {/* Days Names (Sun, Mon...) */}
          <View style={styles.daysHeader}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <View key={day} style={styles.cellWrapper}>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Dates Grid */}
          <View style={styles.calendarGrid}>
            {getDaysArray().map((item, index) => (
              <View key={index} style={styles.cellWrapper}>
                {item.day !== "" ? (
                  <View
                    style={[styles.dateBox, { backgroundColor: item.color }]}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        {
                          color:
                            item.color === COLORS.zero
                              ? COLORS.textDark
                              : COLORS.textLight,
                        },
                      ]}
                    >
                      {item.day}
                    </Text>
                    <Text
                      style={[
                        styles.ratioText,
                        {
                          color:
                            item.color === COLORS.zero
                              ? "#999"
                              : COLORS.textLight,
                        },
                      ]}
                    >
                      {item.ratio}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={[styles.dateBox, { backgroundColor: "transparent" }]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Completion Rate</Text>
          <View style={styles.legendRow}>
            <Text style={styles.legendLabel}>Less</Text>
            <View style={styles.legendSquaresContainer}>
              {[
                COLORS.zero,
                COLORS.low,
                COLORS.medium,
                COLORS.high,
                COLORS.veryHigh,
              ].map((c, i) => (
                <View
                  key={i}
                  style={[styles.legendSquare, { backgroundColor: c }]}
                />
              ))}
            </View>
            <Text style={styles.legendLabel}>More</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContent: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  monthSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    textAlign: "center",
    minWidth: 120,
  },
  arrowBtn: { padding: 8, backgroundColor: "#E8F5E9", borderRadius: 10 },

  calendarCard: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  daysHeader: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  cellWrapper: {
    width: `${100 / 7}%`, // Exact 7 columns
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  dayLabel: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 12,
  },
  dateBox: {
    width: CELL_SIZE - 8, // Thodi si space boxes ke darmiyan
    height: CELL_SIZE + 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: { fontWeight: "bold", fontSize: 13 },
  ratioText: { fontSize: 8, marginTop: 2, fontWeight: "500" },

  legendCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  legendTitle: { fontSize: 14, fontWeight: "600", marginBottom: 15 },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legendSquaresContainer: { flexDirection: "row", gap: 6 },
  legendSquare: { width: 20, height: 20, borderRadius: 4 },
  legendLabel: { fontSize: 12, color: "#888" },
});