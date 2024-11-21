import React from 'react';

interface GenreDropdownProps {
  genres: string[];
  selectedGenre: string;
  onChange: (genre: string) => void;
}

const GenreDropdown: React.FC<GenreDropdownProps> = ({
  genres,
  selectedGenre,
  onChange,
}) => {
  return (
    <div className="relative inline-block cursor-pointer">
      <select
        value={selectedGenre}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-md"
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropdown;
