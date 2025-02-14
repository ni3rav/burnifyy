import express, { Express } from 'express'
import bodyParser from 'body-parser'
import querystring from 'querystring'
import { env } from './env'

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get('/callback', function (req, res) {
  const code = req.query.code || null
  const state = req.query.state || null

  if (state === null) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    ) //? state mismatch error
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }
})

//* server initialisation
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
