// ============================================
// CircularTimer.js - Responsive Enhanced Timer
// ============================================
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  useWindowDimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

const CircularTimer = () => {
  const { width } = useWindowDimensions();
  const [mode, setMode] = useState('focus');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Device detection
  const isTablet = width >= 768;
  const isSmallPhone = width < 360;
  
  const modeConfig = {
    focus: { 
      defaultDuration: 25, 
      colors: ['#10B981', '#059669'],
      bgGradient: ['#ECFDF5', '#D1FAE5'],
      label: 'Focus Time',
      durations: [5, 10, 15, 20, 25, 30],
      icon: 'rocket',
      emoji: '🎯'
    },
    break: { 
      defaultDuration: 5, 
      colors: ['#06B6D4', '#0891B2'],
      bgGradient: ['#ECFEFF', '#CFFAFE'],
      label: 'Break Time',
      durations: [3, 5, 10, 15],
      icon: 'cafe',
      emoji: '☕'
    },
    meditation: { 
      defaultDuration: 10, 
      colors: ['#A78BFA', '#8B5CF6'],
      bgGradient: ['#F5F3FF', '#EDE9FE'],
      label: 'Meditation',
      durations: [5, 10, 15, 20],
      icon: 'leaf',
      emoji: '🧘'
    }
  };

  const [duration, setDuration] = useState(modeConfig[mode].defaultDuration);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Responsive circle sizing
  const getCircleSize = () => {
    if (isTablet) return Math.min(width * 0.25, 140);
    if (isSmallPhone) return Math.min(width * 0.28, 85);
    return Math.min(width * 0.32, 110);
  };

  const radius = getCircleSize();
  const strokeWidth = isSmallPhone ? 10 : isTablet ? 14 : 12;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isRunning) {
      const newDuration = modeConfig[mode].defaultDuration;
      setDuration(newDuration);
      setTimeLeft(newDuration * 60);
    }
  }, [mode]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.03,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
      pulseAnim.setValue(1);
    }
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progress = (timeLeft / (duration * 60)) * circumference;
  const currentColors = modeConfig[mode].colors;
  const currentBgGradient = modeConfig[mode].bgGradient;

  return (
    <View style={styles.container}>
      {/* Mode Pills */}
      <View style={[
        styles.modeContainer,
        isSmallPhone && styles.modeContainerSmall,
        isTablet && styles.modeContainerTablet,
      ]}>
        {Object.entries(modeConfig).map(([key, config]) => {
          const isActive = mode === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => !isRunning && setMode(key)}
              disabled={isRunning}
              activeOpacity={0.7}
              style={[
                styles.modePill, 
                { opacity: isRunning && !isActive ? 0.4 : 1 },
                isSmallPhone && styles.modePillSmall,
                isTablet && styles.modePillTablet,
              ]}
            >
              {isActive ? (
                <LinearGradient
                  colors={config.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.modePillActive,
                    isSmallPhone && styles.modePillActiveSmall,
                    isTablet && styles.modePillActiveTablet,
                  ]}
                >
                  <Text style={[
                    styles.emoji,
                    isSmallPhone && styles.emojiSmall,
                    isTablet && styles.emojiTablet,
                  ]}>
                    {config.emoji}
                  </Text>
                  <Text style={[
                    styles.modeTextActive,
                    isSmallPhone && styles.modeTextActiveSmall,
                    isTablet && styles.modeTextActiveTablet,
                  ]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={[
                  styles.modePillInactive,
                  isSmallPhone && styles.modePillInactiveSmall,
                  isTablet && styles.modePillInactiveTablet,
                ]}>
                  <Text style={[
                    styles.emojiInactive,
                    isSmallPhone && styles.emojiSmall,
                    isTablet && styles.emojiTablet,
                  ]}>
                    {config.emoji}
                  </Text>
                  <Text style={[
                    styles.modeTextInactive,
                    isSmallPhone && styles.modeTextInactiveSmall,
                    isTablet && styles.modeTextInactiveTablet,
                  ]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Timer Circle */}
      <View style={[
        styles.timerSection,
        isSmallPhone && styles.timerSectionSmall,
        isTablet && styles.timerSectionTablet,
      ]}>
        <LinearGradient
          colors={currentBgGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.timerBackground,
            isSmallPhone && styles.timerBackgroundSmall,
            isTablet && styles.timerBackgroundTablet,
          ]}
        >
          <Animated.View style={[
            styles.timerCircleContainer, 
            { transform: [{ scale: scaleAnim }] }
          ]}>
            <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
              <Defs>
                <SvgGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={currentColors[0]} />
                  <Stop offset="100%" stopColor={currentColors[1]} />
                </SvgGradient>
              </Defs>
              
              <Circle
                stroke="rgba(255, 255, 255, 0.6)"
                fill="white"
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                strokeWidth={strokeWidth}
              />
              
              <Circle
                stroke="url(#progressGradient)"
                fill="none"
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                rotation="-90"
                origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
              />
            </Svg>

            <View style={styles.timerContent}>
              <Animated.View style={[
                styles.emojiContainer, 
                { transform: [{ scale: pulseAnim }] }
              ]}>
                <Text style={[
                  styles.emojiLarge,
                  isSmallPhone && styles.emojiLargeSmall,
                  isTablet && styles.emojiLargeTablet,
                ]}>
                  {modeConfig[mode].emoji}
                </Text>
              </Animated.View>
              <Text style={[
                styles.timerText,
                isSmallPhone && styles.timerTextSmall,
                isTablet && styles.timerTextTablet,
              ]}>
                {formatTime(timeLeft)}
              </Text>
              <LinearGradient
                colors={currentColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.labelGradient,
                  isSmallPhone && styles.labelGradientSmall,
                  isTablet && styles.labelGradientTablet,
                ]}
              >
                <Text style={[
                  styles.labelText,
                  isSmallPhone && styles.labelTextSmall,
                  isTablet && styles.labelTextTablet,
                ]}>
                  {modeConfig[mode].label}
                </Text>
              </LinearGradient>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { 
                  backgroundColor: timeLeft === 0 ? '#F59E0B' : 
                                 isRunning ? currentColors[0] : '#64748B' 
                }]} />
                <Text style={[
                  styles.statusSubText,
                  isSmallPhone && styles.statusSubTextSmall,
                  isTablet && styles.statusSubTextTablet,
                ]}>
                  {!isRunning && timeLeft === duration * 60 && 'Ready to Start'}
                  {isRunning && 'In Progress'}
                  {!isRunning && timeLeft !== duration * 60 && timeLeft > 0 && 'Paused'}
                  {timeLeft === 0 && 'Completed!'}
                </Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>

      {/* Duration Pills */}
      <View style={[
        styles.durationSection,
        isSmallPhone && styles.durationSectionSmall,
        isTablet && styles.durationSectionTablet,
      ]}>
        <Text style={[
          styles.sectionLabel,
          isSmallPhone && styles.sectionLabelSmall,
          isTablet && styles.sectionLabelTablet,
        ]}>
          DURATION
        </Text>
        <View style={styles.durationGrid}>
          {modeConfig[mode].durations.map(d => {
            const isSelected = duration === d;
            return (
              <TouchableOpacity
                key={d}
                onPress={() => !isRunning && setDuration(d)}
                disabled={isRunning}
                activeOpacity={0.7}
                style={[
                  styles.durationPill, 
                  { opacity: isRunning ? 0.4 : 1 },
                  isSmallPhone && styles.durationPillSmall,
                  isTablet && styles.durationPillTablet,
                ]}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={currentColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.durationPillActive,
                      isSmallPhone && styles.durationPillActiveSmall,
                      isTablet && styles.durationPillActiveTablet,
                    ]}
                  >
                    <Text style={[
                      styles.durationTextActive,
                      isSmallPhone && styles.durationTextActiveSmall,
                      isTablet && styles.durationTextActiveTablet,
                    ]}>
                      {d}
                    </Text>
                    <Text style={[
                      styles.durationMinActive,
                      isSmallPhone && styles.durationMinActiveSmall,
                      isTablet && styles.durationMinActiveTablet,
                    ]}>
                      min
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={[
                    styles.durationPillInactive,
                    isSmallPhone && styles.durationPillInactiveSmall,
                    isTablet && styles.durationPillInactiveTablet,
                  ]}>
                    <Text style={[
                      styles.durationText,
                      isSmallPhone && styles.durationTextSmall,
                      isTablet && styles.durationTextTabletInactive,
                    ]}>
                      {d}
                    </Text>
                    <Text style={[
                      styles.durationMin,
                      isSmallPhone && styles.durationMinSmall,
                      isTablet && styles.durationMinTablet,
                    ]}>
                      min
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Controls */}
      <View style={[
        styles.controlsContainer,
        isSmallPhone && styles.controlsContainerSmall,
        isTablet && styles.controlsContainerTablet,
      ]}>
        <TouchableOpacity 
          style={[
            styles.secondaryButton,
            isSmallPhone && styles.secondaryButtonSmall,
            isTablet && styles.secondaryButtonTablet,
          ]} 
          onPress={resetTimer}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="refresh" 
            size={isSmallPhone ? 20 : isTablet ? 26 : 22} 
            color="#64748B" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.primaryButtonWrapper,
            isSmallPhone && styles.primaryButtonWrapperSmall,
            isTablet && styles.primaryButtonWrapperTablet,
          ]} 
          onPress={!isRunning ? startTimer : pauseTimer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isRunning ? ['#F59E0B', '#D97706'] : currentColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.primaryButton,
              isSmallPhone && styles.primaryButtonSmall,
              isTablet && styles.primaryButtonTablet,
            ]}
          >
            <Ionicons 
              name={isRunning ? "pause" : "play"} 
              size={isSmallPhone ? 20 : isTablet ? 28 : 24} 
              color="white"
            />
            <Text style={[
              styles.primaryButtonText,
              isSmallPhone && styles.primaryButtonTextSmall,
              isTablet && styles.primaryButtonTextTablet,
            ]}>
              {isRunning ? 'Pause' : 'Start'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.secondaryButton,
            isSmallPhone && styles.secondaryButtonSmall,
            isTablet && styles.secondaryButtonTablet,
          ]}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="settings-outline" 
            size={isSmallPhone ? 20 : isTablet ? 26 : 22} 
            color="#64748B" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  
  // Mode Pills
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
    width: '100%',
  },
  modeContainerSmall: {
    marginBottom: 8,
  },
  modeContainerTablet: {
    marginBottom: 16,
    maxWidth: 600,
  },
  modePill: {
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: 4,
    marginVertical: 4,
  },
  modePillSmall: {
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 20,
  },
  modePillTablet: {
    marginHorizontal: 6,
    marginVertical: 5,
    borderRadius: 28,
  },
  modePillActive: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modePillActiveSmall: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 5,
  },
  modePillActiveTablet: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    gap: 8,
  },
  modePillInactive: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#edf3f9ff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modePillInactiveSmall: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 5,
  },
  modePillInactiveTablet: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    gap: 8,
  },
  emoji: {
    fontSize: 16,
  },
  emojiSmall: {
    fontSize: 14,
  },
  emojiTablet: {
    fontSize: 20,
  },
  emojiInactive: {
    fontSize: 16,
    opacity: 0.5,
  },
  modeTextActive: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.3,
  },
  modeTextActiveSmall: {
    fontSize: 12,
  },
  modeTextActiveTablet: {
    fontSize: 17,
  },
  modeTextInactive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 0.2,
  },
  modeTextInactiveSmall: {
    fontSize: 12,
  },
  modeTextInactiveTablet: {
    fontSize: 17,
  },
  
  // Timer Section
  timerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerSectionSmall: {
    marginBottom: 16,
  },
  timerSectionTablet: {
    marginBottom: 32,
  },
  timerBackground: {
    borderRadius: 32,
    padding: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  timerBackgroundSmall: {
    borderRadius: 28,
    padding: 18,
  },
  timerBackgroundTablet: {
    borderRadius: 40,
    padding: 32,
  },
  timerCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContent: {
    position: 'absolute',
    alignItems: 'center',
    gap: 4,
  },
  emojiContainer: {
    marginBottom: 2,
  },
  emojiLarge: {
    fontSize: 32,
  },
  emojiLargeSmall: {
    fontSize: 24,
  },
  emojiLargeTablet: {
    fontSize: 42,
  },
  timerText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1,
  },
  timerTextSmall: {
    fontSize: 32,
  },
  timerTextTablet: {
    fontSize: 56,
  },
  labelGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 2,
  },
  labelGradientSmall: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 14,
  },
  labelGradientTablet: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  labelTextSmall: {
    fontSize: 9,
  },
  labelTextTablet: {
    fontSize: 13,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusSubText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  statusSubTextSmall: {
    fontSize: 9,
  },
  statusSubTextTablet: {
    fontSize: 13,
  },
  
  // Duration Section
  durationSection: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  durationSectionSmall: {
    marginBottom: 16,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    maxWidth: '100%',
  },
  durationPill: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  durationPillActive: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    minWidth: 60,
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  durationPillInactive: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eff3f8ff',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    minWidth: 60,
    justifyContent: 'center',
  },
  durationTextActive: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
  },
  durationMinActive: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  durationMin: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
  
  // Controls
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  primaryButtonWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.3,
    marginLeft: 8,
  },
  secondaryButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#eff3f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    display: 'none',
  },
});

export default CircularTimer;