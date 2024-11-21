import { forwardRef, useState, useEffect } from 'react';
import { formatSongDuration } from '../utils/formatSongDuration';
import ProgressBar from './ProgressBar';

interface CurrentSongDisplayProps {
  currentSong: {
    id: string;
    title: string;
    artist: string;
    albumCover: string;
    audioUrl: string;
    duration: number;
  } | null;
  onEnded: () => void;
}

const CurrentSongDisplay = forwardRef<
  HTMLAudioElement,
  CurrentSongDisplayProps
>(({ currentSong, onEnded }, ref) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement = ref as React.RefObject<HTMLAudioElement>;

    const handleTimeUpdate = () => {
      if (audioElement.current) {
        setCurrentTime(audioElement.current.currentTime);
      }
    };

    if (audioElement.current) {
      audioElement.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioElement.current) {
        audioElement.current.removeEventListener(
          'timeupdate',
          handleTimeUpdate
        );
      }
    };
  }, [ref]);

  const handleSeek = (newTime: number) => {
    const audioElement = ref as React.RefObject<HTMLAudioElement>;
    if (audioElement.current) {
      audioElement.current.currentTime = newTime;
    }
  };

  return (
    <div>
      <audio ref={ref} src={currentSong?.audioUrl} onEnded={onEnded} />

      <div className="mb-8 text-center">
        {currentSong && (
          <>
            <img
              src={currentSong.albumCover}
              alt={`${currentSong.title} album cover`}
              className="w-72 h-72 mx-auto mb-4 rounded-lg shadow-lg"
            />
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold">{currentSong.title}</h2>
              <span className="ml-3">
                ({formatSongDuration(currentSong.duration)})
              </span>
            </div>
            <p className="text-lg text-gray-300 mb-4">{currentSong.artist}</p>

            <ProgressBar
              currentTime={currentTime}
              duration={currentSong.duration}
              onSeek={handleSeek}
            />
          </>
        )}
      </div>
    </div>
  );
});

CurrentSongDisplay.displayName = 'CurrentSongDisplay';

export default CurrentSongDisplay;
