# Jammming

Jammming is a React app for searching Spotify tracks and building a custom playlist. Users can add and remove tracks, rename their playlist, play tracks using Spotify embeds, and save their playlist to Spotify.

## Features

- Search Spotify for tracks
- View each track’s name, artist, and album
- Play tracks with Spotify’s embedded player
- Add tracks to and remove tracks from a playlist
- Rename a playlist
- Save a playlist to Spotify

## Built with

- React
- Vite
- CSS Modules
- Spotify Web API
- Spotify Embeds

## Run locally

1. Clone the repository and open the project folder:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   cd Jammming
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. In the Spotify Developer Dashboard, create an app with the Web API enabled and add this Redirect URI:

   ```text
   http://127.0.0.1:5173/
   ```

4. Add your Spotify Client ID in `src/util/Spotify.js`. Make sure its `REDIRECT_URI` matches the URI above.

5. Start the development server:

   ```bash
   npm run dev -- --host 127.0.0.1
   ```

6. Open `http://127.0.0.1:5173/` and connect your Spotify account.

## Checks

```bash
npm run lint
npm run build
```