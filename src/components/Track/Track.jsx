import styles from "./Track.module.css";

function Track({ track, onAddTrack }) {
  return (
    <div className={styles.track}>
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {onAddTrack && (
        <button
          type="button"
          aria-label={`Add ${track.name} to playlist`}
          onClick={() => onAddTrack(track)}
        >
          +
        </button>
      )}
    </div>
  );
}

export default Track;