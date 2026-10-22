import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";

const mockPlaylistTracks = [
  {
    id: "3",
    uri: "spotify:track:exampleTrackId3",
    name: "Playlist Song",
    artist: "Playlist Artist",
    album: "Playlist Album",
  },
];

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState(mockPlaylistTracks);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    Spotify.getAccessToken()
      .then(setAccessToken)
      .catch((error) => console.error(error));
  }, []);

  async function handleSearch(query) {
    setSearchError("");

    try {
      const tracks = await Spotify.searchTracks(query);
      setSearchResults(tracks);
    } catch (error) {
      setSearchError(error.message);
    }
  }

  function addTrack(trackToAdd) {
    setPlaylistTracks((currentTracks) => {
      const alreadyAdded = currentTracks.some(
        (track) => track.id === trackToAdd.id
      );

      return alreadyAdded ? currentTracks : [...currentTracks, trackToAdd];
    });
  }

  function removeTrack(trackToRemove) {
    setPlaylistTracks((currentTracks) =>
      currentTracks.filter((track) => track.id !== trackToRemove.id)
    );
  }

  function savePlaylist() {
    const trackUris = playlistTracks.map((track) => track.uri);

    console.log("Playlist name:", playlistName);
    console.log("Track URIs:", trackUris);

    setPlaylistName("My Playlist");
    setPlaylistTracks([]);
  }

  return (
    <main>
      <h1>Jammming</h1>

      <button type="button" onClick={() => Spotify.login()}>
        Connect to Spotify
      </button>

      <p>{accessToken ? "Connected to Spotify" : "Not connected"}</p>

      <SearchBar onSearch={handleSearch} />
      {searchError && <p role="alert">{searchError}</p>}

      <SearchResults tracks={searchResults} onAddTrack={addTrack} />

      <Playlist
        name={playlistName}
        tracks={playlistTracks}
        onNameChange={setPlaylistName}
        onRemoveTrack={removeTrack}
        onSave={savePlaylist}
      />
    </main>
  );
}

export default App;