import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

const tracks = [
  {
    id: 1,
    name: "Example Song",
    artist: "Example Artist",
    album: "Example Album",
  },
  {
    id: 2,
    name: "Another Song",
    artist: "Another Artist",
    album: "Another Album",
  },
];

function App() {
  return (
    <main>
      <h1>Ja<span>mmm</span>ing</h1>
      <SearchBar />

      <div>
        <SearchResults tracks={tracks} />
        <Playlist tracks={tracks} />
      </div>
    </main>
  );
}

export default App;