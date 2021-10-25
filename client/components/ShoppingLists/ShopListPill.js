import { ButtonDelete } from "../Buttons/Buttons";

import styles from "./ShoppingLists.module.css";

const ShopListPill = ({ data }) => {
  const { _id, recipe, items } = data;
  return (
    <div className={styles.shopList__card}>
      <h3>
        Shopping List for <a href={`/recipes/${_id}`}>{recipe?.title}</a>
      </h3>
      <ul>
        {items.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
      <div>
        <ButtonDelete id={data._id} item="shoppingList" />
      </div>
    </div>
  );
};

export default ShopListPill;
// 617616c5ac03ca3d7e7756b1
