import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

interface IconButtonProps {
  icon: FontAwesomeIconProps['icon'];
  onClick: () => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-black  ${className}`}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
