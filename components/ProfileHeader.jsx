// ============================================
// 2. ProfileHeader.jsx
// ============================================
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileHeader = ({
  name,
  email,
  bio,
  joinedDate,
  imageUri,
  onPickImage,
}) => (
  <View style={styles.profileCard}>
    {/* Decorative Background Gradient */}
    <View style={styles.decorativeBackground} />

    {/* Profile Image Section */}
    <View style={styles.imageContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" }}
          style={styles.profileImage}
        />
      </View>

      <TouchableOpacity
        style={styles.uploadIcon}
        onPress={onPickImage}
        activeOpacity={0.7}
      >
        <Icon name="camera" size={18} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.badgeIcon}>
        <Icon name="medal" size={22} color="#FFF" />
      </View>
    </View>

    {/* User Info */}
    <Text style={styles.userName}>{name}</Text>
    <Text style={styles.userEmail}>{email}</Text>
    <Text style={styles.userBio}>{bio}</Text>

    {/* Edit Profile Button */}
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => router.push("/editprofile")}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Edit Profile</Text>
    </TouchableOpacity>

    {/* Joined Date */}
    <View style={styles.dateContainer}>
      <Icon name="calendar-month-outline" size={16} color="#6B7280" />
      <Text style={styles.joinedDate}>Joined {joinedDate}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  decorativeBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor:  "#04785711",
    transform: [{ translateX: 80 }, { translateY: -80 }],
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  imageWrapper: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#F9FAFB",
    padding: 4,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 52,
    backgroundColor: "#E5E7EB",
  },
  uploadIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#3B82F6",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    elevation: 4,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  badgeIcon: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#F59E0B",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    elevation: 4,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  userBio: {
    textAlign: "center",
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  editButton: {
    backgroundColor: "#059669", 
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 24,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignContent:"center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  joinedDate: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default ProfileHeader;