import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <form className={styles.searchBar}>
      <input type="text" placeholder="Enter A Song, Album, or Artist" />
      <button type="submit">Search</button>
    </form>
  );
}