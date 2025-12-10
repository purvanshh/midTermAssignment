import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsArticle } from './newsApi';

const BOOKMARKS_KEY = '@city_pulse_bookmarks';
const SELECTED_CITY_KEY = '@city_pulse_selected_city';

export async function getBookmarks(): Promise<NewsArticle[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(BOOKMARKS_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error loading bookmarks:', error);
        return [];
    }
}

export async function addBookmark(article: NewsArticle): Promise<void> {
    try {
        const bookmarks = await getBookmarks();
        const exists = bookmarks.some((b) => b.url === article.url);

        if (!exists) {
            bookmarks.unshift(article);
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
        }
    } catch (error) {
        console.error('Error adding bookmark:', error);
        throw error;
    }
}

export async function removeBookmark(articleUrl: string): Promise<void> {
    try {
        const bookmarks = await getBookmarks();
        const filtered = bookmarks.filter((b) => b.url !== articleUrl);
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error removing bookmark:', error);
        throw error;
    }
}

export async function isBookmarked(articleUrl: string): Promise<boolean> {
    try {
        const bookmarks = await getBookmarks();
        return bookmarks.some((b) => b.url === articleUrl);
    } catch (error) {
        console.error('Error checking bookmark:', error);
        return false;
    }
}

export async function getSelectedCity(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(SELECTED_CITY_KEY);
    } catch (error) {
        console.error('Error loading city:', error);
        return null;
    }
}

export async function setSelectedCity(city: string): Promise<void> {
    try {
        await AsyncStorage.setItem(SELECTED_CITY_KEY, city);
    } catch (error) {
        console.error('Error saving city:', error);
        throw error;
    }
}
