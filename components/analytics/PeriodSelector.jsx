// ============================================
// FILE: components/analytics/PeriodSelector.jsx
// ============================================
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const PeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  return (
    <View style={styles.periodSelector}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.periodButton,
            selectedPeriod === period.id && styles.periodButtonActive
          ]}
          onPress={() => onPeriodChange(period.id)}
          activeOpacity={0.7}
        >
          {selectedPeriod === period.id ? (
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.periodGradient}
            >
              <Text style={styles.periodTextActive}>{period.label}</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.periodText}>{period.label}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PeriodSelector;

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    backgroundColor: '#F8FAFC',
    padding: 6,
    borderRadius: 16,
  },
  periodButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  periodGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  periodButtonActive: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
    paddingVertical: 12,
  },
  periodTextActive: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});