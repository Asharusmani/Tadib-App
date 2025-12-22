// ============================================
// FILE: components/analytics/ChartSection.jsx
// ============================================
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import LineChartComponent from '../linechart';

const ChartSection = () => {
  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <View>
          <Text style={styles.chartTitle}>Progress Overview</Text>
          <Text style={styles.chartSubtitle}>Daily completion tracking</Text>
        </View>
        <TouchableOpacity style={styles.chartMenuButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.chartContainer}>
        <LineChartComponent />
      </View>
    </View>
  );
};

export default ChartSection;

const styles = StyleSheet.create({
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  chartMenuButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: 10,
  },
});
