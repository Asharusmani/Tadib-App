// ============================================
// QuickReminder.js - Premium Card Design
// ============================================
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";

const QuickReminder = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.card}
      >
        <LinearGradient
          colors={['#10B981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.accentBar}
        />
        
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Daily Reminder</Text>
            <Text style={styles.subtitle}>Spiritual Guidance</Text>
          </View>
          <LinearGradient
            colors={['#ECFDF5', '#D1FAE5']}
            style={styles.iconWrapper}
          >
            <Ionicons name="book" size={22} color="#059669" />
          </LinearGradient>
        </View>
        
        <View style={styles.quoteSection}>
          <Text style={styles.arabicText}>
            وَاذْكُر رَبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً
          </Text>
          
          <View style={styles.referenceTag}>
            <Text style={styles.reference}>Surah Al-A'raf (7:205)</Text>
          </View>
        </View>
        
        <View style={styles.translationBox}>
          <Text style={styles.translation}>
            "And remember your Lord within yourself in humility and in fear without being apparent in speech..."
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "900",
    fontSize: 20,
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  quoteSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  arabicText: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "right",
    marginBottom: 12,
    color: "#065F46",
    lineHeight: 38,
  },
  referenceTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  reference: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  translationBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  translation: {
    fontSize: 15,
    color: "#1E293B",
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default QuickReminder;