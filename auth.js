// auth.js
import express from 'express';
import open from 'open';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 8888;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8888/callback';

app.get('/', (req, res) => {
    const scope = 'playlist-read-private';
    const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    open(authURL);
    res.send('Opening Spotify login...');
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const data = await response.json();
    console.log('\n✅ Your REFRESH TOKEN:');
    console.log(data.refresh_token);
    res.send('Done! Check your terminal for the refresh token.');
});

app.listen(port, () => {
    console.log(`Open http://localhost:8888 in browser to start auth`);
});
