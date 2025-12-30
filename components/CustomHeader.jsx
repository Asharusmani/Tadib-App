import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({
  title = "Default Title", 
  showBack = false,
  showPlus = false,
  onPlusPress,
  onBackPress = () => router.back(), 
}) => {
  return (
    <View style={styles.header}>
      {/* LEFT AREA */}
      <View style={styles.headerLeft}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#2A2A2A" />
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER AREA */}
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* RIGHT AREA */}
      <View style={styles.headerRight}>
        {showPlus && (
          <TouchableOpacity activeOpacity={0.7} onPress={onPlusPress}>
            <View style={styles.plusButton}>
              <Plus size={24} color="#0E7A31" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styles wahi rahengi jo pehle thin...
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: "#FDFDFD",
    marginTop: 10, // Safe area ke liye thora gap
  },
  headerLeft: { width: 50 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerRight: { width: 50, alignItems: "flex-end" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  backButton: {
    backgroundColor: "#EEF9F2",
    padding: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems:"center"
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#0E7A31",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomHeader;