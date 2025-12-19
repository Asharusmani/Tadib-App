// ============================================
// Mode.js - Responsive Premium Mode Cards
// ============================================
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const ModeCard = ({ title, subtext, iconName, colors, isLarge }) => {
  const { width } = useWindowDimensions();
  
  // Dynamic sizing based on screen width
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;
  
  return (
    <TouchableOpacity 
      style={[
        styles.cardWrapper,
        isSmallPhone && styles.cardWrapperSmall,
        isTablet && styles.cardWrapperTablet,
      ]} 
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          styles.card,
          isSmallPhone && styles.cardSmall,
          isTablet && styles.cardTablet,
        ]}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.iconContainer,
            isSmallPhone && styles.iconContainerSmall,
            isTablet && styles.iconContainerTablet,
          ]}
        >
          <Ionicons 
            name={iconName} 
            size={isSmallPhone ? 22 : isTablet ? 34 : 28} 
            color="white" 
          />
        </LinearGradient>
        
        <View style={styles.content}>
          <Text 
            style={[
              styles.title,
              isSmallPhone && styles.titleSmall,
              isTablet && styles.titleTablet,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {title}
          </Text>
          <Text 
            style={[
              styles.subtext,
              isSmallPhone && styles.subtextSmall,
              isTablet && styles.subtextTablet,
            ]}
            numberOfLines={2}
          >
            {subtext}
          </Text>
        </View>

        <View 
          style={[
            styles.arrow,
            isSmallPhone && styles.arrowSmall,
            isTablet && styles.arrowTablet,
          ]}
        >
          <Ionicons 
            name="chevron-forward" 
            size={isSmallPhone ? 16 : isTablet ? 22 : 18} 
            color="#CBD5E1" 
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const ModeRow = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  
  // Device detection
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;
  const isLandscape = width > height;
  
  return (
    <View 
      style={[
        styles.container, 
       { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 },
        isTablet && styles.containerTablet,
      ]}
    >
      <Text 
        style={[
          styles.sectionTitle,
          isSmallPhone && styles.sectionTitleSmall,
          isTablet && styles.sectionTitleTablet,
        ]}
      >
        QUICK SETTINGS
      </Text>
      <View 
        style={[
          styles.row,
          isLandscape && !isTablet && styles.rowLandscape,
        ]}
      >
        <ModeCard 
          title="Silent Mode" 
          subtext="Mute all notifications" 
          iconName="notifications-off"
          colors={['#10B981', '#059669']}
        />
        <ModeCard 
          title="Ambient Sound" 
          subtext="Play background music" 
          iconName="musical-notes"
          colors={['#06B6D4', '#0891B2']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    paddingHorizontal: 4,
    
    
  },
  containerTablet: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  sectionTitleSmall: {
    fontSize: 10,
    marginBottom: 10,
  },
  sectionTitleTablet: {
    fontSize: 13,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    overflow: 'visible',
    gap: 0,
  },
  rowLandscape: {
    gap: 8,
  },
  cardWrapper: {
    flex: 1,
    borderRadius: 24,
    marginHorizontal: 4,
    
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0,
    shadowRadius: Platform.OS === 'ios' ? 16 : 0,
    
    // Android shadow
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  cardWrapperSmall: {
    marginHorizontal: 4,
    borderRadius: 20,
  },
  cardWrapperTablet: {
    marginHorizontal: 10,
    borderRadius: 28,
    maxWidth: 400, // Tablet pe width limit
  },
  card: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 140,
  },
  cardSmall: {
    borderRadius: 20,
    padding: 16,
    minHeight: 120,
  },
  cardTablet: {
    borderRadius: 28,
    padding: 28,
    minHeight: 180,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainerSmall: {
    height: 36,
    width: 36,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconContainerTablet: {
    height: 52,
    width: 52,
    borderRadius: 22,
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  titleSmall: {
    fontSize: 13,
    marginBottom: 4,
  },
  titleTablet: {
    fontSize: 18,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: '500',
    lineHeight: 18,
  },
  subtextSmall: {
    fontSize: 11,
    lineHeight: 15,
  },
  subtextTablet: {
    fontSize: 15,
    lineHeight: 22,
  },
  arrow: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowSmall: {
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  arrowTablet: {
    top: 28,
    right: 28,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ModeRow;