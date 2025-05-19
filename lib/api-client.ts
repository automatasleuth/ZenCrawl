import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ScrapeOptions {
  timeout?: number;
  waitForSelector?: string;
  extractMainContent?: boolean;
  excludeSelectors?: string[];
  includeSelectors?: string[];
  userAgent?: string;
  viewport?: { width: number; height: number };
  waitFor?: number;
  useStealth?: boolean;
  output?: {
    markdown?: boolean;
    links?: boolean;
    html?: 'cleaned' | 'raw';
    screenshot?: 'viewport' | 'full';
  };
}

export interface MapOptions {
  search?: string;
  subdomains?: boolean;
  ignoreSitemap?: boolean;
}

export interface CrawlOptions {
  limit?: number;
  maxDepth?: number;
  excludePaths?: string[];
  includeOnlyPaths?: string[];
  ignoreSitemap?: boolean;
  allowBackwardsLinks?: boolean;
  pageOptions?: {
    excludeTags?: string;
    includeOnlyTags?: string;
    waitFor?: number;
    timeout?: number;
    extractMainContent?: boolean;
    useStealth?: boolean;
  };
  output?: {
    markdown?: boolean;
    links?: boolean;
    html?: 'cleaned' | 'raw';
    screenshot?: 'viewport' | 'full';
  };
}

export interface SearchOptions {
  country?: string;
  language?: string;
  num?: number;
  scrapeContent?: boolean;
}

export const api = {
  scrape: async (url: string, options?: ScrapeOptions) => {
    const response = await apiClient.post('/api/scrape', { url, options });
    return response.data;
  },

  map: async (rootUrl: string, options?: MapOptions) => {
    const response = await apiClient.post('/api/map', { rootUrl, ...options });
    return response.data;
  },

  crawl: async (rootUrl: string, options?: CrawlOptions) => {
    const response = await apiClient.post('/api/crawl', { rootUrl, ...options });
    return response.data;
  },

  search: async (query: string, options?: SearchOptions) => {
    const response = await apiClient.post('/api/search', { query, ...options });
    return response.data;
  },
}; 