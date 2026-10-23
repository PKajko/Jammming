import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

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

  async function savePlaylist() {
    const trackUris = playlistTracks.map((track) => track.uri);

    if (trackUris.length === 0) {
      setSaveMessage("Add at least one track before saving.");
      return;
    }

    setSaveMessage("");

    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName("My Playlist");
      setPlaylistTracks([]);
      setSaveMessage("Playlist saved to Spotify.");
    } catch (error) {
      setSaveMessage(error.message);
    }
  }

  return (
    <main className="appShell">
      <header className="appHeader">
        <div>
          <p className="eyebrow">BUILD A MIX THAT FEELS LIKE YOU</p>
          <h1>Jammming</h1>
        </div>

        <div className="accountArea">
          <p className={`connectionStatus ${accessToken ? "isConnected" : ""}`}>
            <span aria-hidden="true" />
            {accessToken ? "Spotify connected" : "Connect your Spotify"}
          </p>
          <button
            className="connectButton"
            type="button"
            onClick={() => Spotify.login()}
          >
            Connect to Spotify
          </button>
        </div>
      </header>

      <SearchBar onSearch={handleSearch} />
      {searchError && (
        <p className="appMessage errorMessage" role="alert">
          {searchError}
        </p>
      )}

      <div className="searchLayout">
        <SearchResults tracks={searchResults} onAddTrack={addTrack} />

        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          onNameChange={setPlaylistName}
          onRemoveTrack={removeTrack}
          onSave={savePlaylist}
        />
      </div>

      {saveMessage && (
        <p className="appMessage saveMessage" role="status">
          {saveMessage}
        </p>
      )}
    </main>
  );
}

export default App;
