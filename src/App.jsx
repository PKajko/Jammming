import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

const mockSearchResults = [
  {
    id: "1",
    uri: "spotify:track:exampleTrackId1",
    name: "Example Song",
    artist: "Example Artist",
    album: "Example Album",
  },
  {
    id: "2",
    uri: "spotify:track:exampleTrackId2",
    name: "Another Song",
    artist: "Another Artist",
    album: "Another Album",
  },
];

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
  const [searchResults] = useState(mockSearchResults);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState(mockPlaylistTracks);

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
      <SearchBar />
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