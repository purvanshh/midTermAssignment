import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Share, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import LoadingSpinner from '../components/LoadingSpinner';
import { NewsArticle } from '../services/newsApi';
import { addBookmark, isBookmarked, removeBookmark } from '../services/storage';
import { borderRadius, colors, spacing, typography } from '../styles/theme';

export default function WebViewScreen() {
    const { url, title, articleData } = useLocalSearchParams<{
        url: string;
        title: string;
        articleData?: string;
    }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);

    React.useEffect(() => {
        const checkBookmark = async () => {
            if (url) {
                const result = await isBookmarked(url);
                setBookmarked(result);
            }
        };
        checkBookmark();
    }, [url]);

    const handleBookmark = async () => {
        if (!articleData) return;

        try {
            const article: NewsArticle = JSON.parse(articleData);
            if (bookmarked) {
                await removeBookmark(url);
                setBookmarked(false);
            } else {
                await addBookmark(article);
                setBookmarked(true);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this article: ${title}\n${url}`,
                url: url,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={[colors.backgroundSecondary, colors.backgroundTertiary]}
                    style={styles.headerGradient}
                />

                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <LinearGradient
                        colors={[colors.glassMedium, colors.glass]}
                        style={styles.buttonGradient}
                    >
                        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title || 'Article'}
                    </Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity onPress={handleBookmark} style={styles.actionButton}>
                        {bookmarked ? (
                            <LinearGradient
                                colors={[colors.accent, colors.secondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.buttonGradient}
                            >
                                <Ionicons name="bookmark" size={20} color="#fff" />
                            </LinearGradient>
                        ) : (
                            <View style={styles.buttonOutline}>
                                <Ionicons name="bookmark-outline" size={20} color={colors.textSecondary} />
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                        <LinearGradient
                            colors={[colors.glassMedium, colors.glass]}
                            style={styles.buttonGradient}
                        >
                            <Ionicons name="share-outline" size={20} color={colors.textPrimary} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            {/* WebView */}
            <View style={styles.webviewContainer}>
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <LoadingSpinner message="Loading article..." />
                    </View>
                )}
                <WebView
                    source={{ uri: url }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    style={styles.webview}
                    startInLoadingState={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
        position: 'relative',
        overflow: 'hidden',
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backButton: {
        borderRadius: borderRadius.md,
        overflow: 'hidden',
    },
    buttonGradient: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.glassBorder,
    },
    buttonOutline: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.glassMedium,
        borderWidth: 1,
        borderColor: colors.glassBorder,
    },
    titleContainer: {
        flex: 1,
        marginHorizontal: spacing.sm,
    },
    title: {
        ...typography.h3,
        fontSize: 15,
    },
    headerActions: {
        flexDirection: 'row',
        gap: spacing.xs,
    },
    actionButton: {
        borderRadius: borderRadius.md,
        overflow: 'hidden',
    },
    webviewContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        backgroundColor: colors.background,
    },
    webview: {
        flex: 1,
    },
});
