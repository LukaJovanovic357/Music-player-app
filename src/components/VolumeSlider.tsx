import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeDown } from '@fortawesome/free-solid-svg-icons';

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  onVolumeChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faVolumeDown} className="p-2" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-32 h-1 rounded-lg cursor-pointer"
      />
      <FontAwesomeIcon icon={faVolumeHigh} className="p-2" />
    </div>
  );
};

export default VolumeSlider;
