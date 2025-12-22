// ============================================
// FILE: components/analytics/StatCard.jsx
// ============================================
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const StatCard = ({ title, value, change, icon, color, gradient }) => {
  return (
    <View style={styles.statCardWrapper}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statCard}
      >
        <View style={[styles.statIcon, { backgroundColor: color + '25' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        <View style={styles.statChange}>
          <Ionicons name="arrow-up" size={12} color={color} />
          <Text style={[styles.statChangeText, { color: color }]}>
            {change}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  statCardWrapper: {
    width: '48%',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statCard: {
    padding: 16,
    borderRadius: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  statTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statChangeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});