import { Song } from '@/types';

const FAVORITES_STORAGE_KEY = 'musicPlayerFavorites';

const saveFavoriteIds = (favoriteIds: string[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const loadFavoriteIds = (): string[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!favoritesJson) return [];
    return JSON.parse(favoritesJson);
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const updateSongsWithFavorites = (songs: Song[]): Song[] => {
  const favoriteIds = new Set(loadFavoriteIds());

  return songs.map((song) => ({
    ...song,
    isFavorite: favoriteIds.has(song.id),
  }));
};

export { saveFavoriteIds, loadFavoriteIds, updateSongsWithFavorites };
