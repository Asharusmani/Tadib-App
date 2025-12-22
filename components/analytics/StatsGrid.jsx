// ============================================
// FILE: components/analytics/StatsGrid.jsx
// ============================================
import { View, StyleSheet } from 'react-native';
import React from 'react';
import StatCard from './StatCard';

const StatsGrid = ({ stats }) => {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </View>
  );
};

export default StatsGrid;

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
});
