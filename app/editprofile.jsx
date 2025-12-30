import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ Custom Gradient Button Component with your specific colors
const CustomButton = ({ title, onPress, iconName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.buttonWrapper}
    >
      <LinearGradient
        colors={["#059669", "#34D399"]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <Text style={styles.buttonText}>{title}</Text>
        {iconName && <Ionicons name={iconName} size={20} color="white" />}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function EditProfileScreen() {
  const [selectedGender, setSelectedGender] = useState("Male");

  const handleUpdate = () => {
    alert("Profile Updated Successfully! 🎉");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#F8F9FA", "#E9ECEF"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <LinearGradient
              colors={["#059669", "#10B981", "#34D399"]}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Image
              source={require("../assets/images/logo tadib.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              {/* Back Button & Title */}
              <View style={styles.topRow}>
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={styles.backBtn}
                  activeOpacity={0.6}
                >
                  <Ionicons name="arrow-back" size={24} color="#1DB978" />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>Edit Profile</Text>
              </View>

              {/* Form Fields */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Saad Osama"
                  placeholderTextColor="#A0A0A0"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+123456789"
                  keyboardType="phone-pad"
                  placeholderTextColor="#A0A0A0"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="demo@gmail.com"
                  keyboardType="email-address"
                  placeholderTextColor="#A0A0A0"
                />
              </View>

              {/* Gender Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderRow}>
                  {["Male", "Female", "Other"].map((gender) => (
                    <TouchableOpacity
                      key={gender}
                      onPress={() => setSelectedGender(gender)}
                      style={[
                        styles.genderChip,
                        selectedGender === gender && styles.selectedChip,
                      ]}
                    >
                      <Text
                        style={[
                          styles.genderText,
                          selectedGender === gender &&
                            styles.selectedGenderText,
                        ]}
                      >
                        {gender}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* ✅ Update Profile Button with Specific Gradient */}
              <CustomButton
                title="Update Profile"
                onPress={handleUpdate}
                iconName="chevron-forward"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 240,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    overflow: "hidden",
  },
  logoImage: { width: 140, height: 140 },
  scrollContent: { paddingTop: 180, paddingBottom: 40, alignItems: "center" },
  card: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  backBtn: {
    backgroundColor: "#F0FDF4",
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  cardTitle: { fontSize: 20, fontWeight: "800", color: "#333" },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  genderRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  genderChip: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  selectedChip: { backgroundColor: "#F0FDF4", borderColor: "#1DB978" },
  genderText: { fontSize: 14, color: "#9CA3AF", fontWeight: "600" },
  selectedGenderText: { color: "#1DB978" },

  // Button styles
  buttonWrapper: { marginTop: 10, borderRadius: 15, overflow: "hidden" },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
});