import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoadingSpinner from '../../components/LoadingSpinner';
import NewsCard from '../../components/NewsCard';
import { NewsArticle } from '../../services/newsApi';
import { getBookmarks, removeBookmark } from '../../services/storage';
import { borderRadius, colors, spacing, typography } from '../../styles/theme';

export default function BookmarksScreen() {
    const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const router = useRouter();
    const insets = useSafeAreaInsets();

    const loadBookmarks = async () => {
        try {
            const saved = await getBookmarks();
            setBookmarks(saved);
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadBookmarks();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadBookmarks();
        setRefreshing(false);
    };

    const handleArticlePress = (article: NewsArticle) => {
        router.push({
            pathname: '/webview',
            params: {
                url: article.url,
                title: article.title,
                articleData: JSON.stringify(article)
            },
        });
    };

    const handleRemoveBookmark = async (article: NewsArticle) => {
        await removeBookmark(article.url);
        setBookmarks(prev => prev.filter(b => b.url !== article.url));
    };

    const renderItem = ({ item }: { item: NewsArticle }) => (
        <NewsCard
            article={item}
            onPress={() => handleArticlePress(item)}
            onBookmark={() => handleRemoveBookmark(item)}
            isBookmarked={true}
        />
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <LinearGradient
                    colors={[colors.secondaryGlow, 'transparent']}
                    style={styles.emptyIconGlow}
                />
                <Ionicons name="bookmark-outline" size={64} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
            <Text style={styles.emptyText}>
                Save articles from the news feed to read them later.
            </Text>
        </View>
    );

    if (loading) {
        return <LoadingSpinner message="Loading bookmarks..." />;
    }

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
                    colors={[colors.secondaryGlow, 'transparent']}
                    style={styles.headerGlow}
                />

                <View style={styles.titleRow}>
                    <View>
                        <Text style={styles.title}>Bookmarks</Text>
                        <View style={styles.titleUnderline}>
                            <LinearGradient
                                colors={[colors.secondary, colors.accent]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.underlineGradient}
                            />
                        </View>
                    </View>
                    <View style={styles.countBadge}>
                        <LinearGradient
                            colors={[colors.secondary, colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.countGradient}
                        >
                            <Text style={styles.countText}>{bookmarks.length}</Text>
                        </LinearGradient>
                    </View>
                </View>
                <Text style={styles.subtitle}>Your saved articles</Text>
            </View>

            <FlatList
                data={bookmarks}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.url + index}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.accent}
                        colors={[colors.accent]}
                    />
                }
            />
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
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.3,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
    countBadge: {
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    countGradient: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        minWidth: 40,
        alignItems: 'center',
    },
    countText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    subtitle: {
        ...typography.bodySmall,
        color: colors.textMuted,
        marginTop: spacing.sm,
    },
    listContent: {
        paddingVertical: spacing.md,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
        marginTop: 100,
    },
    emptyIconContainer: {
        position: 'relative',
        marginBottom: spacing.lg,
    },
    emptyIconGlow: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        top: -28,
        left: -28,
        opacity: 0.5,
    },
    emptyTitle: {
        ...typography.h2,
        marginBottom: spacing.sm,
    },
    emptyText: {
        ...typography.body,
        textAlign: 'center',
        color: colors.textMuted,
    },
});
