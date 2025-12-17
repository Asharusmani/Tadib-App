import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const NotificationScreen = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "Daily Reminder",
      message: "Time to complete your morning meditation habit!",
      time: "10 min ago",
      unread: true,
      icon: "alarm",
      iconColor: "#FF6B6B"
    },
    {
      id: 2,
      title: "Streak Achievement",
      message: "Congratulations! You've maintained a 7-day streak!",
      time: "2 hours ago",
      unread: true,
      icon: "local-fire-department",
      iconColor: "#FF9800"
    },
    {
      id: 3,
      title: "Weekly Progress",
      message: "You've completed 85% of your habits this week.",
      time: "1 day ago",
      unread: true,
      icon: "trending-up",
      iconColor: "#4CAF50"
    },
    {
      id: 4,
      title: "Habit Completed",
      message: "Great job on completing your workout!",
      time: "2 days ago",
      unread: false,
      icon: "check-circle",
      iconColor: "#0E7A31"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2a2a2a" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Notifications</Text>
        
        {/* Mark all as read button */}
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id} 
            style={[
              styles.notificationCard,
              notification.unread && styles.unreadCard
            ]}
          >
            <View style={styles.notificationContent}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: `${notification.iconColor}15` }
              ]}>
                <MaterialIcons 
                  name={notification.icon} 
                  size={24} 
                  color={notification.iconColor} 
                />
              </View>
              
              <View style={styles.textContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
              
              {notification.unread && (
                <View style={styles.unreadDot} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2a2a2a",
    flex: 1,
    marginLeft: 15,
  },
  markAllButton: {
    padding: 5,
  },
  markAllText: {
    fontSize: 12,
    color: "#0E7A31",
    fontWeight: "500",
  },
  notificationList: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: "#f0f9f4",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2a2a2a",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0E7A31",
    marginLeft: 8,
    marginTop: 5,
  },
});