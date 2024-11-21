import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import VolumeSlider from './VolumeSlider';
import { PlayerAction } from '@/types';

interface PlayerControlsProps {
  isPlaying: boolean;
  dispatch: (action: PlayerAction) => void;
  volume: number;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  volume,
  dispatch,
}) => {
  const handleVolumeChange = (newVolume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-3">
        <IconButton
          icon={faBackward}
          onClick={() => dispatch({ type: 'PREV_SONG' })}
        />
        <IconButton
          icon={isPlaying ? faPause : faPlay}
          onClick={() => dispatch({ type: isPlaying ? 'PAUSE' : 'PLAY' })}
        />
        <IconButton
          icon={faForward}
          onClick={() => dispatch({ type: 'NEXT_SONG' })}
        />
      </div>
      <VolumeSlider volume={volume} onVolumeChange={handleVolumeChange} />
    </div>
  );
};

export default PlayerControls;
