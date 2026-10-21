import Track from "../Track/Track";
import styles from "./Tracklist.module.css";

function Tracklist({ tracks, onAddTrack, onRemoveTrack }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track key={track.id} 
        track={track} 
        onAddTrack={onAddTrack}
        onRemoveTrack={onRemoveTrack} />
      ))}
    </div>
  );
}

export default Tracklist;