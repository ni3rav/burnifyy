import { Request, Response } from 'express'
import axios from 'axios'
import { env } from '../utils/env'
import { TokensResponse } from '../utils/types'

//* refresh controller
export async function refresh(req: Request, res: Response) {
  const refresh_token = req.cookies.refresh_token

  if (!refresh_token) {
    res.status(400).json({ error: 'no_refresh_token' })
  }

  try {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`).toString('base64')
      },
      form: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      })
    }

    const response = await axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers })
    const { access_token, refresh_token: new_refresh_token } = response.data as TokensResponse

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: env.isProduction ? true : false,
      sameSite: 'strict',
      maxAge: 3600 * 1000 // 1 hour
    })

    if (new_refresh_token) {
      res.cookie('refresh_token', new_refresh_token, {
        httpOnly: true,
        secure: env.isProduction ? true : false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 3600 * 1000 // 30 days
      })
    }

    res.json({ message: 'token refreshed' })
  } catch (error) {
    console.error('Error refreshing token:', error)
    res.status(500).json({ error: 'error refreshing token' })
  }
}
