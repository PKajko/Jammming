import styles from "./Track.module.css";

function Track({ track, onAddTrack, onRemoveTrack }) {
  return (
    <div className={styles.track}>
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>

        <iframe
          title={`Spotify player for ${track.name}`}
          src={`https://open.spotify.com/embed/track/${track.id}`}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
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