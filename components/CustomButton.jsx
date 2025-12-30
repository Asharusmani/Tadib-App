import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // ✅ Gradient import kiya
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title = "Button",
  onPress,
  iconName = "chevron-forward",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container} // Shadow yahan wrapper par di hai
    >
      <LinearGradient
        // ✅ Aapke bataye huye specific colors
        colors={["#059669", "#34D399"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>{title.toUpperCase()}</Text>

        {iconName && (
          <Ionicons
            name={iconName}
            size={18}
            color="#FFF"
            style={{ marginLeft: 8 }}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    width: "100%",
    // Modern Shadow (Ab color solid green shadow di hai)
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  gradient: {
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});

export default CustomButton;