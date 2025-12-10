import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AlertCard from '../../components/AlertCard';
import { EmergencyAlert, emergencyAlerts } from '../../data/emergencyAlerts';
import { borderRadius, colors, spacing, typography } from '../../styles/theme';

export default function AlertsScreen() {
    const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null);
    const insets = useSafeAreaInsets();

    const getSeverityConfig = (severity: string) => {
        switch (severity) {
            case 'high': return { color: colors.alertHigh, glow: colors.alertHighGlow };
            case 'medium': return { color: colors.alertMedium, glow: colors.alertMediumGlow };
            default: return { color: colors.alertLow, glow: colors.alertLowGlow };
        }
    };

    const renderItem = ({ item }: { item: EmergencyAlert }) => (
        <AlertCard
            alert={item}
            onPress={() => setSelectedAlert(item)}
        />
    );

    const highAlerts = emergencyAlerts.filter(a => a.severity === 'high').length;
    const mediumAlerts = emergencyAlerts.filter(a => a.severity === 'medium').length;
    const lowAlerts = emergencyAlerts.filter(a => a.severity === 'low').length;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            {/* Background gradient */}
            <LinearGradient
                colors={[colors.backgroundSecondary, colors.background, colors.background]}
                locations={[0, 0.3, 1]}
                style={styles.backgroundGradient}
            />

            <View style={styles.header}>
                {/* Header glow */}
                <LinearGradient
                    colors={[colors.alertHighGlow, 'transparent']}
                    style={styles.headerGlow}
                />

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Alerts</Text>
                    <View style={styles.titleUnderline}>
                        <LinearGradient
                            colors={[colors.alertHigh, colors.alertMedium, colors.alertLow]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.underlineGradient}
                        />
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBadge}>
                        <LinearGradient
                            colors={[colors.alertHighBg, 'transparent']}
                            style={styles.statGradient}
                        >
                            <View style={[styles.statDot, { backgroundColor: colors.alertHigh }]} />
                            <Text style={[styles.statNumber, { color: colors.alertHigh }]}>{highAlerts}</Text>
                            <Text style={styles.statLabel}>Critical</Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.statBadge}>
                        <LinearGradient
                            colors={[colors.alertMediumBg, 'transparent']}
                            style={styles.statGradient}
                        >
                            <View style={[styles.statDot, { backgroundColor: colors.alertMedium }]} />
                            <Text style={[styles.statNumber, { color: colors.alertMedium }]}>{mediumAlerts}</Text>
                            <Text style={styles.statLabel}>Medium</Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.statBadge}>
                        <LinearGradient
                            colors={[colors.alertLowBg, 'transparent']}
                            style={styles.statGradient}
                        >
                            <View style={[styles.statDot, { backgroundColor: colors.alertLow }]} />
                            <Text style={[styles.statNumber, { color: colors.alertLow }]}>{lowAlerts}</Text>
                            <Text style={styles.statLabel}>Low</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View>

            <FlatList
                data={emergencyAlerts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Alert Detail Modal */}
            <Modal
                visible={selectedAlert !== null}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setSelectedAlert(null)}
            >
                <TouchableWithoutFeedback onPress={() => setSelectedAlert(null)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                {selectedAlert && (
                                    <>
                                        {/* Modal glow */}
                                        <LinearGradient
                                            colors={[getSeverityConfig(selectedAlert.severity).glow, 'transparent']}
                                            style={styles.modalGlow}
                                        />

                                        <View style={[
                                            styles.modalHeader,
                                            { borderLeftColor: getSeverityConfig(selectedAlert.severity).color }
                                        ]}>
                                            <View style={styles.modalHeaderContent}>
                                                <View style={[
                                                    styles.severityPill,
                                                    { backgroundColor: getSeverityConfig(selectedAlert.severity).glow }
                                                ]}>
                                                    <View style={[
                                                        styles.severityDot,
                                                        { backgroundColor: getSeverityConfig(selectedAlert.severity).color }
                                                    ]} />
                                                    <Text style={[
                                                        styles.modalSeverity,
                                                        { color: getSeverityConfig(selectedAlert.severity).color }
                                                    ]}>
                                                        {selectedAlert.severity.toUpperCase()} PRIORITY
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => setSelectedAlert(null)}
                                                    style={styles.closeButton}
                                                >
                                                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.modalTitle}>{selectedAlert.title}</Text>
                                        </View>

                                        <ScrollView style={styles.modalBody}>
                                            <Text style={styles.modalDescription}>
                                                {selectedAlert.description}
                                            </Text>

                                            <View style={styles.modalMeta}>
                                                <View style={styles.metaItem}>
                                                    <View style={styles.metaIconContainer}>
                                                        <Ionicons name="time-outline" size={18} color={colors.accent} />
                                                    </View>
                                                    <Text style={styles.metaText}>{selectedAlert.time}</Text>
                                                </View>
                                                {selectedAlert.location && (
                                                    <View style={styles.metaItem}>
                                                        <View style={styles.metaIconContainer}>
                                                            <Ionicons name="location-outline" size={18} color={colors.secondary} />
                                                        </View>
                                                        <Text style={styles.metaText}>{selectedAlert.location}</Text>
                                                    </View>
                                                )}
                                            </View>
                                        </ScrollView>
                                    </>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    header: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
        position: 'relative',
        overflow: 'hidden',
    },
    headerGlow: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.4,
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
        width: 80,
        borderRadius: 2,
        overflow: 'hidden',
    },
    underlineGradient: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    statBadge: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        flex: 1,
    },
    statGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
        paddingHorizontal: spacing.md,
        gap: spacing.xs,
    },
    statDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '700',
    },
    statLabel: {
        ...typography.caption,
        fontSize: 11,
    },
    listContent: {
        paddingVertical: spacing.md,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        padding: spacing.md,
    },
    modalContent: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: borderRadius.xxl,
        maxHeight: '80%',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.glassBorder,
    },
    modalGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        opacity: 0.5,
    },
    modalHeader: {
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
        borderLeftWidth: 4,
    },
    modalHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    severityPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: spacing.xs,
    },
    severityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    modalSeverity: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    closeButton: {
        padding: spacing.xs,
        backgroundColor: colors.glassMedium,
        borderRadius: borderRadius.full,
    },
    modalTitle: {
        ...typography.h2,
    },
    modalBody: {
        padding: spacing.lg,
    },
    modalDescription: {
        ...typography.body,
        lineHeight: 26,
        marginBottom: spacing.lg,
    },
    modalMeta: {
        gap: spacing.md,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    metaIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.glassMedium,
        justifyContent: 'center',
        alignItems: 'center',
    },
    metaText: {
        ...typography.body,
        flex: 1,
    },
});
