import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import querystring from 'querystring'
import { env } from './env'

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const CLIENT_ID = env.CLIENT_ID
const CLIENT_SECRET = env.CLIENT_SECRET
const REDIRECT_URI = env.REDIRECT_URI
const PORT = env.PORT

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

app.get('/login', function (req, res) {

    let state = generateRandomString(16);
    let scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-library-read',
        'playlist-read-private',
        'playlist-read-collaborative'
    ].join(' ');

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        }));
});

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})