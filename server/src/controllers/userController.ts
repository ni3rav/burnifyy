import axios from 'axios'
import { Request, Response } from 'express'
import { SpotifyTopArtistsResponse, SpotifyTopTracksResponse, TrackData, ArtistData } from 'utils/types'

const default_image_url: string = 'https://i.pinimg.com/originals/4e/a0/e5/4ea0e5cf3eabce88e14ae82a94860767.jpg'

export const user = async (req: Request, res: Response): Promise<void> => {
  try {
    const access_token = req.cookies.access_token
    const profile = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    res.json(profile.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch user profile' })
  }
}

export const topTracks = async (req: Request, res: Response): Promise<void> => {
  try {
    const access_token = req.cookies.access_token

    if (!access_token) {
      res.status(401).json({ error: 'No access token found in cookies' })
      return
    }

    const topTracksResponse = await axios.get<SpotifyTopTracksResponse>('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    //! Check if the response contains data and handle it safely
    if (!topTracksResponse.data || !topTracksResponse.data.items) {
      res.status(500).json({ error: 'Invalid data received from Spotify API' })
      return
    }

    //! Map over the tracks and extract the required data with additional safety
    const topTracksData: TrackData[] = topTracksResponse.data.items.map((track) => ({
      trackName: track.name,
      artistName: track.artists?.map((artist) => artist.name).join(', ') ?? 'Unknown Artist',
      coverImageUrl: track.album?.images?.[0]?.url ?? default_image_url,
      spotifyUrl: track.external_urls.spotify // Include the Spotify URL
    }))

    res.status(200).json(topTracksData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch user top tracks' })
  }
}

export const topArtists = async (req: Request, res: Response): Promise<void> => {
  try {
    const access_token = req.cookies.access_token

    if (!access_token) {
      res.status(400).json({ error: 'No access token found in cookies' })
      return
    }

    const topArtistsResponse = await axios.get<SpotifyTopArtistsResponse>('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    //! Check if the response contains data and handle it safely
    if (!topArtistsResponse.data || !topArtistsResponse.data.items) {
      res.status(500).json({ error: 'Invalid data received from Spotify API' })
      return
    }

    //! Map over the artists and extract the required data with additional safety
    const topArtistsData: ArtistData[] = topArtistsResponse.data.items.map((artist) => ({
      name: artist.name,
      imageUrl: artist.images?.[0]?.url ?? default_image_url,
      genre: artist.genres ?? [],
      followers: artist.followers?.total ?? 0,
      spotifyUrl: artist.external_urls.spotify // Include the Spotify URL
    }))

    res.status(200).json(topArtistsData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch user top artists' })
  }
}
