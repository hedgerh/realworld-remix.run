import { Article } from "../article/article";
import { fetchWithApiUrl, fetchWithToken } from "../api-client";

export type FeedData = {
  articles: Article[];
  articlesCount: number;
  page: number;
  totalPages: number;
};

export const PAGE_SIZE = 20;

export async function getGlobalFeed(page: number, apiAuthToken: string | null) {
  const fetch = apiAuthToken ? fetchWithToken(apiAuthToken) : fetchWithApiUrl();

  const result = await fetch(`/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  return await result.json();
}

export async function getUserFeed(page: number, apiAuthToken: string) {
  const fetch = fetchWithToken(apiAuthToken);

  const result = await fetch(`/articles/feed?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  return await result.json();
}
