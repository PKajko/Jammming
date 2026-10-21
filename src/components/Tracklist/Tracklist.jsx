import Track from "../Track/Track";
import styles from "./Tracklist.module.css";

function Tracklist({ tracks, onAddTrack }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAddTrack={onAddTrack} />
      ))}
    </div>
  );
}

export default Tracklist;