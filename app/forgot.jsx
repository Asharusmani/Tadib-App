import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ CustomButton ko import karein
import CustomButton from "../components/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo tadib.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Main Card Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll help you reset your password.
        </Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="demo@gmail.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
          <View style={styles.dotIcon} />
        </View>

        {/* ✅ Reusable CustomButton for Reset Code */}
        <CustomButton
          title="Send Reset Code"
          onPress={() => console.log("Reset Code Sent")}
          color="#00B368"
          iconName="paper-plane-outline" // Reset ke liye professional icon
        />

        {/* Back to Login Link */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backLink}
          activeOpacity={0.6}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    height: "35%",
    backgroundColor: "#00B368",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoImage: { width: SCREEN_WIDTH * 0.35, height: SCREEN_WIDTH * 0.35 },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: SCREEN_WIDTH * 0.09,
    marginTop: -60,
    borderRadius: 25,
    padding: SCREEN_WIDTH * 0.07,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 8 },
  subtitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 18,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    marginBottom: 5, // CustomButton ke andar margin hai isliye thora kam kiya
    width: "100%",
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
    color: "#333",
    textAlignVertical: "center",
    ...Platform.select({ android: { includeFontPadding: false } }),
  },
  dotIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00B368",
    opacity: 0.6,
    marginRight: 15,
  },
  backLink: { marginTop: 25 },
  backText: { color: "#00B368", fontWeight: "bold", fontSize: 14 },
});

export default ForgotPasswordScreen;