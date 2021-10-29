import { useState } from "react";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import { resetIdCounter, useCombobox } from "downshift";
import Link from "next/link";
import { getData } from "../../src/ApiCalls";
import styles from "./Search.module.css";

const fetchData = async (url, query, callback) => {
  if (!query) return;
  const data = await getData(`${url}${query}`);
  callback(data);
};

const chill = debounce((url, query, callback) => {
  fetchData(url, query, callback);
}, 750);

const SearchBar = ({ placeholder, URL, withBackdrop }) => {
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
      chill(URL, inputValue, (res) => {
        setResults(res);
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push(`/recipes/${selectedItem._id}`);
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <>
      <div className={styles.search__container}>
        <div className={styles.search__bar} {...getComboboxProps()}>
          <input
            {...getInputProps({
              type: "search",
              placeholder,
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
                key={item._id}
                className={`${styles.results__items} ${
                  highlightedIndex === index
                    ? styles.item__active
                    : styles.item__inactive
                }`}
              >
                <Link href={`/recipes/${item._id}`}>{item.title}</Link>
              </li>
            ))}
          {isOpen && !results.length && inputValue && (
            <li>
              Sorry, No items found for <b>{inputValue}</b>
            </li>
          )}
        </ul>
      </div>
      {isOpen && withBackdrop && inputValue && (
        <div className={styles.backdrop}></div>
      )}
    </>
  );
};

export default SearchBar;
