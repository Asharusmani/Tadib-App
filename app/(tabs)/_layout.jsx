// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#10B981", // Green active color
        tabBarInactiveTintColor: "#9CA3AF", // Gray inactive color
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -2 },
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
          
        },
      }}
    >
      {/* ---------- Home Tab ---------- */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      {/* ---------- Habit Tab ---------- */}
      <Tabs.Screen
        name="habit"
        options={{
          title: "Habits",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons 
              name={focused ? "check-circle" : "check-circle-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      {/* ---------- Planner Tab ---------- */}
      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "calendar" : "calendar-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      {/* ---------- Calendar Tab ---------- */}
      <Tabs.Screen
        name="calender"
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons 
              name={focused ? "calendar-month" : "calendar-month-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      {/* ---------- Profile Tab ---------- */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}