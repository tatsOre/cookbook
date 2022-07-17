const { useState, useEffect } = require("react");
import debounce from "lodash.debounce";
import SearchInput from "./SearchInput";

import styles from "./Search.module.css";

const url = `http://localhost:3000/api/v1/recipes/search?q=`;

const fetchData = async (query, callback) => {
  if (!query) return;
  console.warn("fetching");
  const response = await fetch(`${url}${query}`);
  const data = await response.json();
  callback(data);
};

const chill = debounce((query, callback) => {
  fetchData(query, callback);
}, 500);

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    chill(query, (res) => {
      setResults(res);
    });
  }, [query]);

  return (
    <>
      <SearchInput value={query} setValue={setQuery} />
      {results.map((item, index) => (
        <span>{item.title}</span>
      ))}
    </>
  );
};

export default Search;
