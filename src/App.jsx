import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

const mockSearchResults = [
  { id: "1", name: "Example Song", artist: "Example Artist", album: "Example Album" },
  { id: "2", name: "Another Song", artist: "Another Artist", album: "Another Album" },
];

const mockPlaylistTracks = [
  { id: "3", name: "Playlist Song", artist: "Playlist Artist", album: "Playlist Album" },
];

function App() {
  const [searchResults] = useState(mockSearchResults);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks] = useState(mockPlaylistTracks);

  return (
    <main>
      <h1>Jammming</h1>
      <SearchBar />
      <SearchResults tracks={searchResults} />
      <Playlist
        name={playlistName}
        tracks={playlistTracks}
        onNameChange={setPlaylistName}
      />
    </main>
  );
}

export default App;