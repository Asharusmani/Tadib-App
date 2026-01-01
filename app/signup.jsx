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
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { authService } from "../services/authService";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SignupScreen = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Form state
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // ✅ Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ✅ Validate form
  const validateForm = () => {
    const { username, phoneNumber, email, password, confirmPassword } = formData;

    if (!username.trim()) {
      Alert.alert('Error', 'Please enter username');
      return false;
    }

    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter phone number');
      return false;
    }

    if (!/^[0-9]{10,15}$/.test(phoneNumber.replace(/[\s-]/g, ''))) {
      Alert.alert('Error', 'Please enter valid phone number');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter email');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter valid email address');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter password');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  // ✅ Handle signup
  const handleSignup = async () => {
    console.log('🟢 === SIGNUP FLOW START ===');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      console.log('1️⃣ Calling authService.register...');
      console.log('   Email:', formData.email);
      console.log('   Name:', formData.username);

      const response = await authService.register({
        name: formData.username,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      console.log('2️⃣ Register response:', response);

      if (response.success) {
        console.log('3️⃣ Registration successful!');
        console.log('4️⃣ Navigating to home...');
        
        Alert.alert(
          'Success',
          'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                router.replace("/(tabs)");
              }
            }
          ]
        );

        console.log('🟢 === SIGNUP FLOW END (SUCCESS) ===');
      } else {
        console.log('⚠️ Registration failed:', response.error);
        Alert.alert('Error', response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Signup error:', error);
      console.log('🔴 === SIGNUP FLOW END (ERROR) ===');
      
      // ✅ Better error message handling
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.message) {
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered. Please use a different email or try logging in.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your internet connection.';
        } else {
          errorMessage = error.message;
        }
      }
      
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { 
      label: "Username", 
      key: "username", 
      placeholder: "Enter Username",
      keyboardType: "default",
      autoCapitalize: "words"
    },
    { 
      label: "Phone Number", 
      key: "phoneNumber", 
      placeholder: "Enter Phone Number",
      keyboardType: "phone-pad"
    },
    { 
      label: "Email", 
      key: "email", 
      placeholder: "Enter Email",
      keyboardType: "email-address",
      autoCapitalize: "none"
    },
    { 
      label: "Password", 
      key: "password", 
      placeholder: "Enter Password",
      secureTextEntry: true
    },
    { 
      label: "Confirm Password", 
      key: "confirmPassword", 
      placeholder: "Confirm Password",
      secureTextEntry: true
    },
  ];

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -60 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              style={styles.inactiveTabWrapper}
              disabled={loading}
            >
              <Text style={styles.inactiveTab}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.activeTabWrapper}>
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

          {/* Form Fields */}
          {fields.map((field, index) => {
            const isPass = field.key === "password";
            const isConfirm = field.key === "confirmPassword";

            return (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    placeholderTextColor="#999"
                    value={formData[field.key]}
                    onChangeText={(text) => updateField(field.key, text)}
                    keyboardType={field.keyboardType || "default"}
                    autoCapitalize={field.autoCapitalize || "none"}
                    secureTextEntry={
                      (isPass && !showPass) || (isConfirm && !showConfirmPass)
                    }
                    editable={!loading}
                  />

                  {isPass || isConfirm ? (
                    <TouchableOpacity
                      onPress={() =>
                        isPass
                          ? setShowPass(!showPass)
                          : setShowConfirmPass(!showConfirmPass)
                      }
                      style={styles.iconContainer}
                      disabled={loading}
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

          {/* Create Account Button */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#059669" />
              <Text style={styles.loadingText}>Creating account...</Text>
            </View>
          ) : (
            <CustomButton
              title="Create Account"
              onPress={handleSignup}
              iconName="person-add-outline"
            />
          )}

          {/* Already have account */}
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => router.push('/login')}
              disabled={loading}
            >
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginPromptText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignupScreen;