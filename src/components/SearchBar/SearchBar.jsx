import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const query = term.trim();

    if (query) {
      onSearch(query);
    }
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Enter a song, album, or artist"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;