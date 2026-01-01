// ============================================
// Mode.js - Simple Settings Opener
// ============================================
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  useWindowDimensions,
  Platform,
  Linking 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAudioPlayer } from 'expo-audio';

const ModeCard = ({ title, subtext, iconName, colors, onPress, isActive }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;
  
  return (
    <TouchableOpacity 
      style={[
        styles.cardWrapper,
        isSmallPhone && styles.cardWrapperSmall,
        isTablet && styles.cardWrapperTablet,
        isActive && styles.cardWrapperActive,
      ]} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <LinearGradient
        colors={isActive ? ['#F0FDF4', '#DCFCE7'] : ['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          styles.card,
          isSmallPhone && styles.cardSmall,
          isTablet && styles.cardTablet,
          isActive && styles.cardActive,
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
          
          {isActive && (
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeBadgeText}>Playing</Text>
            </View>
          )}
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
  
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;
  const isLandscape = width > height;
  
  // State for ambient sound
  const [ambientSound, setAmbientSound] = useState(false);
  const player = useAudioPlayer('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

  // ===========================
  // SILENT MODE - Direct Settings Open
  // ===========================
  const handleSilentMode = () => {
    try {
      if (Platform.OS === 'android') {
        // Android: Try to open sound settings
        Linking.sendIntent('android.settings.SOUND_SETTINGS')
          .catch(() => {
            // Fallback to general settings
            Linking.openSettings();
          });
      } else if (Platform.OS === 'ios') {
        // iOS: Open general settings
        Linking.openSettings();
      } else {
        // Web/other platforms
        alert('Please use your device settings to enable Silent Mode');
      }
    } catch (error) {
      console.error('Settings Error:', error);
      Linking.openSettings(); // Final fallback
    }
  };

  // ===========================
  // AMBIENT SOUND - Play Music
  // ===========================
  const handleAmbientSound = () => {
    try {
      if (!ambientSound) {
        // PLAY SOUND
        player.play();
        setAmbientSound(true);
      } else {
        // STOP SOUND
        player.pause();
        setAmbientSound(false);
      }
    } catch (error) {
      console.error('Ambient Sound Error:', error);
      alert('Could not play sound');
    }
  };
  
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
          onPress={handleSilentMode}
          isActive={false}
        />
        <ModeCard 
          title="Ambient Sound" 
          subtext="Play background music" 
          iconName="musical-notes"
          colors={['#06B6D4', '#0891B2']}
          onPress={handleAmbientSound}
          isActive={ambientSound}
        />
      </View>

      {/* Instructions Box */}
      <View style={styles.instructionBox}>
        <Ionicons name="information-circle" size={20} color="#0891B2" />
        <View style={styles.instructionContent}>
          <Text style={styles.instructionTitle}>How to use Silent Mode:</Text>
          <Text style={styles.instructionText}>
            Tap "Silent Mode" → Settings will open → Enable "Do Not Disturb" or "Silent Mode"
          </Text>
        </View>
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
    // Medium shadow - adjust kar sakte ho
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0,
    shadowRadius: Platform.OS === 'ios' ? 8 : 0,
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  cardWrapperSmall: {
    marginHorizontal: 4,
    borderRadius: 20,
  },
  cardWrapperTablet: {
    marginHorizontal: 10,
    borderRadius: 28,
    maxWidth: 400,
  },
  cardWrapperActive: {
    // Colored shadow for active state
    shadowColor: '#06B6D4',
    shadowOpacity: Platform.OS === 'ios' ? 0.20 : 0,
    elevation: Platform.OS === 'android' ? 6 : 0,
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
  cardActive: {
    borderWidth: 2,
    borderColor: '#06B6D4',
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginBottom: 16,
    // Light shadow for icon
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0,
    shadowRadius: Platform.OS === 'ios' ? 6 : 0,
    elevation: Platform.OS === 'android' ? 4 : 0,
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
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#06B6D4',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  instructionBox: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 4,
    padding: 14,
    backgroundColor: '#ECFEFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A5F3FC',
    alignItems: 'flex-start',
  },
  instructionContent: {
    flex: 1,
    marginLeft: 10,
  },
  instructionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0E7490',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 11,
    color: '#155E75',
    lineHeight: 16,
  },
});

export default ModeRow;