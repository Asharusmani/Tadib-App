// ============================================
// FILE: components/Streak.jsx
// ============================================
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Streak = () => {
    return (
        <View style={styles.heroSection}>
            <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.heroCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.heroContent}>
                    <View style={styles.heroLeft}>
                        <Text style={styles.heroLabel}>Current Streak</Text>
                        <View style={styles.streakRow}>
                            <Text style={styles.streakNumber}>12</Text>
                            <Text style={styles.streakDays}>days</Text>
                            <Text style={styles.fireEmoji}>🔥</Text>
                        </View>
                        <Text style={styles.heroSubtext}>Keep it going!</Text>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.heroRight}>
                        <Text style={styles.heroLabel}>Today</Text>
                        <Text style={styles.progressNumber}>75%</Text>
                        <Text style={styles.heroSubtext}>6 of 8 done</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Streak;

const styles = StyleSheet.create({
    heroSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    heroCard: {
        borderRadius: 20,
        padding: 24,
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    heroContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    heroLeft: {
        flex: 1,
    },
    heroLabel: {
        fontSize: 13,
        color: "#D1FAE5",
        fontWeight: "600",
        marginBottom: 8,
    },
    streakRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    streakNumber: {
        fontSize: 36,
        fontWeight: "800",
        color: "#FFF",
    },
    streakDays: {
        fontSize: 16,
        color: "#D1FAE5",
        marginLeft: 6,
        fontWeight: "600",
    },
    fireEmoji: {
        fontSize: 24,
        marginLeft: 8,
    },
    heroSubtext: {
        fontSize: 13,
        color: "#D1FAE5",
        marginTop: 4,
        fontWeight: "500",
    },
    divider: {
        width: 1,
        height: 60,
        backgroundColor: "#D1FAE5",
        marginHorizontal: 20,
        opacity: 0.3,
    },
    heroRight: {
        flex: 1,
        alignItems: "center",
    },
    progressNumber: {
        fontSize: 36,
        fontWeight: "800",
        color: "#FFF",
        marginVertical: 4,
    },
});