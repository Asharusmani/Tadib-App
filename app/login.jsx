import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";

// ✅ Use AuthContext instead of direct authService
import { useAuth } from "../context/AuthContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Get login function from context
  const { login } = useAuth();

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      
      // ✅ Use context login function
      const result = await login({
        email: email.trim().toLowerCase(),
        password: password
      });

      if (result.success) {
        // ✅ Automatically navigate to home (handled by context)
        router.replace("/(tabs)");
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Card */}
      <View style={styles.card}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <View style={styles.activeTabWrapper}>
            <LinearGradient
              colors={["#059669", "#34D399"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInGradient}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </LinearGradient>
            <View style={styles.underline} />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/signup")}
            style={styles.inactiveTabWrapper}
          >
            <Text style={styles.inactiveTab}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
          <View style={styles.dotIcon} />
        </View>

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
            disabled={loading}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={SCREEN_WIDTH * 0.055}
              color="#00B368"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity 
          onPress={() => router.push("/forgot")}
          disabled={loading}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#059669" />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        ) : (
          <CustomButton
            title="Sign In"
            onPress={handleLogin}
            iconName="log-in-outline"
          />
        )}

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons */}
        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#f42727" }]}
          disabled={loading}
        >
          <Text style={styles.socialBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialBtn, styles.fbMargin]}
          disabled={loading}
        >
          <Text style={styles.socialBtnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoImage: { width: SCREEN_WIDTH * 0.35, height: SCREEN_WIDTH * 0.35 },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: SCREEN_WIDTH * 0.08,
    marginTop: -60,
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
  },
  activeTabWrapper: { flex: 1, alignItems: "center" },
  inactiveTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signInGradient: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  signInText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  inactiveTab: { color: "#999", fontSize: 16, fontWeight: "600" },
  underline: {
    height: 3,
    width: 30,
    backgroundColor: "#059669",
    marginTop: 6,
    borderRadius: 2,
  },
  label: { fontSize: 14, color: "#333", marginBottom: 8, fontWeight: "600" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    marginBottom: 15,
    height: 58,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#000",
  },
  iconContainer: { paddingRight: 15 },
  dotIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00B368",
    marginRight: 15,
  },
  forgotText: {
    textAlign: "right",
    color: "#00B368",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 20,
  },
  loadingContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginTop: 8,
    color: '#059669',
    fontSize: 14,
  },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  line: { flex: 1, height: 1, backgroundColor: "#EEE" },
  orText: { marginHorizontal: 10, color: "#999", fontSize: 12 },
  socialBtn: {
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  socialBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  fbMargin: { backgroundColor: "#3b5998", marginTop: 10 },
});

export default LoginScreen;