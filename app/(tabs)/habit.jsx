import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

import StatsCard from "../../components/StatsCard";
import SearchBar from "../../components/SearchBar";
import CategoryTabs from "../../components/CategoryTabs";
import HabitCard from "../../components/HabitCard";

const habitsData = [
  {
    id: 1,
    title: "Morning Prayer",
    time: "5:30 AM",
    streakDays: 12,
    completedTimes: 120,
    points: 15,
    skipDaysAvailable: 2,
    category: "spiritual",
  },
  {
    id: 2,
    title: "Exercising 20-30 minutes daily",
    time: "7:30 AM",
    streakDays: 12,
    completedTimes: 120,
    points: 15,
    skipDaysAvailable: 2,
    category: "health",
  },
];

export default function HabitScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredHabits = habitsData.filter((habit) => {
    const matchesSearch = habit.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || habit.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Habits</Text>
          <Text style={styles.subtitle}>Manage your daily routines</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatsCard title="Active Habits" value={12} subtitle="Habits" />
          <StatsCard title="Total Habits" value="2,684" subtitle="+6 Today" />
        </View>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search habits..." />

        {/* Category Tabs */}
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Habits List */}
        <View style={styles.habitsList}>
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                title={habit.title}
                time={habit.time}
                streakDays={habit.streakDays}
                completedTimes={habit.completedTimes}
                points={habit.points}
                skipDaysAvailable={habit.skipDaysAvailable}
              />
            ))
          ) : (
            <Text style={styles.noHabits}>No habits found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  content: { padding: 20, paddingBottom: 24,marginTop:30 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20,gap:10 },
  habitsList: { marginTop: 8 },
  noHabits: { textAlign: "center", marginTop: 40, color: "#999" },
});
