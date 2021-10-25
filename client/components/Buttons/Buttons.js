import { forwardRef, useState } from "react";
import styles from "./Buttons.module.css";
import { SHOP_LIST_BASE_URL, RECIPE_BASE_URL } from "../../config";
import { fetchAPI } from "../../src/ApiCalls";

const ButtonDelete = ({ id, item }) => {
  const routes = {
    shoppingList: `${SHOP_LIST_BASE_URL}`,
    recipe: `${RECIPE_BASE_URL}`,
  };

  const handleDelete = async (id) => {
    const URL = `${routes[item]}/${id}`;
    fetchAPI("DELETE", URL);
    // TODO: HANDLE ERRORS
  };

  return (
    <button
      className={styles.btn__delete__recipe}
      type="button"
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
};

const ButtonTogglePublic = ({ id, isPublic }) => {
  const [isPublicRec, setPrivateRec] = useState(isPublic);

  const label = isPublicRec ? "Mark as Private" : "Mark as Public";

  const handleUpdateRecipe = async (id) => {
    const URL = `${RECIPE_BASE_URL}/${id}`;
    const response = await fetchAPI("PATCH", URL, { public: !isPublicRec });
    const result = await response.json();
    setPrivateRec(result.public);
    console.log(result);
  };

  return (
    <button
      className={styles.btn__publish__recipe}
      type="button"
      onClick={() => handleUpdateRecipe(id)}
    >
      {label}
    </button>
  );
};

const ButtonOutlined = ({ type, children, disabled }) => {
  return (
    <button className={styles.btn__outlined} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

const ButtonFilled = ({ type, children, disabled }) => {
  return (
    <button className={styles.btn__filled} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

const LinkOutlined = forwardRef(
  ({ onClick, href, children, className }, ref) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={`${styles.btn__outlined} ${
          className ? styles[className] : ""
        }`}
      >
        {children}
      </a>
    );
  }
);

const LinkFilled = forwardRef(({ onClick, href, children }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={styles.btn__filled}>
      {children}
    </a>
  );
});

export {
  ButtonFilled,
  ButtonDelete,
  ButtonOutlined,
  ButtonTogglePublic,
  LinkFilled,
  LinkOutlined,
};
