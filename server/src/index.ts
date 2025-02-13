import express from 'express';
import querystring from 'querystring';

const app = express();

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

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