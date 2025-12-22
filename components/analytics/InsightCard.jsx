// ============================================
// FILE: components/analytics/InsightCard.jsx
// ============================================
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const InsightCard = ({ icon, title, description, iconColor, gradientColors }) => {
  return (
    <View style={styles.insightCard}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.insightGradient}
      >
        <View style={styles.insightIcon}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.insightContent}>
          <Text style={styles.insightTitle}>{title}</Text>
          <Text style={styles.insightText}>{description}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default InsightCard;

const styles = StyleSheet.create({
  insightCard: {
    marginBottom: 12,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  insightGradient: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  insightContent: {
    flex: 1,
    gap: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  insightText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
});
