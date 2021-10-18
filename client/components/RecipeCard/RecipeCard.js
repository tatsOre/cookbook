import Link from "next/link";
import RecipeCategoriesLabels from "../RecipeAssets/RecipeCategories";
import RecipeImage from "../RecipeAssets/RecipeImage";
import ButtonFavorites from "../Buttons/ButtonFavorites";
import styles from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  const {
    _id,
    title,
    description,
    cuisine,
    categories,
    photo,
    author,
    servings,
  } = recipe;

  return (
    <div className={styles.card__container}>
      <div className={styles.card__header}>
        <a href={`/recipes/${_id}`}>
          <div className={styles.card__photo}>
            <RecipeImage photo={photo} title={title} />
          </div>
        </a>
        <div className={styles.card__details}>
          {categories.length ? (
            <div className={styles.card__categories}>
              <RecipeCategoriesLabels
                title="categories"
                category={categories}
              />
            </div>
          ) : null}

          {cuisine.length ? (
            <div className={styles.card__cuisine}>
              <RecipeCategoriesLabels title="cuisine" category={cuisine} />
            </div>
          ) : null}

          <div className={styles.card__servings}>
            <h4>Servings:</h4>
            <p>{servings}</p>
          </div>
        </div>
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>
          <a href={`/recipes/${_id}`}>{title}</a>
        </h3>

        <p className={styles.card__description}>{description}</p>
        <p className={styles.card__author}>
          By <a href="#">{author?.name || "Beautiful User Name"}</a>
        </p>

        <div className={styles.card__user__actions}>
          <ButtonFavorites id={_id} addTooltip="true" />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
