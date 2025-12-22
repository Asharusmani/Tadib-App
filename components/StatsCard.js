import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const StatsCard = ({ 
  value, 
  label, 
  icon, 
  gradientColors, 
  iconGradientColors,
  badgeText,
  badgeColor,
  badgeTextColor 
}) => {
  return (
    <View style={styles.statCard}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statCardGradient}
      >
        <View style={styles.statIconContainer}>
          <LinearGradient
            colors={iconGradientColors}
            style={styles.statIcon}
          >
            <Ionicons name={icon} size={20} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={[styles.statBadge, badgeColor && { backgroundColor: badgeColor }]}>
          <Text style={[styles.statBadgeText, badgeTextColor && { color: badgeTextColor }]}>
            {badgeText}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  statCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -1,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  statBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    letterSpacing: 0.3,
  },
});

export default StatsCard;