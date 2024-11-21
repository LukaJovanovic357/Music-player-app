import { useReducer, useEffect, useRef, useState } from 'react';
import PlayerControls from './PlayerControls';
import SongsList from './SongsList';
import CurrentSongDisplay from './CurrentSongDisplay';
import { playerReducer, initialState } from '../reducer';
import { fetchSongs } from '@/utils/fetchSongs';
import { updateSongsWithFavorites } from '@/utils/favoritesStorage';
import { Song } from '@/types';
import GenreDropdown from './GenreDropdown';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const genres = ['blues', 'rock', 'pop', 'jazz', 'classical'];

const Player: React.FC = () => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('blues');

  useEffect(() => {
    const loadSongs = async () => {
      const songs: Song[] = await fetchSongs(CLIENT_ID, selectedGenre);
      const songsWithFavorites = updateSongsWithFavorites(songs);
      dispatch({ type: 'SET_SONGS', payload: songsWithFavorites });
    };
    loadSongs();
  }, [selectedGenre]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;

      if (state.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying, state.volume, state.currentSongIndex]);

  const currentSong = state.songs[state.currentSongIndex];

  return (
    <div className="p-6 h-full w-full bg-gradient-to-br from-black to-cyan-800  mx-auto  text-white ">
      <div className="w-[1200px] mx-auto relative">
        <div className="absolute">
          <GenreDropdown
            genres={genres}
            selectedGenre={selectedGenre}
            onChange={setSelectedGenre}
          />
        </div>
        <CurrentSongDisplay
          ref={audioRef}
          currentSong={currentSong}
          onEnded={() => dispatch({ type: 'NEXT_SONG' })}
        />
        <PlayerControls
          dispatch={dispatch}
          isPlaying={state.isPlaying}
          volume={state.volume}
        />
        <div className="mt-8 flex align-middle justify-center gap-10">
          <SongsList
            songs={state.songs}
            dispatch={dispatch}
            currentSongIndex={state.currentSongIndex}
            currentPlayingSongId={state.currentPlayingSongId}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
