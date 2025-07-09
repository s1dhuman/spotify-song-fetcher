// api/random-song.js


import { getAccessToken } from './callBack.js';
import { createSvg } from '../utils/svg.js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const token = await getAccessToken();
        const playlistId = '4JBBuGdEUJpqwxvGmMdLAz'; // replace with real playlist ID

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        const tracks = data.items;
        const random = tracks[Math.floor(Math.random() * tracks.length)];
        const track = random.track;

        const svg = createSvg(track);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(svg);
    } catch (err) {
        res.status(500).send(`<svg><text x="10" y="20">Error: ${err.message}</text></svg>`);
    }
}