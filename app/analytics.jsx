// ============================================
// FILE: screens/Analytics.jsx (MAIN SCREEN - CLEAN VERSION)
// ============================================
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import PeriodSelector from '../components/analytics/PeriodSelector';
import StatsGrid from '../components/analytics/StatsGrid';
import ChartSection from '../components/analytics/ChartSection';
import InsightsSection from '../components/analytics/InsightsSection';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const statsData = [
    { 
      title: 'Total Habits',
      value: '12',
      change: '+2',
      icon: 'checkmark-done-circle',
      color: '#10B981',
      gradient: ['#D1FAE5', '#ECFDF5']
    },
    { 
      title: 'Completion Rate',
      value: '85%',
      change: '+5%',
      icon: 'trending-up',
      color: '#6366F1',
      gradient: ['#E0E7FF', '#EEF2FF']
    },
    { 
      title: 'Current Streak',
      value: '18',
      change: '+3',
      icon: 'flame',
      color: '#F59E0B',
      gradient: ['#FEF3C7', '#FFFBEB']
    },
    { 
      title: 'Total Points',
      value: '2,450',
      change: '+180',
      icon: 'trophy',
      color: '#8B5CF6',
      gradient: ['#DDD6FE', '#EDE9FE']
    },
  ];

  const insightsData = [
    {
      icon: 'trophy',
      title: 'Great Week!',
      description: "You've completed 95% of your habits this week",
      iconColor: '#10B981',
      gradientColors: ['#10B981', '#059669']
    },
    {
      icon: 'flame',
      title: 'Streak Master',
      description: "You're on an 18-day streak! Keep it going!",
      iconColor: '#F59E0B',
      gradientColors: ['#F59E0B', '#D97706']
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Track your progress & insights</Text>
        </View>

        {/* Period Selector */}
        <PeriodSelector 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        {/* Stats Grid */}
        <StatsGrid stats={statsData} />

        {/* Chart Section */}
        <ChartSection />

        {/* Insights Section */}
        <InsightsSection insights={insightsData} />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  bottomSpace: {
    height: 40,
  },
});
