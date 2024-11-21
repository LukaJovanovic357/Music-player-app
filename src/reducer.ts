import { saveFavoriteIds } from './utils/favoritesStorage';
import { PlayerState } from '@/types';
import { PlayerAction } from '@/types';

const initialState: PlayerState = {
  songs: [],
  currentSongIndex: 0,
  currentPlayingSongId: null,
  isPlaying: false,
  volume: 1,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'SET_SONGS':
      return { ...state, songs: action.payload };
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        currentPlayingSongId: state.songs[state.currentSongIndex].id,
      };
    case 'PAUSE':
      return { ...state, isPlaying: false, currentPlayingSongId: null };
    case 'NEXT_SONG': {
      const nextIndex = (state.currentSongIndex + 1) % state.songs.length;
      return {
        ...state,
        currentSongIndex: nextIndex,
        currentPlayingSongId: state.isPlaying
          ? state.songs[nextIndex].id
          : null,
      };
    }
    case 'PREV_SONG': {
      const prevIndex =
        state.currentSongIndex === 0
          ? state.songs.length - 1
          : state.currentSongIndex - 1;
      return {
        ...state,
        currentSongIndex: prevIndex,
        currentPlayingSongId: state.isPlaying
          ? state.songs[prevIndex].id
          : null,
      };
    }
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'PLAY_SPECIFIC_SONG':
      return {
        ...state,
        currentSongIndex: action.payload,
        isPlaying: true,
        currentPlayingSongId: state.songs[action.payload].id,
      };
    case 'TOGGLE_FAVORITE': {
      const updatedSongs = state.songs.map((song) =>
        song.id === action.payload
          ? { ...song, isFavorite: !song.isFavorite }
          : song
      );

      const favoriteIds = updatedSongs
        .filter((song) => song.isFavorite)
        .map((song) => song.id);

      saveFavoriteIds(favoriteIds);

      return {
        ...state,
        songs: updatedSongs,
      };
    }
    default:
      return state;
  }
}

export { playerReducer, initialState };
