export type SpotifyUserProfile = {
  display_name: string;
  followers: {
    total: number;
  };
  images: {
    url: string;
  }[];
  product: string;
};

export type ArtistData = {
  name: string; // Changed from `artistName`
  imageUrl: string; // Changed from `coverImageUrl`
  genre: string[];
  followers: number;
  spotifyUrl: string;
};

export type TrackData = {
  trackName: string;
  artistName: string;
  coverImageUrl: string;
  spotifyUrl: string; // Added URL field
};
