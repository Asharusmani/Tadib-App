// ============================================
// FILE: components/ui/progressbar.jsx
// ============================================
import React from 'react';
import * as Progress from 'react-native-progress';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MyProgressBar = () => {
    const progress = 0.75; // 75%
    const completedHabits = 6;
    const totalHabits = 8;
    
    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['#FFFFFF', '#F9FAFB']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                {/* Header with Icon */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>📊</Text>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.title}>Today's Progress</Text>
                        <Text style={styles.subtitle}>Keep pushing forward!</Text>
                    </View>
                    <View style={styles.percentageBox}>
                        <Text style={styles.percentageText}>{Math.round(progress * 100)}%</Text>
                    </View>
                </View>
                
                {/* Progress Bar with Glow Effect */}
                <View style={styles.progressSection}>
                    <View style={styles.progressBarWrapper}>
                        <View style={styles.progressBarGlow} />
                        <Progress.Bar 
                            progress={progress} 
                            width={null}
                            height={12}
                            color='#10B981' 
                            unfilledColor='#E5E7EB' 
                            borderWidth={0} 
                            borderRadius={6}
                            style={styles.progressBar}
                        />
                    </View>
                    
                    {/* Progress Indicator Dots */}
                    <View style={styles.dotsContainer}>
                        {[...Array(totalHabits)].map((_, index) => (
                            <View 
                                key={index} 
                                style={[
                                    styles.dot,
                                    index < completedHabits ? styles.dotCompleted : styles.dotIncomplete
                                ]} 
                            />
                        ))}
                    </View>
                </View>
                
                {/* Footer Stats */}
                <View style={styles.footer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{completedHabits}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{totalHabits - completedHabits}</Text>
                        <Text style={styles.statLabel}>Remaining</Text>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{totalHabits}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default MyProgressBar;

const styles = StyleSheet.create({
    outerContainer: {
        marginHorizontal: 20,
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    container: {
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F0FDF4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        fontSize: 24,
    },
    headerTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
    },
    percentageBox: {
        backgroundColor: '#10B981',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    percentageText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    progressSection: {
        marginBottom: 20,
    },
    progressBarWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    progressBarGlow: {
        position: 'absolute',
        top: -4,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: '#10B981',
        opacity: 0.1,
        borderRadius: 10,
        zIndex: -1,
    },
    progressBar: {
        width: '100%',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dotCompleted: {
        backgroundColor: '#10B981',
    },
    dotIncomplete: {
        backgroundColor: '#E5E7EB',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "800",
        color: "#10B981",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#6B7280",
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: '#E5E7EB',
    },
});