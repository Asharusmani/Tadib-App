import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function CustomCard({ title, image, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Image or Icon */}
      {image ? (
        <Image source={image} style={styles.image} />
      ) : icon ? (
        <View style={styles.iconContainer}>{icon}</View>
      ) : (
        // Default colorful circle with smiley
        <View style={styles.defaultIcon}>
          <View style={styles.rainbow} />
          <Text style={styles.smiley}>😊</Text>
        </View>
      )}
      {/* Text */}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 0,
    minHeight: 120,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
  },
  iconContainer: {
    marginBottom: 12,
  },
  defaultIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
    overflow: "hidden",
  },
  rainbow: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: "#10B981",
    borderRightColor: "#F59E0B",
    borderBottomColor: "#8B5CF6",
    borderLeftColor: "#3B82F6",
  },
  smiley: {
    fontSize: 28,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
});