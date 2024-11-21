import React from 'react';
import { PlayerAction, Song } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { formatSongDuration } from '@/utils/formatSongDuration';

interface SongItemProps {
  song: Song;
  index: number;
  isPlaying: boolean;
  isSelected: boolean;
  dispatch: React.Dispatch<PlayerAction>;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  isPlaying,
  isSelected,
  dispatch,
}) => {
  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: song.id });
  };

  const handleSongSelect = () => {
    dispatch({ type: 'PLAY_SPECIFIC_SONG', payload: index });
  };

  return (
    <li
      onDoubleClick={handleSongSelect}
      className={`cursor-pointer hover:bg-gray-600 flex items-center justify-between p-2 rounded ${
        isSelected ? 'bg-gray-600 border-none' : ''
      }`}
    >
      <div className="text-left">
        <div className="flex gap-2">
          <p className="font-medium text-white select-none">
            {index + 1} - {song.title}
          </p>
          <p className="select-none">({formatSongDuration(song.duration)})</p>
          {isPlaying && <p className="text-cyan-500 select-none">playing</p>}
        </div>
        <p className="text-sm text-gray-300 p-0 select-none">{song.artist}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handleToggleFavorite} className="p-1 rounded">
          {song.isFavorite ? (
            <FontAwesomeIcon icon={faSolidHeart} className="text-red-500" />
          ) : (
            <FontAwesomeIcon icon={faRegularHeart} className="text-white" />
          )}
        </button>
      </div>
    </li>
  );
};

export default SongItem;
