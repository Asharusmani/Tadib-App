// ============================================
// FILE: components/CustomBottomSheet.jsx - DEBUGGED VERSION
// ============================================
import React, { forwardRef, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const CustomBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // Backdrop component - jab sheet open ho to background dim ho
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  // Debug ke liye
  const handleSheetChanges = useCallback((index) => {
    console.log('Bottom sheet index changed to:', index);
  }, []);

  return (
    <BottomSheet
      ref={ref}
      index={0} // TEST: 0 se start karo to check karo sheet dikhai deti hai
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      // Additional helpful props
      handleIndicatorStyle={{ backgroundColor: '#10B981' }}
      backgroundStyle={{ backgroundColor: '#fff' }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Add New Habit</Text>
        <Text style={styles.subtitle}>Create a new habit to track</Text>
        
        {/* Test button */}
        <Button 
          title="Close Sheet" 
          onPress={() => ref.current?.close()}
        />
      </View>
    </BottomSheet>
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },
});