import axios from 'axios'
import { Request, Response } from 'express'

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
