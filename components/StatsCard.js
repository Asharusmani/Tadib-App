// ============================================
// FILE: components/ui/StatsCard.jsx
// ============================================
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";

const StatsCard = ({ title, value, subtitle, icon, color, gradientColors }) => {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={gradientColors || [color + '20', color + '05']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={[styles.iconCircle, { backgroundColor: color + '25' }]}>
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
              <View style={styles.subtitleRow}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={styles.subtitle}>{subtitle}</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    gap: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textSection: {
    gap: 4,
  },
  value: {
    fontSize: 36,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
});