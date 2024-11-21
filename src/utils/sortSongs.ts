import { Song } from '@/types';

const sortSongs = (songs: Song[]) => {
  return songs.sort((a: Song, b: Song) => a.title.localeCompare(b.title));
};

export { sortSongs };
