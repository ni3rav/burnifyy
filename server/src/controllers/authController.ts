import { Request, Response } from 'express'
import querystring from 'querystring'
import axios from 'axios'
import { env } from '../utils/env'
import { TokensResponse } from '../utils/types'

//* generate random string for state parameter
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

//* login controller
export function login(req: Request, res: Response) {
  const state = generateRandomString(16)
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' ')

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: env.CLIENT_ID,
        scope: scope,
        redirect_uri: env.REDIRECT_URI,
        state: state
      })
  )
}

//* callback controller
export async function callback(req: Request, res: Response) {
  const code = req.query.code || null
  const state = req.query.state || null

  if (!state || typeof code !== 'string') {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    ) //? state mismatch error
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`).toString('base64')
      },
      json: true
    }

    try {
      const response = await axios.post(authOptions.url, new URLSearchParams(authOptions.form), {
        headers: authOptions.headers
      })

      const { access_token, refresh_token } = response.data as TokensResponse

      //! store access_token and refresh_token in http only cookies
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600 * 1000 // 1 hour
      })

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 3600 * 1000 // 30 days
      })
      res.redirect(`${env.FRONTEND_URL}/dashboard`)
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      res.status(500).json({ error: 'invalid_token' })
    }
  }
}

//* auth status controller

export function status(req: Request, res: Response) {
  const access_token = req.cookies.access_token
  if (!access_token) {
    res.status(401).json({ error: 'unauthorized' })
  } else {
    res.status(200).json({ access_token })
  }
}
