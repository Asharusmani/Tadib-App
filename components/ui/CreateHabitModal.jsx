// components/CreateHabitModal.jsx - COMPLETE CODE
import { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";

const ICONS = [
  require("../../assets/images/moon.png"),
  require("../../assets/images/quran.png"),
  require("../../assets/images/run.png"),
  require("../../assets/images/tea.png"),
  require("../../assets/images/phone.png"),
  require("../../assets/images/music.png"),
  require("../../assets/images/photography.png"),
  require("../../assets/images/plant.png"),
  require("../../assets/images/heart.png"),
  require("../../assets/images/walk.png"),
  require("../../assets/images/cycle.png"),
  require("../../assets/images/coding.png"),
  require("../../assets/images/apple.png"),
  require("../../assets/images/music.png"),
  require("../../assets/images/language.png"),
  require("../../assets/images/paint.png"),
];

const CATEGORIES = [
  { name: "Spiritual", icon: "🤲", color: "#8B5CF6", lightColor: "#EDE9FE" },
  { name: "Health", icon: "💪", color: "#EF4444", lightColor: "#FEE2E2" },
  { name: "Learning", icon: "📚", color: "#3B82F6", lightColor: "#DBEAFE" },
  { name: "Discipline", icon: "🎯", color: "#F59E0B", lightColor: "#FEF3C7" },
];

const CustomToggle = ({ value, onValueChange }) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      friction: 5,
      tension: 50,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 31],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#10B981"],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={styles.toggleContainer}
    >
      <Animated.View style={[styles.toggleTrack, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.toggleThumb,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function CreateHabitModal({
  visible,
  startDate,
  endDate,
  daysCount,
  onClose,
  onSave,
}) {
  const [habitName, setHabitName] = useState("");
  const [isNegativeHabit, setIsNegativeHabit] = useState(false);
  const [points, setPoints] = useState(10);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skipPoints, setSkipPoints] = useState(0);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(0);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const formatDateForDisplay = (dateKey) => {
    if (!dateKey) return "";
    const [year, month, day] = dateKey.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const isFormValid = () => {
    return habitName.trim() !== "" && selectedIcon !== null && selectedCategory !== null;
  };

  const resetForm = () => {
    setHabitName("");
    setIsNegativeHabit(false);
    setPoints(10);
    setSkipPoints(0);
    setSelectedIcon(null);
    setSelectedCategory(null);
    setReminderTime(new Date());
  };

  const handleSave = () => {
    if (!isFormValid()) {
      Alert.alert(
        "⚠️ Incomplete Form",
        "Please fill in habit name, select an icon, and choose a category."
      );
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: habitName.trim(),
      isNegative: isNegativeHabit,
      points: points,
      skipDaysAllowed: skipPoints,
      icon: ICONS[selectedIcon],
      category: selectedCategory,
      frequency: "Daily",
      reminderTime: reminderTime.toISOString(),
      startDate: startDate,
      endDate: endDate || startDate,
      daysCount: daysCount,
      createdAt: new Date().toISOString(),
      streak: 0,
      completedDates: [],
    };

    onSave(newHabit);
    resetForm();
  };

  const handleCancel = () => {
    if (habitName || selectedIcon !== null || selectedCategory !== null) {
      Alert.alert("Discard Changes?", "Are you sure you want to discard this habit?", [
        { text: "Keep Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => {
            resetForm();
            onClose();
          },
        },
      ]);
    } else {
      resetForm();
      onClose();
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleCancel}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={handleCancel}
        />
        <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
          <View style={styles.dragIndicatorContainer}>
            <View style={styles.dragIndicator} />
          </View>

          <View style={styles.modalHeader}>
            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                <Ionicons name="add-circle" size={28} color="#10B981" />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.modalTitle}>Create New Habit</Text>
                <Text style={styles.modalSubtitle}>
                  For {daysCount} day{daysCount > 1 ? "s" : ""} ({formatDateForDisplay(startDate)} - {formatDateForDisplay(endDate || startDate)})
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <Ionicons name="close-circle" size={28} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="pencil" size={18} color="#10B981" />
                <Text style={styles.cardTitle}>Habit Details</Text>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>
                  Habit Name <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.input}>
                  <Ionicons name="sparkles-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Morning Prayer, Read 10 pages..."
                    value={habitName}
                    onChangeText={setHabitName}
                    maxLength={50}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <Text style={styles.characterCount}>{habitName.length}/50 characters</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="color-palette" size={18} color="#10B981" />
                <Text style={styles.cardTitle}>
                  Choose Icon <Text style={styles.required}>*</Text>
                </Text>
              </View>

              <View style={styles.iconGrid}>
                {ICONS.map((icon, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.iconOption,
                      selectedIcon === index && styles.iconOptionSelected,
                    ]}
                    onPress={() => setSelectedIcon(index)}
                    activeOpacity={0.7}
                  >
                    <Image source={icon} style={styles.iconImage} />
                    {selectedIcon === index && (
                      <View style={styles.iconCheckmark}>
                        <Ionicons name="checkmark" size={12} color="#FFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="grid" size={18} color="#10B981" />
                <Text style={styles.cardTitle}>
                  Category <Text style={styles.required}>*</Text>
                </Text>
              </View>

              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.name}
                    style={[
                      styles.categoryButton,
                      {
                        backgroundColor:
                          selectedCategory === cat.name ? cat.lightColor : "#F9FAFB",
                      },
                    ]}
                    onPress={() => setSelectedCategory(cat.name)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.categoryIconContainer,
                        {
                          backgroundColor:
                            selectedCategory === cat.name ? cat.color : "#E5E7EB",
                        },
                      ]}
                    >
                      <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    </View>
                    <Text
                      style={[
                        styles.categoryText,
                        { color: selectedCategory === cat.name ? cat.color : "#4B5563" },
                      ]}
                    >
                      {cat.name}
                    </Text>
                    {selectedCategory === cat.name && (
                      <Ionicons name="checkmark-circle" size={20} color={cat.color} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.toggleSection}>
                <View style={styles.toggleLeft}>
                  <View style={styles.toggleIconContainer}>
                    <Ionicons
                      name={isNegativeHabit ? "close-circle" : "checkmark-circle"}
                      size={24}
                      color={isNegativeHabit ? "#EF4444" : "#10B981"}
                    />
                  </View>
                  <View style={styles.toggleTextContainer}>
                    <Text style={styles.toggleTitle}>
                      {isNegativeHabit ? "Negative Habit" : "Positive Habit"}
                    </Text>
                    <Text style={styles.toggleSubtitle}>
                      {isNegativeHabit ? "Track habits to avoid" : "Track habits to build"}
                    </Text>
                  </View>
                </View>
                <CustomToggle value={isNegativeHabit} onValueChange={setIsNegativeHabit} />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="trophy" size={18} color="#10B981" />
                <Text style={styles.cardTitle}>Rewards & Flexibility</Text>
              </View>

              <View style={styles.sliderSection}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>Points per completion</Text>
                  <View style={styles.pointsBadge}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.pointsValue}>{points}</Text>
                  </View>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={5}
                  maximumValue={100}
                  step={5}
                  value={points}
                  onValueChange={setPoints}
                  minimumTrackTintColor="#10B981"
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor="#10B981"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabelText}>5</Text>
                  <Text style={styles.sliderLabelText}>100</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.sliderSection}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>Skip days allowed</Text>
                  <View style={styles.skipBadge}>
                    <Ionicons name="pause-circle" size={14} color="#6B7280" />
                    <Text style={styles.skipValue}>{skipPoints}</Text>
                  </View>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={5}
                  step={1}
                  value={skipPoints}
                  onValueChange={setSkipPoints}
                  minimumTrackTintColor="#10B981"
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor="#10B981"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabelText}>0 days</Text>
                  <Text style={styles.sliderLabelText}>5 days</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="alarm" size={18} color="#10B981" />
                <Text style={styles.cardTitle}>Daily Reminder</Text>
              </View>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => setShowTimePicker(true)}
                activeOpacity={0.7}
              >
                <View style={styles.timeLeft}>
                  <View style={styles.timeIconContainer}>
                    <Ionicons name="time" size={24} color="#10B981" />
                  </View>
                  <Text style={styles.timeText}>{formatTime(reminderTime)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={reminderTime}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onTimeChange}
                />
              )}
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={20} color="#6B7280" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, !isFormValid() && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!isFormValid()}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
              <Text style={styles.saveButtonText}>Create Habit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  dragIndicatorContainer: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: "center",
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  required: {
    color: "#EF4444",
    fontSize: 14,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  characterCount: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconOption: {
    width: 56,
    height: 56,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  iconOptionSelected: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981",
    shadowColor: "#10B981",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  iconCheckmark: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#10B981",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryGrid: {
    gap: 12,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  toggleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  toggleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  toggleSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  toggleContainer: {
    justifyContent: "center",
  },
  toggleTrack: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    padding: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sliderSection: {
    marginBottom: 0,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F59E0B",
  },
  skipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skipValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B7280",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sliderLabelText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 16,
  },
  timeInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
  modalFooter: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F9FAFB",
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B7280",
  },
  saveButton: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#10B981",
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: "#10B981",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});