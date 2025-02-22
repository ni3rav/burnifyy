//* tokens respone interface
export interface TokensResponse {
  access_token: string
  refresh_token: string
}

// Type for an artist object
export type Artist = {
  name: string
  external_urls: { spotify: string }
}

// Type for album images
export type AlbumImage = {
  url: string
}

// Type for album object
export type Album = {
  images: AlbumImage[]
  external_urls: { spotify: string }
}

// Type for track object
export type Track = {
  name: string
  artists: Artist[]
  album: Album
  external_urls: { spotify: string }
}

// Interface for the full API response (Spotify Top Tracks)
export interface SpotifyTopTracksResponse {
  items: Track[]
  total: number
  limit: number
  offset: number
  href: string
  next: string | null
  previous: string | null
}

// Interface for the simplified track data
export interface TrackData {
  trackName: string
  artistName: string
  coverImageUrl: string
  spotifyUrl: string
}

// Extended type for a detailed artist object
export type DetailedArtist = Artist & {
  id: string
  images: AlbumImage[]
  genres: string[]
  followers: { total: number }
  popularity: number
}

// Interface for the full API response (Spotify Top Artists)
export interface SpotifyTopArtistsResponse {
  items: DetailedArtist[]
  total: number
  limit: number
  offset: number
  href: string
  next: string | null
  previous: string | null
}

// Interface for the simplified artist data
export interface ArtistData {
  name: string
  imageUrl: string
  genre: string[]
  followers: number
  spotifyUrl: string
}
