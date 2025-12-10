import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'large';
}

export default function LoadingSpinner({ message, size = 'large' }: LoadingSpinnerProps) {
    return (
        <View style={styles.container}>
            {/* Background gradient */}
            <LinearGradient
                colors={[colors.backgroundSecondary, colors.background]}
                style={styles.backgroundGradient}
            />

            {/* Glow behind spinner */}
            <View style={styles.spinnerContainer}>
                <LinearGradient
                    colors={[colors.accentGlow, 'transparent']}
                    style={styles.spinnerGlow}
                />
                <ActivityIndicator size={size} color={colors.accent} />
            </View>

            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
        backgroundColor: colors.background,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    spinnerContainer: {
        position: 'relative',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerGlow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.6,
    },
    message: {
        ...typography.body,
        marginTop: spacing.lg,
        textAlign: 'center',
        color: colors.textMuted,
    },
});
