import Tracklist from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";

function Playlist({ tracks }) {
  return (
    <section className={styles.playlist}>
      <h2>My Playlist</h2>
      <input type="text" defaultValue="My Playlist" aria-label="Playlist name" />
      <Tracklist tracks={tracks} />
      <button>Save To Spotify</button>
    </section>
  );
}

export default Playlist;