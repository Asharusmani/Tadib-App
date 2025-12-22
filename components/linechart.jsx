// ============================================
// FILE: components/LineChart.jsx
// ============================================
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const LineChartComponent = () => {
  // Current streak data (last 7 days)
  const currentStreakData = [
    { day: 'Mon', value: 65, date: 'Dec 14' },
    { day: 'Tue', value: 78, date: 'Dec 15' },
    { day: 'Wed', value: 82, date: 'Dec 16' },
    { day: 'Thu', value: 75, date: 'Dec 17' },
    { day: 'Fri', value: 88, date: 'Dec 18' },
    { day: 'Sat', value: 92, date: 'Dec 19' },
    { day: 'Sun', value: 95, date: 'Dec 20' },
  ];

  // Last streak data (previous 7 days)
  const lastStreakData = [
    { day: 'Mon', value: 45, date: 'Dec 7' },
    { day: 'Tue', value: 52, date: 'Dec 8' },
    { day: 'Wed', value: 48, date: 'Dec 9' },
    { day: 'Thu', value: 55, date: 'Dec 10' },
    
  ];

  const maxValue = 100;
  const chartWidth = width - 72;
  const chartHeight = 200;
  const padding = 20;

  // Generate path for line chart
  const generatePath = (data) => {
    const stepX = (chartWidth - padding * 2) / (data.length - 1);
    let path = '';

    data.forEach((point, index) => {
      const x = padding + index * stepX;
      const y = chartHeight - (point.value / maxValue) * (chartHeight - 40) - 20;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevX = padding + (index - 1) * stepX;
        const prevY = chartHeight - (data[index - 1].value / maxValue) * (chartHeight - 40) - 20;
        const cpX = (prevX + x) / 2;
        path += ` Q ${cpX} ${prevY}, ${x} ${y}`;
      }
    });

    return path;
  };

  const currentPath = generatePath(currentStreakData);
  const lastPath = generatePath(lastStreakData);

  const currentAvg = (currentStreakData.reduce((sum, d) => sum + d.value, 0) / currentStreakData.length).toFixed(0);
  const lastAvg = (lastStreakData.reduce((sum, d) => sum + d.value, 0) / lastStreakData.length).toFixed(0);

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.headerStats}>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#FEF3C7', '#FFFBEB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statGradient}
          >
            <View style={styles.statIconWrapper}>
              <Ionicons name="flame" size={20} color="#F59E0B" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Current Avg</Text>
              <Text style={[styles.statValue, { color: '#F59E0B' }]}>{currentAvg}%</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.statCard}>
          <LinearGradient
            colors={['#E0E7FF', '#EEF2FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statGradient}
          >
            <View style={styles.statIconWrapper}>
              <Ionicons name="analytics" size={20} color="#6366F1" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Last Avg</Text>
              <Text style={[styles.statValue, { color: '#6366F1' }]}>{lastAvg}%</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Chart Title */}
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Completion Rate Trends</Text>
        <View style={styles.improvementBadge}>
          <Ionicons name="trending-up" size={12} color="#10B981" />
          <Text style={styles.improvementText}>+{(currentAvg - lastAvg).toFixed(0)}%</Text>
        </View>
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <SvgLinearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#F59E0B" stopOpacity="0.8" />
              <Stop offset="1" stopColor="#F59E0B" stopOpacity="0.3" />
            </SvgLinearGradient>
            
            <SvgLinearGradient id="lastGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#6366F1" stopOpacity="0.8" />
              <Stop offset="1" stopColor="#6366F1" stopOpacity="0.3" />
            </SvgLinearGradient>
          </Defs>

          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map((value, index) => {
            const y = chartHeight - (value / maxValue) * (chartHeight - 40) - 20;
            return (
              <Path
                key={index}
                d={`M ${padding} ${y} L ${chartWidth - padding} ${y}`}
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Last Streak Line */}
          <Path
            d={lastPath}
            stroke="url(#lastGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current Streak Line */}
          <Path
            d={currentPath}
            stroke="url(#currentGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points - Last Streak */}
          {lastStreakData.map((point, index) => {
            const stepX = (chartWidth - padding * 2) / (lastStreakData.length - 1);
            const x = padding + index * stepX;
            const y = chartHeight - (point.value / maxValue) * (chartHeight - 40) - 20;
            return (
              <Circle
                key={`last-${index}`}
                cx={x}
                cy={y}
                r="5"
                fill="#6366F1"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            );
          })}

          {/* Data Points - Current Streak */}
          {currentStreakData.map((point, index) => {
            const stepX = (chartWidth - padding * 2) / (currentStreakData.length - 1);
            const x = padding + index * stepX;
            const y = chartHeight - (point.value / maxValue) * (chartHeight - 40) - 20;
            return (
              <Circle
                key={`current-${index}`}
                cx={x}
                cy={y}
                r="5"
                fill="#F59E0B"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            );
          })}
        </Svg>

        {/* X-axis Labels */}
        <View style={styles.xAxisLabels}>
          {currentStreakData.map((point, index) => (
            <Text key={index} style={styles.xLabel}>
              {point.day}
            </Text>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <LinearGradient
            colors={['#F59E0B', '#FCD34D']}
            style={styles.legendDot}
          />
          <Text style={styles.legendText}>Current Streak</Text>
        </View>
        <View style={styles.legendItem}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.legendDot}
          />
          <Text style={styles.legendText}>Last Streak</Text>
        </View>
      </View>

      {/* Insights */}
      <View style={styles.insightsContainer}>
        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons name="rocket" size={20} color="#10B981" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Great Progress!</Text>
            <Text style={styles.insightText}>
              You're {(currentAvg - lastAvg).toFixed(0)}% better than last week
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LineChartComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statGradient: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  statIconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statInfo: {
    flexWrap:'wrap',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  improvementText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingBottom:10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  xLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  insightsContainer: {
    gap: 10,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0FDF4',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  insightIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  insightText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    lineHeight: 16,
  },
});

