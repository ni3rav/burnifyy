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