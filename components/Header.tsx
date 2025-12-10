import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { borderRadius, colors, shadows, spacing, typography } from '../styles/theme';

interface HeaderProps {
    title: string;
    selectedCity?: string;
    onCityPress?: () => void;
    showCitySelector?: boolean;
}

export default function Header({ title, selectedCity, onCityPress, showCitySelector = false }: HeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
            {/* Background gradient */}
            <LinearGradient
                colors={[colors.backgroundSecondary, colors.background]}
                style={styles.backgroundGradient}
            />

            {/* Accent glow */}
            <View style={styles.glowContainer}>
                <LinearGradient
                    colors={[colors.accentGlow, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.accentGlow}
                />
            </View>

            {/* Title with gradient text effect simulation */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.titleUnderline}>
                    <LinearGradient
                        colors={[colors.accent, colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.underlineGradient}
                    />
                </View>
            </View>

            {showCitySelector && (
                <TouchableOpacity onPress={onCityPress} style={styles.citySelector} activeOpacity={0.8}>
                    <LinearGradient
                        colors={[colors.glassMedium, colors.glass]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.citySelectorGradient}
                    >
                        <View style={styles.locationIconContainer}>
                            <Ionicons name="location" size={16} color={colors.accent} />
                        </View>
                        <Text style={styles.cityText}>{selectedCity || 'Select City'}</Text>
                        <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
                    </LinearGradient>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    glowContainer: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        opacity: 0.5,
    },
    accentGlow: {
        flex: 1,
        borderRadius: 100,
    },
    titleContainer: {
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h1,
        fontSize: 34,
        letterSpacing: -1,
    },
    titleUnderline: {
        marginTop: spacing.xs,
        height: 3,
        width: 60,
        borderRadius: 2,
        overflow: 'hidden',
    },
    underlineGradient: {
        flex: 1,
    },
    citySelector: {
        alignSelf: 'flex-start',
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.glassBorder,
        ...shadows.sm,
    },
    citySelectorGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    locationIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.accentGlow,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityText: {
        ...typography.bodySmall,
        color: colors.textPrimary,
        fontWeight: '600',
    },
});
