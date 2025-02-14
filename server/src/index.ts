import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import querystring from 'querystring'
import axios from 'axios'
import { env } from './env'
import { TokensResponse } from './utils/types'

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//* typesafe env variables
const CLIENT_ID = env.CLIENT_ID
const CLIENT_SECRET = env.CLIENT_SECRET
const REDIRECT_URI = env.REDIRECT_URI
const PORT = env.PORT

//* generate random string for state parameter
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

//* login route
app.get('/login', function (req, res) {
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
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
      })
  )
})

//* callback route
app.get('/callback', async function (req, res) {
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
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
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

      res.json({ message: 'tokens stored in cookies' })
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      res.status(500).json({ error: 'invalid_token' })
    }
  }
})

//* refresh route
app.get('/refresh', async function (req, res) {
  const refresh_token = req.cookies.refresh_token

  if (!refresh_token) {
    res.status(400).json({ error: 'no_refresh_token' })
  }

  try {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
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
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000 // 1 hour
    })

    if (new_refresh_token) {
      res.cookie('refresh_token', new_refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 3600 * 1000 // 30 days
      })
    }

    res.json({ message: 'token refreshed' })
  } catch (error) {
    console.error('Error refreshing token:', error)
    res.status(500).json({ error: 'error refreshing token' })
  }
})

//* server initialisation
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
