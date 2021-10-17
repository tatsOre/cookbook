import UserActions from "../User/UserActions";
import styles from "./RecipeCard.module.css";
import layout from "./SmallCard.module.css";

const RecipeCard = ({ data }) => {
  const { _id, title, cuisine, categories, photo } = data;

  const categoriesContent = categories?.length
    ? categories.map((c) => <li>{c}</li>)
    : null;

  const cuisineContent = cuisine?.length
    ? cuisine.map((c) => <li>{c}</li>)
    : null;

  return (
    <div className={layout.card__small}>
      <h3 className={styles.card__title}>
        <a href={`/recipes/${_id}`}>{title}</a>
      </h3>

      <div className={styles.card__image}>
        <a href={`/recipes/${_id}`}>
          <img src={photo} alt={title} />
        </a>
      </div>

      <div className={layout.card__details}>
        {categoriesContent && (
          <div
            className={`${styles.card__categories} ${layout.card__categories}`}
          >
            <h4>Categories</h4>
            <ul>{categoriesContent}</ul>
          </div>
        )}

        {cuisineContent && (
          <div className={`${styles.card__cuisine} ${layout.card__cuisine}`}>
            <h4>Cuisine</h4>
            <ul>{cuisineContent}</ul>
          </div>
        )}

        <div className={styles.card__user__actions}>
          <UserActions recipeID={_id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
