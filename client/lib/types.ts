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
  name: string;
  imageUrl: string;
  genre: string[];
  followers: number;
};

export type TrackData = {
  trackName: string;
  artistName: string;
  coverImageUrl: string;
};
