// ============================================
// 3. Achievements.jsx - Modern Design
// ============================================
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AchievementItem = ({ iconName, iconColor, bgColor, label, unlocked = true }) => (
  <View style={styles.achievementContainer}>
    <View style={[styles.iconCircle, { backgroundColor: unlocked ? bgColor : "#F3F4F6" }]}>
      <Icon 
        name={iconName} 
        size={36} 
        color={unlocked ? "#FFF" : "#D1D5DB"} 
      />
      {unlocked && (
        <>
          <View style={[styles.pulseRing, { backgroundColor: bgColor }]} />
          <View style={[styles.shimmer, { backgroundColor: bgColor }]} />
        </>
      )}
    </View>
    <Text style={[styles.achievementLabel, { color: unlocked ? "#1F2937" : "#9CA3AF" }]}>
      {label}
    </Text>
  </View>
);

const Achievements = () => {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.decorativeLine} />
      </View>

      <View style={styles.achievementsCard}>
        <View style={styles.achievementsRow}>
          <AchievementItem
            iconName="star"
            bgColor="#A78BFA"
            label="First week"
            unlocked={true}
          />
          <AchievementItem
            iconName="trophy"
            bgColor="#F59E0B"
            label="15 days"
            unlocked={true}
          />
          <AchievementItem
            iconName="medal"
            bgColor="#EC4899"
            label="30 days"
            unlocked={true}
          />
          <AchievementItem
            iconName="crown"
            bgColor="#FCD34D"
            label="60 days"
            unlocked={false}
          />
        </View>
      </View>

      {/* Logout Button */}
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          { 
            backgroundColor: pressed ? "#FEE2E2" : "#FFFFFF",
            transform: [{ scale: pressed ? 0.98 : 1 }]
          },
        ]}
      >
        <View style={styles.logoutIconContainer}>
          <Icon name="logout" size={22} color="#EF4444" />
        </View>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 24,
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.5,
  },
  decorativeLine: {
    width: 60,
    height: 4,
    backgroundColor: "#A78BFA",
    borderRadius: 2,
    marginTop: 8,
  },
  achievementsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 28,
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#A78BFA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#F9FAFB",
  },
  achievementsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  achievementContainer: {
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 55,
    height:55,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  pulseRing: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 22,
    opacity: 0.2,
  },
  shimmer: {
    position: "absolute",
    width: 30,
    height: 72,
    opacity: 0.3,
    transform: [{ rotate: "45deg" }],
    left: -20,
  },
  achievementLabel: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#FEE2E2",
    elevation: 4,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  logoutIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});

export default Achievements;