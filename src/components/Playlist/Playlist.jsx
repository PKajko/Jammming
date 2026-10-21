import Tracklist from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";

function Playlist({ name, tracks, onNameChange, onRemoveTrack }) {
  return (
    <section className={styles.playlist}>
      <input
        type="text"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        aria-label="Playlist name"
      />
      <Tracklist tracks={tracks} onRemoveTrack={onRemoveTrack} />
      <button>Save To Spotify</button>
    </section>
  );
}

export default Playlist;