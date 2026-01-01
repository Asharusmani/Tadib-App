// screens/ModernPlannerScreen.jsx
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Alert, Platform, StatusBar } from "react-native";
import Header from "../../components/ui/Header";
import RangeInfoCard from "../../components/ui/RangeInfoCard";
import Calendar from "../../components/ui/Calendar";
import StatsCards from "../../components/ui/StatsCards";
import HabitsList from "../../components/ui/HabitsList";
import CreateHabitModal from "../../components/ui/CreateHabitModal";

export default function ModernPlannerScreen() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [habits, setHabits] = useState([]);

  const handleDateClick = (dateKey) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateKey);
      setEndDate(null);
    } else {
      if (dateKey > startDate) {
        setEndDate(dateKey);
      } else if (dateKey < startDate) {
        setEndDate(startDate);
        setStartDate(dateKey);
      } else {
        setStartDate(dateKey);
        setEndDate(null);
      }
    }
  };

  const getDaysCount = () => {
    if (!startDate) return 0;
    if (!endDate) return 1;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const formatDateForDisplay = (dateKey) => {
    if (!dateKey) return "";
    const date = new Date(dateKey);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleCreateHabit = () => {
    if (!startDate) {
      Alert.alert("Error", "Please select at least a start date!");
      return;
    }
    setModalVisible(true);
  };

  const handleSaveHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
    setModalVisible(false);
    setStartDate(null);
    setEndDate(null);
    Alert.alert("Success", `Habit created for ${newHabit.daysCount} day(s)!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <RangeInfoCard
          startDate={startDate}
          endDate={endDate}
          daysCount={getDaysCount()}
          onCreateHabit={handleCreateHabit}
          formatDate={formatDateForDisplay}
        />

        <Calendar
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
        />

        <StatsCards daysCount={getDaysCount()} habitsCount={habits.length} />

        <HabitsList habits={habits} />
      </ScrollView>

      <CreateHabitModal
        visible={modalVisible}
        startDate={startDate}
        endDate={endDate}
        daysCount={getDaysCount()}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveHabit}
        formatDate={formatDateForDisplay}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
});