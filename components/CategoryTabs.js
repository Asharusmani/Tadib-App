import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const categories = [
  { id: 'all', label: 'All', icon: 'apps' },
  { id: 'spiritual', label: 'Spiritual', icon: 'moon' },
  { id: 'health', label: 'Health', icon: 'fitness' },
  { id: 'Learning', label: 'Learning', icon: 'book' },
  { id: 'Discipline', label: 'Discipline', icon: 'shield-checkmark' },
];

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => onCategoryChange(category.id)}
              activeOpacity={0.7}
              style={styles.tabButton}
            >
              {isActive ? (
                <LinearGradient
                  colors={['#059669', '#10B981']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.activeTab}
                >
                  <Ionicons name={category.icon} size={18} color="#FFFFFF" />
                  <Text style={styles.activeTabText}>{category.label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTab}>
                  <Ionicons name={category.icon} size={18} color="#64748B" />
                  <Text style={styles.inactiveTabText}>{category.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 10,
  },
  tabButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.2,
  },
});