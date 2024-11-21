import { Song } from '@/types';
import { sortSongs } from './sortSongs';

interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_image: string;
  audio: string;
  duration: number;
}

interface ApiResponse {
  results: Track[];
}

export const fetchSongs = async (
  clientId: string,
  genre: string
): Promise<Song[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&include=musicinfo&audioformat=mp32&tags=${genre}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }

    const data: ApiResponse = await response.json();

    const songs: Song[] = data.results.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      albumCover: track.album_image,
      audioUrl: track.audio,
      duration: track.duration,
      isFavorite: false,
    }));

    return sortSongs(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
