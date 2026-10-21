import styles from "./Track.module.css";

function Track({ track }) {
  return (
    <div className={styles.track}>
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button aria-label={`Add ${track.name} to playlist`}>+</button>
    </div>
  );
}

export default Track;