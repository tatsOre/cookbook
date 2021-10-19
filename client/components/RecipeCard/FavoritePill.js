import ButtonFavorites from "../Buttons/ButtonFavorites";
import RecipeCategoriesLabels from "../RecipeAssets/RecipeCategories";
import RecipeImage from "../RecipeAssets/RecipeImage";
import styles from "./RecipePill.module.css";

const FavoritePill = ({ data }) => {
  const { _id, title, photo, categories, cuisine } = data;
  return (
    <div className={styles.card__pill}>
      <div className={styles.card__photo}>
        <RecipeImage photo={photo} title={title} />
      </div>

      <div className={styles.card__favs__body}>
        <h3 className={styles.card__title}>
          <a href={`/recipes/${_id}`}>{title}&nbsp;&nbsp;&nbsp; ➜</a>
        </h3>
        <div>
          <RecipeCategoriesLabels title="Categories" category={categories} />
        </div>
        <div>
          <RecipeCategoriesLabels title="Cuisine" category={cuisine} />
        </div>
        <div className={styles.card__userActions}>
          <ButtonFavorites id={_id} addTooltip={false} addLabel />
        </div>
      </div>
    </div>
  );
};

export default FavoritePill;
