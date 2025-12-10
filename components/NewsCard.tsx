import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../styles/theme';

interface News {
    title: string;
    description: string;
    image: string;
    url: string;
    date: string;
    source?: string;
}

interface NewsCardProps {
    article: News;
    onPress: () => void;
    onBookmark: () => void;
    isBookmarked?: boolean;
}

export default function NewsCard({ article, onPress, onBookmark, isBookmarked = false }: NewsCardProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.container}>
            <View style={styles.card}>
                {/* Gradient border overlay */}
                <View style={styles.gradientBorderContainer}>
                    <LinearGradient
                        colors={['rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.1)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientBorder}
                    />
                </View>

                {/* Image */}
                {article.image ? (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: article.image }} style={styles.image} />
                        <LinearGradient
                            colors={['transparent', 'rgba(5, 5, 8, 0.8)', 'rgba(5, 5, 8, 1)']}
                            style={styles.imageOverlay}
                        />
                    </View>
                ) : (
                    <View style={[styles.imagePlaceholder]}>
                        <LinearGradient
                            colors={[colors.backgroundSecondary, colors.background]}
                            style={styles.placeholderGradient}
                        >
                            <Ionicons name="newspaper-outline" size={40} color={colors.textMuted} />
                        </LinearGradient>
                    </View>
                )}

                <View style={styles.content}>
                    {/* Header with source and date */}
                    <View style={styles.header}>
                        <View style={styles.sourceContainer}>
                            <View style={styles.sourceDot} />
                            <Text style={styles.source}>{article.source || 'News'}</Text>
                        </View>
                        <Text style={styles.date}>{formatDate(article.date)}</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title} numberOfLines={2}>
                        {article.title}
                    </Text>

                    {/* Description */}
                    {article.description && (
                        <Text style={styles.description} numberOfLines={2}>
                            {article.description}
                        </Text>
                    )}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.readMore}>
                            <Text style={styles.readMoreText}>Read more</Text>
                            <Ionicons name="arrow-forward" size={14} color={colors.accent} />
                        </View>

                        <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton}>
                            <LinearGradient
                                colors={isBookmarked ? [colors.accent, colors.secondary] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={[styles.bookmarkGradient, !isBookmarked && styles.bookmarkOutline]}
                            >
                                <Ionicons
                                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                    size={18}
                                    color={isBookmarked ? '#fff' : colors.textSecondary}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.glassBorder,
        ...shadows.md,
    },
    gradientBorderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        zIndex: 1,
    },
    gradientBorder: {
        flex: 1,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: colors.backgroundSecondary,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    imagePlaceholder: {
        width: '100%',
        height: 140,
        overflow: 'hidden',
    },
    placeholderGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: spacing.md,
        paddingTop: spacing.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    sourceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    sourceDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.accent,
    },
    source: {
        ...typography.caption,
        color: colors.accent,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    date: {
        ...typography.caption,
        color: colors.textMuted,
    },
    title: {
        ...typography.h3,
        marginBottom: spacing.xs,
        lineHeight: 24,
    },
    description: {
        ...typography.bodySmall,
        marginBottom: spacing.md,
        color: colors.textMuted,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    readMore: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    readMoreText: {
        ...typography.bodySmall,
        color: colors.accent,
        fontWeight: '600',
    },
    bookmarkButton: {
        padding: 2,
    },
    bookmarkGradient: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkOutline: {
        backgroundColor: colors.glassMedium,
        borderWidth: 1,
        borderColor: colors.glassBorder,
    },
});
