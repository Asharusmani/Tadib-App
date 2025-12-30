// ============================================
// 4. ProfileScreen.jsx (Main Screen)
// ============================================
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Achievements from "../components/Achievements";
import ProfileHeader from "../components/ProfileHeader";
import YourStats from "../components/YourStats";
import CustomHeader from "@/components/CustomHeader";

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need gallery access to change your profile picture.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Profile"
        showBack={false}
        showPlus={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name="Tadib"
          email="Saadosama82@gmail.com"
          bio="Building better habits, one day at a time 🌟"
          joinedDate="January 2024"
          imageUri={profileImage}
          onPickImage={handlePickImage}
        />

        <YourStats />
        <Achievements />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 60,
  },
});

export default ProfileScreen;