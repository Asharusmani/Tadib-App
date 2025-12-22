import React, { useState } from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  useWindowDimensions, 
  Platform,
  Animated 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import StatsCard from "../../components/StatsCard";
import SearchBar from "../../components/SearchBar";
import CategoryTabs from "../../components/CategoryTabs";
import HabitCard from "../../components/HabitCard";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddHabitModal from "../../components/AddHabitModal";

// Habits data with category field
const habitsData = [
  { id: '1', title: 'Read Quran', progress: 50, icon: '📖', color: '#10B981', category: 'spiritual', streak: 15 },
  { id: '2', title: 'Morning Prayer', progress: 90, icon: '🤲', color: '#8B5CF6', category: 'spiritual', streak: 30 },
  { id: '3', title: 'Meditation', progress: 80, icon: '🧘', color: '#A78BFA', category: 'health', streak: 12 },
  { id: '4', title: 'Exercise', progress: 30, icon: '💪', color: '#F59E0B', category: 'health', streak: 5 },
  { id: '5', title: 'Drink Water', progress: 60, icon: '💧', color: '#3B82F6', category: 'health', streak: 8 },
  { id: '6', title: 'Learn Arabic', progress: 45, icon: '📚', color: '#06B6D4', category: 'Learning', streak: 20 },
  { id: '7', title: 'Read Book', progress: 70, icon: '📕', color: '#EC4899', category: 'Learning', streak: 10 },
  { id: '8', title: 'Wake Up Early', progress: 85, icon: '⏰', color: '#F59E0B', category: 'Discipline', streak: 25 },
];

export default function HabitScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Device detection
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;

  // Filter habits
  const filteredHabits = habitsData.filter((habit) => {
    const matchesSearch = habit.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || habit.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const activeHabits = habitsData.length;
  const totalProgress = Math.round(habitsData.reduce((sum, habit) => sum + habit.progress, 0) / habitsData.length);
  const totalStreak = habitsData.reduce((sum, habit) => sum + habit.streak, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFBFC" />

      {/* Premium Header with Gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          styles.headerContainer,
          { 
            paddingTop: Platform.OS === 'ios' ? insets.top + 16 : 50,
          },
        ]}
      >
        <View style={[
          styles.headerContent,
          isSmallPhone && styles.headerContentSmall,
          isTablet && styles.headerContentTablet,
        ]}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBadge}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBadgeGradient}
              >
                <Ionicons name="checkmark-done" size={24} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <View>
              <Text style={[
                styles.title,
                isSmallPhone && styles.titleSmall,
                isTablet && styles.titleTablet,
              ]}>
                My Habits
              </Text>
              <View style={styles.subtitleRow}>
                <View style={styles.liveDot} />
                <Text style={[
                  styles.subtitle,
                  isSmallPhone && styles.subtitleSmall,
                  isTablet && styles.subtitleTablet,
                ]}>
                  {activeHabits} Active • {totalStreak} Day Streak
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
            <Ionicons name="notifications" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
          isSmallPhone && styles.scrollContentSmall,
          isTablet && styles.scrollContentTablet,
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Premium Stats Cards with Gradient */}
        <View style={[
          styles.statsRow,
          isSmallPhone && styles.statsRowSmall,
          isTablet && styles.statsRowTablet,
        ]}>
          <StatsCard
            value={activeHabits}
            label="Active Habits"
            icon="checkmark-done-circle"
            gradientColors={['#ECFDF5', '#D1FAE5']}
            iconGradientColors={['#10B981', '#059669']}
            badgeText="In Progress"
            badgeColor="#D1FAE5"
            badgeTextColor="#059669"
          />

          <StatsCard
            value={`${totalProgress}%`}
            label="Avg Progress"
            icon="trophy"
            gradientColors={['#FEF3C7', '#FEF9C3']}
            iconGradientColors={['#F59E0B', '#D97706']}
            badgeText="Overall"
            badgeColor="#FEF3C7"
            badgeTextColor="#D97706"
          />
        </View>

        {/* Premium Action Button with Animation */}
        <TouchableOpacity onPress={() => setModalVisible(true)}
          style={[
            styles.addButtonContainer,
            isSmallPhone && styles.addButtonContainerSmall,
            isTablet && styles.addButtonContainerTablet,
          ]} 
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#059669', '#10B981','#34D399']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.addButton,
              isSmallPhone && styles.addButtonSmall,
              isTablet && styles.addButtonTablet,
            ]}
          >
            <View style={styles.addButtonContent}>
              <View style={styles.addIconContainer}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.addButtonTextContainer}>
                <Text style={[
                  styles.addButtonText,
                  isSmallPhone && styles.addButtonTextSmall,
                  isTablet && styles.addButtonTextTablet,
                ]}>
                  Create New Habit
                </Text>
                <Text style={styles.addButtonSubtext}>Start building better you</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Search Bar */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search your habits..." 
        />

        {/* Category Tabs */}
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* Results Counter */}
        {(searchQuery || activeCategory !== "all") && (
          <View style={styles.resultsCounter}>
            <View style={styles.resultsLeft}>
              <Ionicons name="funnel" size={16} color="#059669" />
              <Text style={styles.resultsText}>
                {filteredHabits.length} {filteredHabits.length === 1 ? 'habit' : 'habits'} found
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
              <Ionicons name="close-circle" size={16} color="#059669" />
            </TouchableOpacity>
          </View>
        )}

        {/* Habits List */}
        {filteredHabits.length > 0 ? (
          <View style={styles.habitsList}>
            <View style={styles.habitsHeader}>
              <Text style={styles.habitsHeaderText}>Your Habits</Text>
              <Text style={styles.habitsCount}>{filteredHabits.length}</Text>
            </View>
            {filteredHabits.map((habit, index) => (
              <View 
                key={habit.id}
                style={[
                  styles.habitCardWrapper,
                  index === filteredHabits.length - 1 && styles.habitCardWrapperLast
                ]}
              >
                <HabitCard
                  title={habit.title}
                  progress={habit.progress}
                  icon={habit.icon}
                  color={habit.color}
                  streak={habit.streak}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={[
            styles.emptyState,
            isSmallPhone && styles.emptyStateSmall,
            isTablet && styles.emptyStateTablet,
          ]}>
            <LinearGradient
              colors={['#F8FAFC', '#F1F5F9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emptyCard}
            >
              <View style={[
                styles.emptyCircle,
                isSmallPhone && styles.emptyCircleSmall,
                isTablet && styles.emptyCircleTablet,
              ]}>
                <LinearGradient
                  colors={['#E0E7FF', '#C7D2FE']}
                  style={styles.emptyCircleGradient}
                >
                  <Ionicons 
                    name={searchQuery ? "search" : "funnel"} 
                    size={isSmallPhone ? 40 : isTablet ? 56 : 48} 
                    color="#059669"
                  />
                </LinearGradient>
              </View>
              <Text style={[
                styles.emptyTitle,
                isSmallPhone && styles.emptyTitleSmall,
                isTablet && styles.emptyTitleTablet,
              ]}>
                No Habits Found
              </Text>
              <Text style={[
                styles.emptySubtitle,
                isSmallPhone && styles.emptySubtitleSmall,
                isTablet && styles.emptySubtitleTablet,
              ]}>
                {searchQuery 
                  ? `No results for "${searchQuery}"`
                  : `No habits in ${activeCategory} category`}
              </Text>
              <TouchableOpacity 
                style={[
                  styles.resetButton,
                  isSmallPhone && styles.resetButtonSmall,
                  isTablet && styles.resetButtonTablet,
                ]}
                onPress={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                <LinearGradient
                  colors={['#059669', '#10B981','#34D399']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.resetButtonGradient}
                >
                  <Ionicons name="refresh" size={18} color="#FFFFFF" />
                  <Text style={[
                    styles.resetButtonText,
                    isSmallPhone && styles.resetButtonTextSmall,
                    isTablet && styles.resetButtonTextTablet,
                  ]}>
                    Clear All Filters
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
       {/* Modal Component */}
      <AddHabitModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FAFBFC",
  },
  
  // Header Styles
  headerContainer: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContentSmall: {
    paddingHorizontal: 16,
  },
  headerContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  iconBadgeGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  titleSmall: {
    fontSize: 20,
  },
  titleTablet: {
    fontSize: 28,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  subtitleSmall: {
    fontSize: 12,
  },
  subtitleTablet: {
    fontSize: 15,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  
  // Scroll Content
  scrollContent: { 
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scrollContentSmall: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 32,
  },
  
  // Stats Cards
  statsRow: { 
    flexDirection: "row", 
    gap: 16,
    marginBottom: 24,
  },
  statsRowSmall: {
    gap: 12,
    marginBottom: 20,
  },
  statsRowTablet: {
    gap: 20,
    marginBottom: 32,
  },
  
  // Add Button
  addButtonContainer: {
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: "'#059669'",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  addButtonContainerSmall: {
    marginBottom: 20,
    borderRadius: 20,
  },
  addButtonContainerTablet: {
    marginBottom: 32,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  addButtonSmall: {
    padding: 16,
  },
  addButtonTablet: {
    padding: 24,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  addIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonTextContainer: {
    gap: 2,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  addButtonTextSmall: {
    fontSize: 14,
  },
  addButtonTextTablet: {
    fontSize: 18,
  },
  addButtonSubtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
  },
  
  // Results Counter
  resultsCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  resultsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  
  // Habits List
  habitsList: {
    marginTop: 6,
  },
  habitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  habitsHeaderText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  habitsCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  habitCardWrapper: {
    marginBottom: 12,
  },
  habitCardWrapperLast: {
    marginBottom: 0,
  },
  
  // Empty State
  emptyState: {
    marginTop: 24,
  },
  emptyStateSmall: {
    marginTop: 20,
  },
  emptyStateTablet: {
    marginTop: 32,
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 24,
  },
  emptyCircleSmall: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  emptyCircleTablet: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 32,
  },
  emptyCircleGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1E293B",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  emptyTitleSmall: {
    fontSize: 19,
    marginBottom: 6,
  },
  emptyTitleTablet: {
    fontSize: 26,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
    fontWeight: '500',
  },
  emptySubtitleSmall: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  emptySubtitleTablet: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 32,
  },
  resetButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  resetButtonSmall: {
    borderRadius: 14,
  },
  resetButtonTablet: {
    borderRadius: 20,
  },
  resetButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  resetButtonTextSmall: {
    fontSize: 14,
  },
  resetButtonTextTablet: {
    fontSize: 17,
  },
  
  bottomSpace: {
    height: 40,
  },
});