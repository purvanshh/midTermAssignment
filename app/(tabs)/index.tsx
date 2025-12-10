import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Modal,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import NewsCard from '../../components/NewsCard';
import { cities } from '../../data/cities';
import { fetchNewsByCity, NewsArticle } from '../../services/newsApi';
import {
    addBookmark,
    getBookmarks,
    getSelectedCity,
    removeBookmark,
    setSelectedCity
} from '../../services/storage';
import { borderRadius, colors, spacing, typography } from '../../styles/theme';

export default function NewsFeedScreen() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCityState, setSelectedCityState] = useState('New York');
    const [showCityPicker, setShowCityPicker] = useState(false);

    const router = useRouter();
    const insets = useSafeAreaInsets();

    const loadBookmarks = async () => {
        const bookmarks = await getBookmarks();
        setBookmarkedUrls(new Set(bookmarks.map(b => b.url)));
    };

    const loadNews = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const articles = await fetchNewsByCity(city);
            setNews(articles);
        } catch (err) {
            setError('Failed to load news. Pull to refresh.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadNews(selectedCityState);
        await loadBookmarks();
        setRefreshing(false);
    }, [selectedCityState]);

    useEffect(() => {
        const init = async () => {
            const savedCity = await getSelectedCity();
            if (savedCity) {
                setSelectedCityState(savedCity);
                await loadNews(savedCity);
            } else {
                await loadNews(selectedCityState);
            }
            await loadBookmarks();
        };
        init();
    }, []);

    const handleCitySelect = async (city: string) => {
        setSelectedCityState(city);
        setShowCityPicker(false);
        await setSelectedCity(city);
        await loadNews(city);
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

    const handleBookmark = async (article: NewsArticle) => {
        const isBookmarked = bookmarkedUrls.has(article.url);
        if (isBookmarked) {
            await removeBookmark(article.url);
            setBookmarkedUrls(prev => {
                const next = new Set(prev);
                next.delete(article.url);
                return next;
            });
        } else {
            await addBookmark(article);
            setBookmarkedUrls(prev => new Set(prev).add(article.url));
        }
    };

    const renderItem = ({ item }: { item: NewsArticle }) => (
        <NewsCard
            article={item}
            onPress={() => handleArticlePress(item)}
            onBookmark={() => handleBookmark(item)}
            isBookmarked={bookmarkedUrls.has(item.url)}
        />
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <LinearGradient
                    colors={[colors.accentGlow, 'transparent']}
                    style={styles.emptyIconGlow}
                />
                <Ionicons name="newspaper-outline" size={64} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No News Found</Text>
            <Text style={styles.emptyText}>
                {error || `No news articles found for ${selectedCityState}. Try selecting a different city.`}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            {/* Background gradient */}
            <LinearGradient
                colors={[colors.backgroundSecondary, colors.background, colors.background]}
                locations={[0, 0.3, 1]}
                style={styles.backgroundGradient}
            />

            <Header
                title="City Pulse"
                selectedCity={selectedCityState}
                onCityPress={() => setShowCityPicker(true)}
                showCitySelector
            />

            {loading && !refreshing ? (
                <LoadingSpinner message="Loading news..." />
            ) : (
                <FlatList
                    data={news}
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
            )}

            {/* City Picker Modal */}
            <Modal
                visible={showCityPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCityPicker(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowCityPicker(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                {/* Modal header gradient */}
                                <LinearGradient
                                    colors={[colors.accentGlow, 'transparent']}
                                    style={styles.modalHeaderGlow}
                                />

                                <View style={styles.modalHeader}>
                                    <View>
                                        <Text style={styles.modalTitle}>Select City</Text>
                                        <Text style={styles.modalSubtitle}>Choose a city to see local news</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setShowCityPicker(false)}
                                        style={styles.closeButton}
                                    >
                                        <Ionicons name="close" size={24} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={cities}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.cityItem,
                                                item.name === selectedCityState && styles.cityItemSelected
                                            ]}
                                            onPress={() => handleCitySelect(item.query)}
                                            activeOpacity={0.7}
                                        >
                                            {item.name === selectedCityState && (
                                                <LinearGradient
                                                    colors={[colors.accentGlow, 'transparent']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.cityItemGradient}
                                                />
                                            )}
                                            <View style={styles.cityInfo}>
                                                <Text style={[
                                                    styles.cityName,
                                                    item.name === selectedCityState && styles.cityNameSelected
                                                ]}>
                                                    {item.name}
                                                </Text>
                                                <Text style={styles.cityCountry}>{item.country}</Text>
                                            </View>
                                            {item.name === selectedCityState && (
                                                <View style={styles.checkmarkContainer}>
                                                    <LinearGradient
                                                        colors={[colors.accent, colors.secondary]}
                                                        style={styles.checkmarkGradient}
                                                    >
                                                        <Ionicons name="checkmark" size={16} color="#fff" />
                                                    </LinearGradient>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.cityList}
                                />
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
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.backgroundSecondary,
        borderTopLeftRadius: borderRadius.xxl,
        borderTopRightRadius: borderRadius.xxl,
        maxHeight: '75%',
        paddingBottom: spacing.xl,
        overflow: 'hidden',
    },
    modalHeaderGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        opacity: 0.5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    modalTitle: {
        ...typography.h2,
        marginBottom: 4,
    },
    modalSubtitle: {
        ...typography.bodySmall,
        color: colors.textMuted,
    },
    closeButton: {
        padding: spacing.xs,
        backgroundColor: colors.glassMedium,
        borderRadius: borderRadius.full,
    },
    cityList: {
        padding: spacing.md,
    },
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        marginVertical: spacing.xs,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.glass,
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    cityItemSelected: {
        borderColor: colors.accent,
        backgroundColor: 'transparent',
    },
    cityItemGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cityInfo: {
        flex: 1,
    },
    cityName: {
        ...typography.h3,
        fontSize: 16,
        marginBottom: 2,
    },
    cityNameSelected: {
        color: colors.accent,
    },
    cityCountry: {
        ...typography.caption,
    },
    checkmarkContainer: {
        marginLeft: spacing.sm,
    },
    checkmarkGradient: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
