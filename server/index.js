const express = require('express');
const app = express();
const axios = require('axios');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;


app.get('/login', async (req, res) => {
    try {
        const scopes = 'user-read-playback-state user-read-currently-playing';
        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`);

    } catch (error) {
        console.log(error);
        res.status(500).send("Authentication failed");
    }
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        res.status(500).send('Authentication failed');
    }

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'authorization_code',
                code,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
                redirect_uri: SPOTIFY_REDIRECT_URI
            },
        });

        if (response.data && response.data.access_token) {
            const accessToken = response.data.access_token;
            // save access token to local storage
            res.cookie('access_token', accessToken, { maxAge: 3600 * 1000, httpOnly: true });
            res.redirect('/song.html');
        } else {
            res.status(500).send('Authentication failed');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Authentication failed");
    }

})

app.get('/current-playing-song', async (req, res) => {
    try {
        // get access token from cookie-parser
        const cookies = req.cookies;
        if (!cookies) {
            res.status(500).send('Authentication failed - No cookies');
        }

        const accessToken = cookies.access_token;
        if (!accessToken) {
            res.status(500).send('Authentication failed - No access token');
        }

        const response = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.item) {
            const track_name = response.data.item.name;
            const artist_name = response.data.item.artists.map(artist => artist.name).join(' - ');
            const album_name = response.data.item.album.name;
            const album_image = response.data.item.album.images[0].url;
            const is_playing = response.data.is_playing;

            res.send({
                track_name,
                artist_name,
                album_name,
                album_image,
                is_playing
            });
        } else {
            // not playing
            res.send({
                is_playing: false
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Authentication failed - error");
    }
});

// serve static files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});