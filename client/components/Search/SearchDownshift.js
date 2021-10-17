const { useState } = require("react");
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import { resetIdCounter, useCombobox } from "downshift";

import styles from "./Search.module.css";

const url = `http://localhost:3000/api/v1/recipes/search?q=`;

const fetchData = async (query, callback) => {
  if (!query) return;
  const response = await fetch(`${url}${query}`);
  const data = await response.json();
  callback(data);
};

const chill = debounce((query, callback) => {
  fetchData(query, callback);
}, 500);

const SearchDownshift = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: results,
    onInputValueChange: ({ inputValue }) => {
      setResults([]);
      chill(inputValue, (res) => {
        setResults(res);
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push(`/recipes/${selectedItem._id}`);
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <div className={styles.search__container}>
      <div className={styles.search__bar} {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search",
            id: "search",
            "aria-labelledby": "search",
          })}
        />
      </div>
      <ul className={styles.search__results} {...getMenuProps()}>
        {isOpen &&
          results.map((item, index) => (
            <li
              {...getItemProps({ item, index })}
              key={item.id}
              className={`${styles.results__items} ${
                highlightedIndex === index
                  ? styles.item__active
                  : styles.item__inactive
              }`}
            >
              {item.title}
            </li>
          ))}
        {isOpen && !results.length && inputValue && (
          <li>Sorry, No items found for {inputValue}</li>
        )}
      </ul>
    </div>
  );
};

export default SearchDownshift;
