import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  useWindowDimensions,
  Platform 
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CircularTimer from "../components/circulartimer";
import QuickReminder from "../components/ui/reminder";
import Mode from "../components/ui/mode";

const Focus = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  // Device detection
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;
  const isLandscape = width > height;
  
  return (
    <View style={styles.container}>
      {/* Responsive Header */}
      <View 
        style={[
          styles.header,
          { 
            marginTop: Platform.OS === 'ios' ? insets.top : 35,
            paddingTop: Platform.OS === 'android' ? 10 : 0,
          },
          isSmallPhone && styles.headerSmall,
          isTablet && styles.headerTablet,
        ]}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="chevron-back-circle-sharp" 
            size={isSmallPhone ? 30 : isTablet ? 40 : 34} 
            color="#2a2a2a" 
          />
        </TouchableOpacity>

        <Text 
          style={[
            styles.headertxt,
            isSmallPhone && styles.headertxtSmall,
            isTablet && styles.headertxtTablet,
          ]}
        >
          Focus Mode
        </Text>

        <View style={{ width: isSmallPhone ? 30 : isTablet ? 40 : 34 }} />
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          isSmallPhone && styles.scrollContentSmall,
          isTablet && styles.scrollContentTablet,
          isLandscape && !isTablet && styles.scrollContentLandscape,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Section */}
        <View 
          style={[
            styles.timerContainer,
            isSmallPhone && styles.timerContainerSmall,
            isTablet && styles.timerContainerTablet,
          ]}
        >
          <CircularTimer />
        </View>

        {/* Quick Reminder */}
        <View style={styles.reminderContainer}>
          <QuickReminder />
        </View>

        {/* Mode Cards */}
        <View style={styles.modeContainer}>
          <Mode />
        </View>

        {/* Bottom Spacing for Safe Area */}
        <View style={{ height: insets.bottom > 0 ? insets.bottom : 12 }} />
      </ScrollView>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerSmall: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTablet: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headertxt: {
    fontSize: 18,
    color: "#2a2a2a",
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headertxtSmall: {
    fontSize: 16,
  },
  headertxtTablet: {
    fontSize: 22,
    letterSpacing: -0.5,
  },
  
  // ScrollView Content
  scrollContent: {
    padding: 20,
  },
  scrollContentSmall: {
    padding: 16,
  },
  scrollContentTablet: {
    padding: 32,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  scrollContentLandscape: {
    paddingHorizontal: 32,
  },
  
  // Timer Section
  timerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  timerContainerSmall: {
    marginVertical: 12,
  },
  timerContainerTablet: {
    marginVertical: 32,
  },
  
  // Reminder Section
  reminderContainer: {
    marginBottom: 16,
  },
  
  // Mode Section
  modeContainer: {
    marginBottom: 1,
  },
});

