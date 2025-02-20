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
  artistName: string;
  coverImageUrl: string;
};

export type TrackData = {
  trackName: string;
  artistName: string;
  coverImageUrl: string;
};
