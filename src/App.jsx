import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

const mockTracks = [
  {
    id: "1",
    name: "Example Song",
    artist: "Example Artist",
    album: "Example Album",
  },
  {
    id: "2",
    name: "Another Song",
    artist: "Another Artist",
    album: "Another Album",
  },
];

function App() {
  const [searchResults] = useState(mockTracks);

  return (
    <main>
      <h1>Jammming</h1>
      <SearchBar />
      <SearchResults tracks={searchResults} />
      <Playlist tracks={[]} />
    </main>
  );
}

export default App;