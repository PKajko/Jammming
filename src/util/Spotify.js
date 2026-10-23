const CLIENT_ID = "0e42805a2b614e4aa1afde148c8ddcd2";
const REDIRECT_URI = "http://127.0.0.1:5173/";
const SCOPES = ["playlist-modify-private"];

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const bytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
}

async function createCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
}

function clearAuthParameters() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

const Spotify = {
  async login() {
    const verifier = randomString(64);
    const challenge = await createCodeChallenge(verifier);
    const state = randomString(16);

    sessionStorage.setItem("spotify_code_verifier", verifier);
    sessionStorage.setItem("spotify_auth_state", state);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: challenge,
      state,
      scope: SCOPES.join(" "),
    });

    window.location.assign(
  `https://accounts.spotify.com/authorize?${params.toString()}`
);
  },

  async getAccessToken() {
    const url = new URL(window.location.href);
    const error = url.searchParams.get("error");
    const code = url.searchParams.get("code");

    if (error) {
      clearAuthParameters();
      throw new Error(`Spotify authorization failed: ${error}`);
    }

    const savedToken = sessionStorage.getItem("spotify_access_token");
    const expiresAt = Number(sessionStorage.getItem("spotify_expires_at"));

    if (savedToken && Date.now() < expiresAt) {
      return savedToken;
    }

    if (!code) {
      return null;
    }

    const returnedState = url.searchParams.get("state");
    const savedState = sessionStorage.getItem("spotify_auth_state");
    const verifier = sessionStorage.getItem("spotify_code_verifier");

    clearAuthParameters();

    if (!returnedState || returnedState !== savedState || !verifier) {
      throw new Error("Spotify authorization state check failed.");
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not exchange the Spotify authorization code.");
    }

    const tokenData = await response.json();
    const newExpiresAt = Date.now() + tokenData.expires_in * 1000;

    sessionStorage.setItem("spotify_access_token", tokenData.access_token);
    sessionStorage.setItem("spotify_expires_at", String(newExpiresAt));
    sessionStorage.removeItem("spotify_code_verifier");
    sessionStorage.removeItem("spotify_auth_state");

    return tokenData.access_token;
  },

  async searchTracks(query) {
  const accessToken = await this.getAccessToken();

  if (!accessToken) {
    throw new Error("Connect to Spotify before searching.");
  }

  const params = new URLSearchParams({
    q: query,
    type: "track",
    limit: "10",
  });

  const response = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify search failed (${response.status}).`);
  }

  const data = await response.json();

  return data.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    uri: track.uri,
    previewUrl: track.preview_url ?? null,
  }));
},

async savePlaylist(name, trackUris) {
  const accessToken = await this.getAccessToken();

  if (!accessToken) {
    throw new Error("Connect to Spotify before saving a playlist.");
  }

  const createResponse = await fetch(
    "https://api.spotify.com/v1/me/playlists",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description: "Created with Jammming",
        public: false,
      }),
    }
  );

  if (!createResponse.ok) {
    throw new Error(`Could not create playlist (${createResponse.status}).`);
  }

  const playlist = await createResponse.json();

  // Spotify allows up to 100 track URIs per add request.
  for (let i = 0; i < trackUris.length; i += 100) {
    const addResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist.id}/items`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris.slice(i, i + 100),
        }),
      }
    );

    if (!addResponse.ok) {
      throw new Error(`Could not add tracks (${addResponse.status}).`);
    }
  }

  return playlist;
}
};

export default Spotify;