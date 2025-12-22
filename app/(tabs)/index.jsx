import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import HabitCard from "../../components/HabitCard";
import CustomCard from "../../components/customcard";
import MyProgressBar from "../../components/ui/progressbar";
import Streak from "../../components/ui/streak";
import AddHabitModal from "../../components/AddHabitModal"; // ⬅️ Import karein
import { Route } from "expo-router/build/Route";

const habits = [
  { id: '1', title: 'Read Quran', progress: 50, icon: '📖', color: '#10B981' },
  { id: '2', title: 'Meditation', progress: 80, icon: '🧘', color: '#8B5CF6' },
  { id: '3', title: 'Exercise', progress: 30, icon: '💪', color: '#F59E0B' },
  { id: '4', title: 'Drink Water', progress: 60, icon: '💧', color: '#3B82F6' },
];

const IndexScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>Good Morning ☀️</Text>
              <Text style={styles.username}>Tdib</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={() => router.push('/notification')}
            style={styles.notificationButton}
          >
            <View style={styles.notificationIcon}>
              <Ionicons name="notifications" size={24} color="#1F2937" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero Stats */}
        <Streak />
        <MyProgressBar />

        {/* Today's Habits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Habits</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>

          {habits.map((habit) => (
            <HabitCard 
              key={habit.id}
              title={habit.title}
              progress={habit.progress}
              icon={habit.icon}
              color={habit.color}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <CustomCard
              title="Add Habit"
              icon="add-circle"
              color="#10B981"
              image={require("../../assets/images/habit.png")}
              onPress={() => setModalVisible(true)} // ⬅️ Modal open karein
            />
            <CustomCard 
              title="Focus Mode"
              icon="timer"
              color="#8B5CF6"
              image={require("../../assets/images/focus.png")}
              onPress={() => router.push('/focus')}
            />
          </View>
          
          <View style={styles.actionsGrid}>
            <CustomCard 
              title="Groups"
              icon="people"
              color="#F59E0B"
              image={require("../../assets/images/group.png")}
            />
            <CustomCard
              title="Analytics"
              icon="stats-chart"
              color="#3B82F6"
              image={require("../../assets/images/analytics.png")}
              onPress={() => router.push('/analytics')}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal Component */}
      <AddHabitModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB" 
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#10B981",
  },
  userInfo: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 2,
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    position: "relative",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F3F4F6",
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  viewAll: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
  },
  actionsGrid: {
    flexDirection: "row",
    marginTop: 15,
    gap: 12,
    marginBottom: 2,
  },
});