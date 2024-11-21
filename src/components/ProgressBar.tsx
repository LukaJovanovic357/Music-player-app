import { formatSongDuration } from '../utils/formatSongDuration';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentageClicked = clickPosition / rect.width;
    const newTime = percentageClicked * duration;
    onSeek(newTime);
  };

  return (
    <div className="mx-auto max-w-lg px-4">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{formatSongDuration(currentTime)}</span>
        <span>{formatSongDuration(duration)}</span>
      </div>

      <div
        className="h-2 bg-gray-700 rounded-full w-full cursor-pointer"
        onClick={handleProgressBarClick}
      >
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-100"
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
