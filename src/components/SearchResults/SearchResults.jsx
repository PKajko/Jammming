import Tracklist from "../Tracklist/Tracklist";
import styles from "./SearchResults.module.css";

function SearchResults({ tracks, onAddTrack }) {
  return (
    <section className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={tracks} onAddTrack={onAddTrack} />
    </section>
  );
}

export default SearchResults;