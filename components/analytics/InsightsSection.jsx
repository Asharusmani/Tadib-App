// ============================================
// FILE: components/analytics/InsightsSection.jsx
// ============================================
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import InsightCard from './InsightCard';

const InsightsSection = ({ insights }) => {
  return (
    <View style={styles.insightsSection}>
      <Text style={styles.sectionTitle}>Quick Insights</Text>
      {insights.map((insight, index) => (
        <InsightCard key={index} {...insight} />
      ))}
    </View>
  );
};

export default InsightsSection;

const styles = StyleSheet.create({
  insightsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
});