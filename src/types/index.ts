interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  isFavorite: boolean;
  duration: number;
}

interface PlayerState {
  songs: Song[];
  currentSongIndex: number;
  currentPlayingSongId: string | null;
  isPlaying: boolean;
  volume: number;
}

type PlayerAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_SONGS'; payload: Song[] }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'PLAY_SPECIFIC_SONG'; payload: number };

export type { Song, PlayerState, PlayerAction };
