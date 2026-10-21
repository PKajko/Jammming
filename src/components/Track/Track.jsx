import styles from "./Track.module.css";

function Track({ track, onAddTrack, onRemoveTrack }) {
  return (
    <div className={styles.track}>
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>

      {onAddTrack && (
        <button type="button" onClick={() => onAddTrack(track)}>
          +
        </button>
      )}

      {onRemoveTrack && (
        <button type="button" onClick={() => onRemoveTrack(track)}>
          -
        </button>
      )}
    </div>
  );
}

export default Track;