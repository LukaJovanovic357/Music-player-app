import React from 'react';
import { Song } from '@/types';
import SongItem from './SongItem';
import { PlayerAction } from '@/types';

interface SongsListProps {
  songs: Song[];
  dispatch: React.Dispatch<PlayerAction>;
  currentSongIndex?: number;
  currentPlayingSongId?: string | null;
}

const SongsList: React.FC<SongsListProps> = ({
  songs,
  dispatch,
  currentSongIndex,
  currentPlayingSongId,
}) => {
  return (
    <div className="w-4/5 md:w-3/4 lg:w-2/4 p-4 border-none rounded-lg bg-transparent flex flex-col">
      <h2 className="text-xl font-bold mb-4 select-none">Songs List</h2>
      <div className="flex-1 overflow-hidden">
        <div className="h-[582px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <ul className="space-y-2">
            {songs.map((song, index) => (
              <SongItem
                key={song.id}
                song={song}
                index={index}
                isPlaying={currentPlayingSongId === song.id}
                isSelected={index === currentSongIndex}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SongsList;
