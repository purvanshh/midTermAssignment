import axios from 'axios';

// Using Newsdata.io API
const API_KEY = 'pub_9716d8f0bc71492e903820689ad29357';
const BASE_URL = 'https://newsdata.io/api/1';

export interface NewsArticle {
    title: string;
    description: string;
    image: string;
    url: string;
    date: string;
    source?: string;
}

interface NewsdataArticle {
    title: string;
    description: string | null;
    image_url: string | null;
    link: string;
    pubDate: string;
    source_id: string;
    source_name?: string;
}

interface NewsdataResponse {
    status: string;
    totalResults: number;
    results: NewsdataArticle[] | null;
}

export async function fetchNewsByCity(city: string): Promise<NewsArticle[]> {
    try {
        // Using the /latest endpoint with proper parameters
        const response = await axios.get<NewsdataResponse>(`${BASE_URL}/latest`, {
            params: {
                apikey: API_KEY,
                q: city,
                language: 'en',
            },
        });

        console.log('API Response:', response.data.status, 'Results:', response.data.results?.length || 0);

        if (response.data.status === 'success' && response.data.results) {
            return response.data.results.map((article) => ({
                title: article.title || 'No title',
                description: article.description || '',
                image: article.image_url || '',
                url: article.link,
                date: article.pubDate || new Date().toISOString(),
                source: article.source_name || article.source_id,
            }));
        }

        return [];
    } catch (error: any) {
        console.error('Error fetching news:', error?.response?.data || error.message);
        // Return empty array instead of throwing to prevent app crash
        return [];
    }
}

export async function fetchTopHeadlines(): Promise<NewsArticle[]> {
    try {
        // Using the /latest endpoint for top headlines
        const response = await axios.get<NewsdataResponse>(`${BASE_URL}/latest`, {
            params: {
                apikey: API_KEY,
                language: 'en',
            },
        });

        if (response.data.status === 'success' && response.data.results) {
            return response.data.results.map((article) => ({
                title: article.title || 'No title',
                description: article.description || '',
                image: article.image_url || '',
                url: article.link,
                date: article.pubDate || new Date().toISOString(),
                source: article.source_name || article.source_id,
            }));
        }

        return [];
    } catch (error: any) {
        console.error('Error fetching headlines:', error?.response?.data || error.message);
        return [];
    }
}
