// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000000ff",
        tabBarInactiveTintColor: "#454444ff",
        tabBarStyle: {
          backgroundColor: "#fffbfbff",
          borderTopWidth: 0,
          elevation: 2,
          shadowOpacity: 1,
           // optional, height increase karni ho to
        }
      }}
    >
      {/* ---------- 1st Tab: Index (main) ---------- */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />


      {/* ---------- 3rd Tab: Habit ---------- */}
      <Tabs.Screen
        name="habit"
        options={{
          title: "Habit",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="check-circle" size={24} color={color} />
          ),
        }}
      />




      {/* ---------- 2nd Tab: Home ---------- */}
      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="clipboard-pencil" size={24} color={color} />
          ),
        }}
      />


      {/* ---------- 2nd Tab: Home ---------- */}
      <Tabs.Screen
        name="calender"
        options={{
          title: "calender",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />



      {/* ---------- 2nd Tab: Home ---------- */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// <Tabs.Screen
//   name="home"
//   options={{
//     title: "Home",
//     tabBarIcon: ({ focused, color, size }) =>
//       focused ? <Foundation name="home" size={size} color={color} />
//               : <FontAwesome name="home" size={size} color={color} />,
//   }}
// />