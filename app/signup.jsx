import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ CustomButton import
import CustomButton from "../components/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SignupScreen = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const fields = [
    "Username",
    "Phone Number",
    "Email",
    "Password",
    "Confirm Password",
  ];

  return (
    <View style={styles.container}>
      {/* ✅ Gradient Header */}
      <LinearGradient
        colors={["#059669", "#10B981", "#34D399"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Image
          source={require("../assets/images/logo tadib.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -60 }}
      >
        <View style={styles.card}>
          {/* ✅ Tabs Section with Gradient */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              style={styles.inactiveTabWrapper}
            >
              <Text style={styles.inactiveTab}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.activeTabWrapper}>
              {/* Sign Up Active Tab Background Gradient */}
              <LinearGradient
                colors={["#059669", "#34D399"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.activeTabGradient}
              >
                <Text style={styles.activeTabText}>Sign Up</Text>
              </LinearGradient>
              <View style={styles.underline} />
            </View>
          </View>

          {fields.map((f, i) => {
            const isPass = f === "Password";
            const isConfirm = f === "Confirm Password";

            return (
              <View key={i} style={{ marginBottom: 15 }}>
                <Text style={styles.label}>{f}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter ${f}`}
                    placeholderTextColor="#999"
                    secureTextEntry={
                      (isPass && !showPass) || (isConfirm && !showConfirmPass)
                    }
                  />

                  {isPass || isConfirm ? (
                    <TouchableOpacity
                      onPress={() =>
                        isPass
                          ? setShowPass(!showPass)
                          : setShowConfirmPass(!showConfirmPass)
                      }
                      style={styles.iconContainer}
                    >
                      <Ionicons
                        name={
                          (isPass ? showPass : showConfirmPass)
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={SCREEN_WIDTH * 0.055}
                        color="#00B368"
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.dotIcon} />
                  )}
                </View>
              </View>
            );
          })}

          <CustomButton
            title="Create Account"
            onPress={() => router.replace("/(tabs)")}
            iconName="person-add-outline"
          />
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  logoImage: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_WIDTH * 0.35,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: SCREEN_WIDTH * 0.08,
    borderRadius: 25,
    padding: SCREEN_WIDTH * 0.06,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    alignItems: "center",
  },
  activeTabWrapper: {
    flex: 1,
    alignItems: "center",
  },
  inactiveTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabGradient: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  inactiveTab: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },
  underline: {
    height: 3,
    width: 30,
    backgroundColor: "#059669",
    alignSelf: "center",
    marginTop: 4,
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    height: 58,
    borderWidth: 1,
    borderColor: "#EEE",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#000",
    textAlignVertical: "center",
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  iconContainer: {
    height: "100%",
    justifyContent: "center",
    paddingRight: 15,
  },
  dotIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00B368",
    opacity: 0.6,
    marginRight: 15,
  },
});

export default SignupScreen;