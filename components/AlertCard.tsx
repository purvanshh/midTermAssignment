import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../styles/theme';

interface EmergencyAlert {
    id: number;
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    time: string;
    location?: string;
}

interface AlertCardProps {
    alert: EmergencyAlert;
    onPress?: () => void;
}

export default function AlertCard({ alert, onPress }: AlertCardProps) {
    const severityConfig = getSeverityConfig(alert.severity);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={styles.container}
        >
            <View style={[styles.card, { borderLeftColor: severityConfig.color }]}>
                {/* Subtle background tint */}
                <View style={[styles.backgroundTint, { backgroundColor: severityConfig.bgColor }]} />

                {/* Icon */}
                <View style={[styles.iconContainer, { backgroundColor: severityConfig.color }]}>
                    <Ionicons name={severityConfig.icon as any} size={22} color="#FFFFFF" />
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={[styles.severityBadge, { backgroundColor: severityConfig.bgColor }]}>
                            <View style={[styles.severityDot, { backgroundColor: severityConfig.color }]} />
                            <Text style={[styles.severity, { color: severityConfig.color }]}>
                                {alert.severity.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.time}>{alert.time}</Text>
                    </View>

                    <Text style={styles.title}>{alert.title}</Text>

                    <Text style={styles.description} numberOfLines={2}>
                        {alert.description}
                    </Text>

                    {alert.location && (
                        <View style={styles.locationContainer}>
                            <Ionicons name="location" size={12} color={colors.textMuted} />
                            <Text style={styles.location}>{alert.location}</Text>
                        </View>
                    )}
                </View>

                {/* Arrow indicator */}
                <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

function getSeverityConfig(severity: string) {
    switch (severity) {
        case 'high':
            return {
                color: colors.alertHigh,
                bgColor: colors.alertHighBg,
                icon: 'warning',
            };
        case 'medium':
            return {
                color: colors.alertMedium,
                bgColor: colors.alertMediumBg,
                icon: 'alert-circle',
            };
        case 'low':
        default:
            return {
                color: colors.alertLow,
                bgColor: colors.alertLowBg,
                icon: 'information-circle',
            };
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        paddingLeft: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.glassBorder,
        borderLeftWidth: 4,
    },
    backgroundTint: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 120,
        opacity: 0.5,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    severityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: 3,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    severityDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    severity: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    time: {
        ...typography.caption,
        color: colors.textMuted,
    },
    title: {
        ...typography.h3,
        fontSize: 16,
        marginBottom: 4,
    },
    description: {
        ...typography.bodySmall,
        color: colors.textMuted,
        marginBottom: spacing.sm,
        fontSize: 13,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        ...typography.caption,
        fontSize: 11,
    },
    arrowContainer: {
        marginLeft: spacing.sm,
        opacity: 0.5,
    },
});
