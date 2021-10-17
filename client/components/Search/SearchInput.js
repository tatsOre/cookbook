import styles from "./Search.module.css";

const SearchInput = ({ value, setValue }) => {
  return (
    <div className={styles.search__bar}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
