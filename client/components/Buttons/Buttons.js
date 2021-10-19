import Link from "next/link";
import { forwardRef } from "react";
import styles from "./Buttons.module.css";
import { RECIPE_BASE_URL } from "../../config";
import { fetchAPI } from "../../src/ApiCalls";

const ButtonDeleteRecipe = ({ id }) => {
  const handleClickDelete = async (id) => {
    const URL = `${RECIPE_BASE_URL}/${id}`;
    fetchAPI("DELETE", URL);
    // TODO: HANDLE ERRORS
  };

  return (
    <button
      className={styles.btn__delete__recipe}
      type="button"
      onClick={() => handleClickDelete(id)}
    >
      Delete
    </button>
  );
};

const ButtonEditRecipe = ({ id }) => {
  return (
    <Link href="/">
      <button className={styles.btn__edit__recipe}>Edit</button>
    </Link>
  );
};

const ButtonTogglePublic = ({ id, isPublic }) => {
  const label = isPublic ? "Mark as Private" : "Mark as Public";
  return (
    <button
      className={styles.btn__publish__recipe}
      type="button"
      onClick={() => console.log("Changing public setting...")}
    >
      {label}
    </button>
  );
};

const ButtonOutlined = ({ type, children }) => {
  return (
    <button className={styles.btn__outlined} type={type}>
      {children}
    </button>
  );
};

const ButtonFilled = ({ type, children }) => {
  return (
    <button className={styles.btn__filled} type={type}>
      {children}
    </button>
  );
};

const LinkOutlined = forwardRef(({ onClick, href, children }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={styles.btn__outlined}>
      {children}
    </a>
  );
});

const LinkFilled = forwardRef(({ onClick, href, children }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={styles.btn__filled}>
      {children}
    </a>
  );
});

export {
  ButtonFilled,
  ButtonDeleteRecipe,
  ButtonEditRecipe,
  ButtonOutlined,
  ButtonTogglePublic,
  LinkFilled,
  LinkOutlined,
};
