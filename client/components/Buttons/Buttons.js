import Link from "next/link";
import styles from "./Buttons.module.css";
import { RECIPE_BASE_URL } from "../../config";

const ButtonDeleteRecipe = ({ id }) => {
  const handleClickDelete = async (id) => {
    const URL = `${RECIPE_BASE_URL}/${id}`;
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
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

export {
  ButtonDeleteRecipe,
  ButtonEditRecipe,
  ButtonOutlined,
  ButtonTogglePublic,
};
